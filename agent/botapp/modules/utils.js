
const { logInfo, logWarn, logError } = require('./logging');
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function randomDelay(min, max) {
    const duration = Math.floor(Math.random() * (max - min + 1)) + min;
    return delay(duration);
}

const ansiRegex = /\u001b\[[0-9;]*m/g;
const controlCharsRegex = /[\u0000-\u001F\u007F-\u009F]/g;
function stripAnsiAndControl(str) {
    return str.replace(ansiRegex, '').replace(controlCharsRegex, '');
}

function extractPlainText(line) {
    try {
        const parsed = JSON.parse(line);
        let text = parsed.text || '';
        if (Array.isArray(parsed.extra)) {
            for (const part of parsed.extra) {
                if (part.text) text += part.text;
            }
        }
        return text;
    } catch (e) {
        return line;
    }
}

function getLoreFromNbt(nbtData) {
    if (!nbtData || !nbtData.value) {
        return [];
    }

    if (
        nbtData.value.display &&
        nbtData.value.display.Lore &&
        nbtData.value.display.Lore.type === 'list' &&
        nbtData.value.display.Lore.value &&
        nbtData.value.display.Lore.value.type === 'string' &&
        Array.isArray(nbtData.value.display.Lore.value.value)
    ) {
        return nbtData.value.display.Lore.value.value;
    }
    if (
        nbtData.value.display &&
        nbtData.value.display.value &&
        nbtData.value.display.value.Lore &&
        nbtData.value.display.value.Lore.value &&
        nbtData.value.display.value.Lore.value.type === 'string' &&
        Array.isArray(nbtData.value.display.value.Lore.value.value)
    ) {
        return nbtData.value.display.value.Lore.value.value;
    }
    if (
              nbtData.value.display &&
              Array.isArray(nbtData.value.display.Lore)
          ) {
              return nbtData.value.display.Lore;
          }
    return [];
}

function parseLore(loreArray) {
    let isAuction = false;
    let seller;
    let price;
    let timeLeft = Infinity;

    const sellerRegex = /Пр.{0,10}ц:\s*(.+)/i;
    const priceRegex = /\$([\d,.]+)/;
    const timeRegex = /(\d+)\s*ч\.?(?:\s+(\d+)\s*мин\.?)?(?:\s+(\d+)\s*сек\.?)?/i;

    for (const line of loreArray) {
        const text = extractPlainText(line);

        if (text.includes('Истeк') || text.includes('Истек')) {
            isAuction = true;
            const matchTime = text.match(timeRegex);
            if (matchTime) {
                const hours = parseInt(matchTime[1], 10) || 0;
                const minutes = parseInt(matchTime[2] || '0', 10) || 0;
                const seconds = parseInt(matchTime[3] || '0', 10) || 0;
                timeLeft = hours * 3600 + minutes * 60 + seconds;
            }
        }

        if (seller === undefined) {
            const matchSeller = text.match(sellerRegex);
            if (matchSeller) {
                seller = matchSeller[1].trim();
            }
        }

        if (price === undefined) {
            const matchPrice = text.match(priceRegex);
            if (matchPrice) {
                const p = parseFloat(matchPrice[1].replace(/,/g, ''));
                if (!isNaN(p)) {
                    price = p;
                }
            }
        }

        if (isAuction && seller !== undefined && price !== undefined) {
            break;
        }
    }

    return { isAuction, seller, price, timeLeft };
}


function extractAllItemsFromWindow(window) {
    if (!window || !window.slots) {
        return [];
    }
    const results = [];
    for (let i = 0; i < window.slots.length; i++) {
        const slotItem = window.slots[i];
        if (!slotItem) continue;

        const loreArray = getLoreFromNbt(slotItem.nbt);
        const parsed = parseLore(loreArray);

        if (!parsed.isAuction) {
            continue;
        }


        results.push({
            slotIndex: i,
            seller: parsed.seller,
            price: parsed.price,
            timeLeft: parsed.timeLeft,
            name: slotItem.name,
            count: slotItem.count || 1,
            nbt: slotItem.nbt
        });
    }
    return results;
}

function closeWindow(bot) {
    if (!bot.currentWindow) return;
    try {
        bot.closeWindow(bot.currentWindow);
    } catch (err) {
    }
}

function waitForWindowOpen(bot, timeout = 5000) {
    return new Promise((resolve) => {
        const t = setTimeout(() => {
            bot.removeListener('windowOpen', onOpen);
            resolve(null);
        }, timeout);

        function onOpen(win) {
            clearTimeout(t);
            bot.removeListener('windowOpen', onOpen);
            resolve(win);
        }
        bot.on('windowOpen', onOpen);
    });
}

module.exports = {
    waitForWindowOpen,
    delay,
    randomDelay,
    closeWindow,
    extractAllItemsFromWindow,
    getLoreFromNbt,
    parseLore,
    stripAnsiAndControl,
    extractPlainText
};
