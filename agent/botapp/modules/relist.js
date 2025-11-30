const { logInfo, logWarn } = require('./logging');
const { targetItems } = require('./items');
const { waitForWindowOpen, closeWindow, delay } = require('./utils');
const { loadListedItems } = require('./listedItemsStore');
const { chooseRandomAN, connectToAN, AN_LIST } = require('./anManager');

async function checkMyLotsAndRelistIfNeeded(bot) {
    const now = Date.now();

    if (now - bot.lastRelistTime < 60_000) {
        const secLeft = Math.floor((60_000 - (now - bot.lastRelistTime)) / 1000);
        logInfo(`[Relist] Кулдаун не прошёл (осталось ~${secLeft} сек).`, 'auction');
        return;
    }

    logInfo(`[Relist] Старт перевыставления.`, 'auction');

    const listed = loadListedItems(bot.customUsername);
    if (!listed || listed.length === 0) {
        logInfo(`[Relist] У бота ${bot.customUsername} нет лотов.`, 'auction');
        return;
    }

	const { autoSell } = require('./ahParseBuy');
	
    const uniqueANs = [...new Set(listed.map(item => item.anNumber))];

    for (const an of uniqueANs) {
        bot.currentAN = an;
        const success = await connectToAN(bot, an);
        if (!success) continue;

        const itemsForThisAN = listed.filter(item => item.anNumber === an);
        if (itemsForThisAN.length === 0) continue;

        logInfo(`[Relist] Перевыставляем ${itemsForThisAN.length} лотов на ${an}`, 'auction');
        await delay(15000);

        const ahWindowPromise = waitForWindowOpen(bot, 25000);
        bot.chat('/ah');
        const ahWindow = await ahWindowPromise;
        if (!ahWindow) continue;

        const myLotsWindowPromise = waitForWindowOpen(bot, 20000);
        await bot.clickWindow(46, 0, 0);
        await delay(500);
        const myLotsWindow = await myLotsWindowPromise;
        if (!myLotsWindow) {
            closeWindow(bot);
            continue;
        }

        await delay(500);

	    for (let i = 0; i < 3; i++) {
    	    await bot.clickWindow(0, 0, 0);
            await delay(300);
	    }

	    await autoSell(bot, targetItems);

        closeWindow(bot);

        logInfo(`[Relist] Завершено перевыставление на ${an}`, 'auction');
    }

    bot.lastRelistTime = Date.now();
    bot.myListedItems = listed;

    await delay(15000);
}

module.exports = {
    checkMyLotsAndRelistIfNeeded
};
