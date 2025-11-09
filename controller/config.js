const path = require('path');

function toNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

module.exports = {
    port: toNumber(process.env.PORT, 4000),
    telegram: {
        token: process.env.TELEGRAM_TOKEN || '',
        chatId: process.env.TELEGRAM_CHAT_ID || ''
    },
    bareApiKey: process.env.BARE_API_KEY || '',
    priceStorePath: path.resolve('./priceStore.json')
};
