const config = require('../config');
const { targetItems } = require('./items');
const { checkNbtRequirements } = require('./ahParseBuy');

const {
    delay,
    closeWindow,
    extractAllItemsFromWindow,
    waitForWindowOpen
} = require('./utils');

const { logInfo, logWarn, logError } = require('./logging');
const { checkWithHelper } = require('./ahParseBuy');
const {
    getHistoricalPrice,
    updatePriceData,
    addHistoryRecord,
    getItemHistory
} = require('./priceStore');

const { computeSimplePrice } = require('./priceCalculator');

async function doJump(bot) {
    await delay(500);
    if (!bot.entity) return;
    if (bot.entity.onGround) {
        bot.setControlState('jump', true);
        await delay(500);
        bot.setControlState('jump', false);
    }
}
function getDaysSinceWipe() {
    const wipeDateStr = config.bot.wipeDate;
    if (!wipeDateStr) {
        return 10;
    }
    const wipeDate = new Date(wipeDateStr);
    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSinceWipe = Math.floor((now - wipeDate) / msPerDay);
    return daysSinceWipe < 0 ? 0 : daysSinceWipe;
}

async function goToNextPageBySlotClick(bot, window, slotIndex) {
    if (!window) throw new Error('No window?');
    await bot.clickWindow(slotIndex, 0, 0);
    await delay(500);
}

async function performAuctionActions(bot) {
    logInfo(`[AuctionActions] Запуск для бота ${bot.customUsername}`, 'auction');

    if (bot.currentWindow) {
        closeWindow(bot);
        await delay(300);
    }
    await delay(300);

    const myBotNames = [bot.customUsername];
    for (const item of targetItems) {
        const hist = getHistoricalPrice(item.displayName);
        item.previousAbsoluteMinUnitPrice = hist !== null ? hist : undefined;
    }

    for (const item of targetItems) {
        if (!item || !item.id || !item.searchKeyword) continue;

        logInfo(`[AuctionActions] Обработка предмета: ${item.displayName} (id=${item.id})`, 'auction');

        bot.chat(`/ah search ${item.searchKeyword}`);
        let window;
        try {
            window = await waitForWindowOpen(bot, 8000);
        } catch (err) {
            logWarn(`[AuctionActions] Окно не открылось: ${item.searchKeyword}, err=${err.message}`, 'auction');
            continue;
        }
        if (!window) {
            logWarn(`[AuctionActions] Окно=Null для "${item.searchKeyword}"`, 'auction');
            continue;
        }

        const maxPages = config.auction.maxPages || 10;
        let bestLot = null;

        for (let page = 1; page <= maxPages; page++) {
            await delay(200);

            const pageLots = extractAllItemsFromWindow(window);

            const relevantLots = pageLots.filter(lot => {
                return lot.timeLeft < config.auction.minTimeLeft &&
                    lot.name === item.name &&
                    (!item.requiredNbt || checkNbtRequirements(lot.nbt, item.requiredNbt));
            });

            if (relevantLots.length > 0) {
                relevantLots.sort((a, b) => (a.price / a.count) - (b.price / b.count));

                for (let i = 0; i < relevantLots.length; i++) {
                    const candidate = relevantLots[i];
                    let isValid = true;

                    if (!isValid) {
                        logWarn(
                            `[AuctionActions] Лот от ${candidate.seller} не прошёл проверку (index=${i})`,
                            'auction'
                        );
                        continue;
                    }

                    const unitPrice = candidate.price / candidate.count;

                    if (!bestLot || unitPrice < bestLot.unitPrice) {
                        bestLot = {
                            unitPrice,
                            timeLeft: candidate.timeLeft,
                            seller: candidate.seller
                        };
                    }

                    if (unitPrice === 0) break;
                }
            }

            if (page < maxPages) {
                try {
                    const nextWinPromise = waitForWindowOpen(bot, 5000);
                    await goToNextPageBySlotClick(bot, window, 50);
                    window = await nextWinPromise;
                    if (!window) break;
                } catch (err) {
                    logWarn(`[AuctionActions] Ошибка перехода на стр. ${page + 1}`, 'auction');
                    break;
                }
            }
        }

        closeWindow(bot);
        if (bot.customUsername === 'Labjan4ik1') {
            await doJump(bot);
        }
        if (bestLot) {
            const result = computeSimplePrice([bestLot], item.previousAbsoluteMinUnitPrice || 0);
            item.absoluteMinUnitPrice = result.absolutePrice;
            item.buyPrice = result.buyPrice;
            item.sellPrice = result.sellPrice;
            item.lastUpdated = new Date();

            logInfo(`[AuctionActions] Результат для ${item.displayName}: abs=${result.absolutePrice}, buy=${result.buyPrice}, sell=${result.sellPrice}`, 'auction');

            updatePriceData({
                bot: bot.customUsername,
                item: item.displayName,
                absoluteMinUnitPrice: result.absolutePrice,
                buyPrice: result.buyPrice,
                sellPrice: result.sellPrice,
                timestamp: item.lastUpdated.toISOString()
            });

            if (bot.isPriceUpdater && typeof process.send === 'function') {
                process.send({
                    t: 'price',
                    price: {
                        item: item.displayName,
                        absoluteMinUnitPrice: result.absolutePrice,
                        buyPrice: result.buyPrice,
                        sellPrice: result.sellPrice,
                        timestamp: item.lastUpdated.toISOString()
                    }
                });
            }

            addHistoryRecord(item.displayName, {
                timestamp: item.lastUpdated.toISOString(),
                dayOfWeek: item.lastUpdated.getDay(),
                hour: item.lastUpdated.getHours(),
                daySinceWipe: getDaysSinceWipe(),
                finalPrice: result.absolutePrice
            });
        } else {
            logWarn(`[AuctionActions] Нет валидных лотов для "${item.displayName}"`, 'auction');
        }
    }

    logInfo(`[AuctionActions] Завершили общий цикл`, 'auction');
}

module.exports = {
    performAuctionActions
};
