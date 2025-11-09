const { waitForWindowOpen, closeWindow, delay, extractAllItemsFromWindow } = require('./utils');
const { checkMyLotsAndRelistIfNeeded } = require('./relist');
const { parseAndBuyFromAh } = require('./ahParseBuy');
const { enqueueTask } = require('./tasks');
const { logInfo, logWarn, logError } = require('./logging');


async function monitorMyAH(bot) {
    try {
        if (bot.currentWindow) {
            closeWindow(bot);
            await delay(300);
        }

        logInfo(`[monitorMyAH] (/ah ${bot.customUsername}) проверяем кол-во лотов`, 'auction');
        bot.chat(`/ah ${bot.customUsername}`);

        const windowPromise = waitForWindowOpen(bot, 10000);
        const ahWindow = await windowPromise;
        if (!ahWindow) {
            logWarn(`[monitorMyAH] Не открылось окно /ah ${bot.customUsername}`, 'auction');
            return;
        }

        await delay(800);
        const items = extractAllItemsFromWindow(ahWindow);
        closeWindow(bot);

        const count = items.length;
        logInfo(`[monitorMyAH] (${bot.customUsername}) На аукционе сейчас ${count} лотов`, 'auction');

        if (count < 3) {
            logInfo(`[monitorMyAH] (${bot.customUsername}) Меньше 3 лотов => делаем checkMyLotsAndRelistIfNeeded`, 'auction');
            enqueueTask(bot, async () => {
                logInfo(`[monitorMyAH] (${bot.customUsername}) enqueue: checkMyLotsAndRelistIfNeeded (лотов: ${count})`, 'auction');
                await checkMyLotsAndRelistIfNeeded(bot);
            });
        } else {
            logInfo(`[monitorMyAH] (${bot.customUsername}) Лотов >= 3 => checkMyLotsAndRelistIfNeeded`, 'auction');
            enqueueTask(bot, async () => {
                logInfo(`[monitorMyAH] (${bot.customUsername}) enqueue: checkMyLotsAndRelistIfNeeded (лотов: ${count})`, 'auction');
                await checkMyLotsAndRelistIfNeeded(bot);
            });
        }
    } catch (err) {
        logError(`[monitorMyAH] (${bot.customUsername}) Ошибка: ${err.message}`, 'auction');
    }
}


function startMonitorLoop(bot) {
    const intervalMs = 1 * 60000;
    setInterval(() => {
        logInfo(`[monitorLoop] checking for waitingForSaleBeforeBuy=${bot.waitingForSaleBeforeBuy}`, 'auction');

        if (!bot.entity || bot.state === 'disconnected') {
            logInfo(`[monitorLoop] бот оффлайн, выходим`, 'auction');
            return;
        }
        if (bot.waitingForSaleBeforeBuy) {
            monitorMyAH(bot);
        }
    }, intervalMs);
}

module.exports = {
    monitorMyAH,
    startMonitorLoop
};
