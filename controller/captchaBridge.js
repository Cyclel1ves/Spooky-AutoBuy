const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const config = require('./config.js');

async function relayCaptchaRequest(tg, { id, botName, pngBase64 }) {
    const filePath = path.join('/tmp', `captcha_${id}.png`);
    fs.writeFileSync(filePath, Buffer.from(pngBase64, 'base64'));
    const caption = `Капча для ${botName}\nОтветьте: /solve ${id} <цифры>`;
    try {
        await tg.sendPhoto(config.telegram.chatId, filePath, { caption });
    } catch (err) {
        console.error('[TG] sendPhoto failed:', err.message);
    }
    fs.unlink(filePath, () => { });
}

module.exports = {
    relayCaptchaRequest
};
