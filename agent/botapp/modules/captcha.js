
const FlayerCaptcha = require('flayercaptcha');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { delay } = require('./utils');




const dirs = new Map([
    ['3 2', 'up'], ['3 -2', 'down'], ['3 0', 'south'],
    ['2 0', 'west'], ['0 0', 'north'], ['5 0', 'east']
]);
const reverse = {
    up: 'down', down: 'up', south: 'north',
    north: 'south', west: 'east', east: 'west'
};

function getViewDir(yaw, pitch) {
    const raw = dirs.get(`${Math.round(yaw)} ${Math.round(pitch)}`);
    return reverse[raw];
}




function waitAnswer(id, type, timeoutMs) {
    return new Promise(resolve => {
        const timer = setTimeout(() => done(null), timeoutMs);
        function handler(msg) {
            if (msg?.t !== `${type}Answer` || msg.id !== id) return;
            done(msg.answer ?? msg.ok);
        }
        function done(val) {
            clearTimeout(timer);
            process.off('message', handler);
            resolve(val);
        }
        process.on('message', handler);
    });
}

function send(event) {
    if (typeof process.send === 'function') process.send(event);
}




function waitForUserApproval(botName, timeoutMs) {
    return new Promise(resolve => {
        const id = uuidv4();
        send({ t: 'approvalRequest', id, botName });
        waitAnswer(id, 'approve', timeoutMs).then(ok => resolve(ok === true));
    });
}




async function handleCaptchaTrigger(bot) {
    if (!bot.requireCaptcha || bot.captchaInProgress) return;

    bot.captchaInProgress = true;
    try {
        const id = uuidv4();
        console.log(`[CAPTCHA][${bot.customUsername}] send text request ${id}`);
        send({ t: 'captcha', id, botName: bot.customUsername });

        const digits = await waitAnswer(id, 'captcha', 60_000);
        if (!digits) throw new Error('no answer');

        bot.chat(digits);
        console.log(`[CAPTCHA][${bot.customUsername}] solved ${digits}`);
    } catch (e) {
        console.log(`[CAPTCHA][${bot.customUsername}] fail: ${e.message}`);
        bot.end('captcha_fail');
    } finally {
        bot.requireCaptcha = false;
        bot.captchaInProgress = false;
    }
}




function initCaptchaSystem(bot) {
    const fl = new FlayerCaptcha(bot);
    bot.captchaInProgress = false;

    fl.on('imageReady', async ({ image, data }) => {
        const viewDir = data.viewDirection;
        if (!bot.requireCaptcha) {
            await delay(2000);
            if (!bot.requireCaptcha) return;
        }
        if (bot.captchaInProgress) return;
        const dir = getViewDir(bot.entity?.yaw, bot.entity?.pitch);
        if (!dir || dir !== viewDir) return;

        bot.captchaInProgress = true;
        try {
            const id = uuidv4();
            const buffer = await image.toBuffer();
            console.log(`[CAPTCHA][${bot.customUsername}] send image request ${id}`);
            send({
                t: 'captcha',
                id,
                botName: bot.customUsername,
                viewDir,
                png: buffer.toString('base64')
            });

            const answer = await waitAnswer(id, 'captcha', 60_000);
            if (!answer) throw new Error('timeout');

            bot.chat(answer);
            console.log(`[CAPTCHA][${bot.customUsername}] solved ${answer}`);
        } catch (e) {
            console.log(`[CAPTCHA][${bot.customUsername}] fail: ${e.message}`);
            bot.end('captcha_fail');
        } finally {
            bot.requireCaptcha = false;
            bot.captchaInProgress = false;
        }
    });
}


module.exports = {
    waitForUserApproval,
    initCaptchaSystem,
    handleCaptchaTrigger
};
