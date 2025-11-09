
const path = require('path');
let config;
let emitLogFunction = null;

try {
    config = require(path.join(__dirname, '..', 'config'));
} catch (error) {
    console.error(`[ERROR] Не удалось загрузить config.js: ${error.message}`);
    process.exit(1);
}


function setEmitLogFunction(func) {
    emitLogFunction = func;
}

function getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${ms}`;
}

function formatMessage(level, category, message) {
    const ts = getTimestamp();
    return `[${ts}] [${level}] [${category.toUpperCase()}] ${message}`;
}

function logInfo(message, category = 'general') {
    if (config.logging.info && shouldLogCategory(category)) {
        const formatted = formatMessage('INFO', category, message);
        console.log(formatted);
        if (emitLogFunction) {
            emitLogFunction('INFO', category, message);
        }
    }
}

function logWarn(message, category = 'general') {
    if (config.logging.warn && shouldLogCategory(category)) {
        const formatted = formatMessage('WARN', category, message);
        console.warn(formatted);
        if (emitLogFunction) {
            emitLogFunction('WARN', category, message);
        }
    }
}

function logError(message, category = 'general') {
    if (config.logging.error && shouldLogCategory(category)) {
        const formatted = formatMessage('ERROR', category, message);
        console.error(formatted);
        if (emitLogFunction) {
            emitLogFunction('ERROR', category, message);
        }
    }
}


function shouldLogCategory(category) {
    switch (category.toLowerCase()) {
        case 'chat': return config.logging.chat;
        case 'auction': return config.logging.auction;
        case 'balance': return config.logging.balance;
        case 'tasks': return config.logging.tasks;
        case 'server': return config.logging.info;
        case 'general': return config.logging.info;
        default:
            return true;
    }
}

module.exports = {
    setEmitLogFunction,
    logInfo,
    logWarn,
    logError
};
