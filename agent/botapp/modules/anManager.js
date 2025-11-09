const { delay } = require('./utils');
const { logInfo, logWarn } = require('./logging');

const AN_LIST = [
    'an211', 'an212', 'an213', 'an214', 'an215', 'an216',
    'an217'
];


function chooseRandomAN() {
    const index = Math.floor(Math.random() * AN_LIST.length);
    return AN_LIST[index];
}


async function connectToAN(bot, an) {
    return new Promise(async (resolve) => {
        let confirmed = false;

        const listener = (msgJson) => {
            const msg = msgJson.toString().replace(/\u00A7./g, '');
            if (msg.includes('Вы уже подключены на этот сервер!')) {
                confirmed = true;
            }
        };

        bot.on('message', listener);
        bot.chat(`/${an}`);
        await delay(1200);
        bot.chat(`/${an}`);
        await delay(8000);
        bot.removeListener('message', listener);

        if (confirmed) {
            logInfo(`[AN] (${bot.customUsername}) Подтверждено подключение к ${an}`, 'auction');
            bot.currentAN = an;
            await delay(10000);
            resolve(true);
        } else {
            logWarn(`[AN] (${bot.customUsername}) Не удалось подтвердить подключение к ${an}`, 'auction');
            resolve(false);
        }
    });
}


async function connectToSellAN(bot) {
    const an = chooseRandomAN();
    const success = await connectToAN(bot, an);
    if (success) {
        bot.activeSellAN = an;
        return true;
    } else {
        return false;
    }
}

module.exports = {
    chooseRandomAN,
    connectToAN,
    connectToSellAN,
    AN_LIST
};
