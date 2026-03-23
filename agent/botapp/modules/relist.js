const { logInfo, logWarn } = require('./logging');
const { closeWindow, delay, extractAllItemsFromWindow, waitForWindowOpen } = require('./utils');
const { autoSell } = require('./ahParseBuy');
const { targetItems } = require('./items');
const {
    findByItemNameCountPrice,
    loadOpenListings,
    removeOpenListing
} = require('./listedItemsStore');

async function checkMyLotsAndRelistIfNeeded(bot, options = {}) {
    const now = Date.now();
    const force = !!options.force;
    const cooldownMs = bot.waitingForSaleBeforeBuy ? 20_000 : 60_000;

    if (!force && !bot.waitingForSaleBeforeBuy) {
        logInfo(`[Relist] Пропуск: bot.waitingForSaleBeforeBuy=false`, 'auction');
        return;
    }

    if (now - bot.lastRelistTime < cooldownMs) {
        const secLeft = Math.floor((cooldownMs - (now - bot.lastRelistTime)) / 1000);
        logInfo(`[Relist] Кулдаун не прошёл (осталось ~${secLeft} сек).`, 'auction');
        return;
    }

    if (bot._relistInProgress) {
        logInfo(`[Relist] Пропуск: релист уже выполняется.`, 'auction');
        return;
    }

    bot._relistInProgress = true;
    try {
        logInfo(`[Relist] Старт перевыставления без /ah items и без смены анархии.`, 'auction');

        if (bot.currentWindow) {
            closeWindow(bot);
            await delay(300);
        }

        const ahWindowPromise = waitForWindowOpen(bot, 10000);
        bot.chat('/ah');
        const ahWindow = await ahWindowPromise;
        if (!ahWindow) {
            logWarn(`[Relist] Не удалось открыть /ah`, 'auction');
            return;
        }

        const myLotsWindowPromise = waitForWindowOpen(bot, 10000);
        await bot.clickWindow(46, 0, 0);
        await delay(500);
        const myLotsWindow = await myLotsWindowPromise;
        if (!myLotsWindow) {
            closeWindow(bot);
            logWarn(`[Relist] Не удалось открыть окно "Мои лоты"`, 'auction');
            return;
        }

        await delay(700);
        const allLots = extractAllItemsFromWindow(myLotsWindow)
            .slice()
            .sort((a, b) => (a.slotIndex || 0) - (b.slotIndex || 0));

        if (allLots.length === 0) {
            closeWindow(bot);
            if (bot.waitingForSaleBeforeBuy) {
                bot.waitingForSaleBeforeBuy = false;
                logInfo(`[Relist] "Мои лоты" пусто => снимаем waitingForSaleBeforeBuy`, 'auction');
            } else {
                logInfo(`[Relist] "Мои лоты" пусто, снимать нечего.`, 'auction');
            }
            bot.lastRelistTime = Date.now();
            return;
        }

        logInfo(`[Relist] Найдено ${allLots.length} лотов в "Мои лоты". Снимаем все найденные лоты.`, 'auction');

        let withdrawn = 0;
        for (const lot of allLots.slice(0, 30)) {
            if (!Number.isFinite(lot.slotIndex)) continue;

            try {
                await bot.clickWindow(lot.slotIndex, 0, 0);
                await delay(650);
                withdrawn++;

                const known = findByItemNameCountPrice(bot.customUsername, lot.name, lot.count, lot.price)
                    || findByItemNameCountPrice(bot.customUsername, lot.name, null, lot.price);
                if (known && known.listingId) {
                    removeOpenListing(bot.customUsername, known.listingId);
                }
            } catch (err) {
                logWarn(`[Relist] Ошибка при снятии лота ${lot.name} за ${lot.price}: ${err.message}`, 'auction');
            }
        }

        closeWindow(bot);

        const remaining = loadOpenListings(bot.customUsername);
        bot.myListedItems = remaining;

        logInfo(`[Relist] Забрали ${withdrawn}/${allLots.length} лотов, запускаем autoSell без смены анархии.`, 'auction');
        await autoSell(bot, targetItems);

        bot.lastRelistTime = Date.now();
        logInfo(`[Relist] Завершено.`, 'auction');
    } finally {
        bot._relistInProgress = false;
    }
}

module.exports = {
    checkMyLotsAndRelistIfNeeded
};
