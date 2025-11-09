
const { enqueueTask } = require('./tasks');
const { logInfo, logError } = require('./logging');
const { delay } = require('./utils');

const RETRY_LIMIT = 3;
const RETRY_DELAY = 5000;

let findBotByName = () => null;

function setBotFinder(fn) {
    if (typeof fn === 'function') findBotByName = fn;
}

function scheduleTransfers(list) {
    if (!Array.isArray(list)) return;
    for (const t of list) {
        const bot = findBotByName(t.bot);
        if (!bot) continue;
        enqueueTask(bot, async () => {
            await executeTransfer(bot, t.an, t.recipient, t.amount);
        });
    }
}

function formatAnCommand(an) {
    return an.startsWith('/') ? an : '/' + an;
}

async function executeTransfer(bot, an, recipient, amount) {
    let attempts = 0;
    while (attempts < RETRY_LIMIT) {
        try {
            const anCmd = formatAnCommand(an);
            logInfo(
                `\u0411\u043e\u0442 ${bot.customUsername} переводит ${amount} на ${anCmd} получателю ${recipient}. \u041f\u043e\u043f\u044b\u0442\u043a\u0430 ${attempts + 1}.`
            );
            bot.chat(anCmd);
            await delay(10000);
            bot.chat(`/pay ${recipient} ${amount}`);
            await delay(1000);
            bot.chat(`/pay ${recipient} ${amount}`);
            logInfo(
                `\u0411\u043e\u0442 ${bot.customUsername} \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0435\u0440\u0435\u0432\u0435\u043b ${amount}.`
            );
            return;
        } catch (err) {
            attempts++;
            logError(`\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0435\u0440\u0435\u0432\u043e\u0434\u0430: ${err.message}`);
            await delay(RETRY_DELAY);
        }
    }
    logError(`\u0411\u043e\u0442 ${bot.customUsername} \u043d\u0435 \u0441\u043c\u043e\u0433 \u043f\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u0434\u0435\u043d\u044c\u0433\u0438.`);
}

module.exports = {
    scheduleTransfers,
    setBotFinder,
};
