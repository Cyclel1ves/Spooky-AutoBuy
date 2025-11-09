const config = require('./config.js');

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function solveCaptcha(base64Image) {
    const site = 'https://bare-api.shop/';
    const apiKey = config.bareApiKey || '';
    console.log('[captcha] sending to BARE API');
    const postData = new URLSearchParams({
        key: apiKey,
        method: 'base64',
        body: base64Image
    });
    const postResponse = await fetch(`${site}/in.php`, {
        method: 'POST',
        body: postData
    });
    const postText = await postResponse.text();
    const captchaId = postText.split('|')[1]?.split('\n')[0];

    console.log(`[captcha] BARE API id ${captchaId}`);

    const getData = new URLSearchParams({
        key: apiKey,
        action: 'get',
        id: captchaId
    });

    let answer = null;
    for (let i = 0; i < 20; i++) {
        await delay(1000);
        const getResponse = await fetch(`${site}/res.php?${getData}`);
        const text = await getResponse.text();
        if (text.startsWith('OK|')) {
            answer = text.split('|')[1].split('\n')[0];
            break;
        }
        if (text !== 'CAPCHA_NOT_READY') {
            console.error('[captcha] API error:', text);
            break;
        }
    }

    console.log(`[captcha] BARE API answer ${answer}`);
    return answer;
}

module.exports = { solveCaptcha };
