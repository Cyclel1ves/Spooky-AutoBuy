const { logInfo } = require('./logging');
const { delay } = require('./utils');

let helperANIndex = 0;
const helperANs = [
    '/an212', '/an213', '/an214', '/an215', '/an216', '/an217',
    '/an218', '/an219', '/an220', '/an221', '/an222', '/an223',
    '/an224', '/an211'
];

let mainANIndex = 0;
const mainANs = [
    '/an211', '/an212', '/an213', '/an214', '/an215', '/an216',
    '/an217', '/an218', '/an219', '/an220', '/an221', '/an222',
    '/an223', '/an224'
];

function getNextHelperAN() {
    const result = helperANs[helperANIndex % helperANs.length];
    helperANIndex++;
    return result;
}

function getNextMainAN() {
    const result = mainANs[mainANIndex % mainANs.length];
    mainANIndex++;
    return result;
}



async function executeCommands(bot) {
    await delay(1000);
    bot.chat(`/reg ${bot.password}`);
    await delay(1200);
    bot.chat(`/login ${bot.password}`);
    logInfo('/login', 'general');
    await delay(1400);

    let defaultAN;
    if (bot.customUsername.endsWith('7')) {
        defaultAN = getNextHelperAN();
    } else {
        defaultAN = getNextMainAN();
    }

    bot.chat(defaultAN);
    bot.currentAN = defaultAN.replace('/', '');
    logInfo(defaultAN, 'general');

    await delay(1000);
    await delay(2000);
    bot.chat('/darena');
    logInfo('/darena', 'general');
    await delay(2000);

    try {
        await bot.clickWindow(24, 0, 0);
        logInfo('Clicked slot 25 after /darena', 'general');
    } catch (error) {
        logWarn(`Failed to click slot 25: ${error.message}`, 'general');
    }

    await delay(15000);

}

module.exports = {
    executeCommands
};
