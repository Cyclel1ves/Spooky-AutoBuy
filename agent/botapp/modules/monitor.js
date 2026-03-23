const { checkMyLotsAndRelistIfNeeded } = require('./relist');
const { enqueueTask } = require('./tasks');
const { logInfo, logError } = require('./logging');

async function monitorMyAH(bot) {
    try {
        if (!bot.waitingForSaleBeforeBuy) {
            logInfo(`[monitorMyAH] (${bot.customUsername}) waitingForSaleBeforeBuy=false => пропускаем`, 'auction');
            return;
        }

        enqueueTask(bot, async () => {
            logInfo(`[monitorMyAH] (${bot.customUsername}) enqueue: checkMyLotsAndRelistIfNeeded без /ah items`, 'auction');
            await checkMyLotsAndRelistIfNeeded(bot, { force: false });
        });
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
