const mineflayer = require('mineflayer');
const {
    logInfo,
    logWarn,
    logError,
    setEmitLogFunction
} = require('./modules/logging');
const { performAuctionActions } = require('./modules/auction');
const { parseAndBuyFromAh, startBalanceUpdater, autoSell } = require('./modules/ahParseBuy');
const { checkMyLotsAndRelistIfNeeded } = require('./modules/relist');
const { executeCommands } = require('./modules/botCommands');
const config = require('./config');
const { delay } = require('./modules/utils');
const { targetItems } = require('./modules/items');
const { loadListedItems, saveListedItems } = require('./modules/listedItemsStore');
const { startMonitorLoop } = require('./modules/monitor');

const {
    handleCaptchaTrigger,
    waitForUserApproval,
    initCaptchaSystem
} = require('./modules/captcha');

const { initTasksForBot, enqueueTask } = require('./modules/tasks');
const { startInventoryMonitoring } = require('./modules/inventoryCleaner');

const { hasVisited, markVisited } = require('./modules/visitedAN');
const { mergeSnapshot } = require('./modules/priceStore');
let scheduleTransfers;

function attachVanillaMimic(bot) {
    if (bot.mimic) return;

    const state = { timeouts: [], flyingTicker: null, active: false };

    function stop() {
        for (const t of state.timeouts) clearTimeout(t);
        state.timeouts.length = 0;
        if (state.flyingTicker) { clearInterval(state.flyingTicker); state.flyingTicker = null; }
        state.active = false;
    }

    function schedule(fn, delay) {
        const t = setTimeout(() => {
            const idx = state.timeouts.indexOf(t);
            if (idx !== -1) state.timeouts.splice(idx, 1);
            try { fn(); } catch {}
        }, delay);
        state.timeouts.push(t);
    }

    function sendArm(hand) {
        if (!bot?._client || bot._client.ended) return;
        try { bot._client.write('arm_animation', { hand }); } catch {}
    }

    function sendFlying() {
        if (!bot?._client || bot._client.ended) return;
        const onGround = !!bot.entity?.onGround;
        try { bot._client.write('flying', { onGround }); } catch {}
    }

    function start() {
        if (state.active) return;
        stop();
        state.active = true;

        const jitter = Math.floor(Math.random() * 30);
        schedule(() => sendArm(0), 280 + jitter);
        schedule(() => sendArm(1), 320 + jitter);
        schedule(sendFlying, 420 + jitter);
        schedule(sendFlying, 480 + jitter);
        schedule(sendFlying, 540 + jitter);

        const flyingInterval = 760 + Math.floor(Math.random() * 80);
        state.flyingTicker = setInterval(sendFlying, flyingInterval);
    }

    bot.mimic = { start, stop };
}


let setBotFinder;

setEmitLogFunction((level, category, message) => {
    if (typeof process.send === 'function') {
        process.send({ t: 'log', level, category, message });
    }
});

const activeBots = [];

process.setMaxListeners(100);

let currentRole = 'worker';

process.on('message', async msg => {
    if (!msg || !msg.t) return;
    switch (msg.t) {
        case 'init':
            currentRole = msg.role;
            break;
        case 'chat': {
            const bot = findBotByUsername(msg.bot);
            if (bot) bot.chat(msg.message);
            break;
        }
        case 'transfer':
            scheduleTransfers(msg.tasks);
            break;
        case 'getBotData':
            if (typeof process.send === 'function') {
                process.send({ t: 'botData', data: getAllBotData() });
            }
            break;
        case 'startBotPair':
            await startBotPair(msg.username);
            break;
        case 'priceSnapshot':
            if (msg.snapshot) {
                mergeSnapshot(msg.snapshot);
            }
            break;
    }
});


let lastUpdateTime = Date.now();
let lastTotalBalance = 0;
let currentHourlyIncome = 0;


function scheduleReconnection(bot, isMain) {
    if (bot._reconnectScheduled) return;
    bot._reconnectScheduled = true;

    const activeSellAN1 = bot.activeSellAN;
    const username = bot.customUsername;
    const isPriceUpdater = bot.isPriceUpdater;
    const delayMs = 5000;

    logWarn(`Запланировано переподключение бота ${username} через ${delayMs / 1e3} сек`, 'general');

    setTimeout(async () => {
        let newBot = null;
        const maxRetries = 5;
        let attempt = 0;
        while (attempt < maxRetries && !newBot) {
            try {
                newBot = await createMainBot(username, isPriceUpdater, true);
            } catch (err) {
                attempt++;
                logWarn(`[Reconnection] attempt ${attempt} for ${username} failed: ${err.message}`, 'general');
                await delay(5000);
            }
        }
        if (!newBot) return;

        newBot.activeSellAN = activeSellAN1;
        const rec = activeBots.find(p => p.mainBot === bot);
        if (rec) {
            rec.mainBot = newBot;
        }
    }, delayMs);
}


async function createMainBot(username, isPriceUpdater, skipApproval = false) {
    const skip = skipApproval || process.env.SKIP_APPROVAL === '1';
    if (!skip) {
        const ok = await waitForUserApproval(username, 300_000);
        if (!ok) throw new Error('User approval not given');
    }

    const mainBot = mineflayer.createBot({
        host: config.bot.host,
        port: config.bot.port,
        username,
        version: config.bot.version
    });

    attachVanillaMimic(mainBot);

    mainBot.customUsername = username;
    mainBot.myListedItems = [];
    mainBot.lastRelistTime = 0;
    mainBot.currentAN = null;
    mainBot.activeSellAN = null;
    mainBot.waitingForSaleBeforeBuy = false;
    mainBot.requireCaptcha = false;
    mainBot.isPriceUpdater = isPriceUpdater;

    startMonitorLoop(mainBot);
    initTasksForBot(mainBot);
    setupMainBotEvents(mainBot);
    initCaptchaSystem(mainBot);

    return mainBot;
}

async function createHelperBot(username, skipApproval = false) {
    return null;
}


async function waitCaptchaClear(bot, timeoutMs = 120_000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        if (!bot.requireCaptcha && !bot.captchaInProgress) break;
        await delay(1000);
    }
}

async function startBots(pairs, firstIsUpdater = false) {
    const skip = process.env.SKIP_APPROVAL === '1';
    for (let i = 0; i < pairs; i++) {
        const name = `Labjan4ik${i + 1}`;
        let mainBot;
        try {
            mainBot = await createMainBot(name, (firstIsUpdater && i === 0) || i === 0 || process.env.FORCE_UPDATER === '1', skip);
        } catch {
            continue;
        }
        await waitCaptchaClear(mainBot);
        activeBots.push({ mainBot });
    }
}


async function startBotPair(username) {
    let mainName = username;
    const exists = activeBots.find(p => p.mainBot?.customUsername === mainName);
    if (exists) {
        mainName = `${username}_${Date.now()}`;
    }
    const skip = process.env.SKIP_APPROVAL === '1';
    const isUpdater = (activeBots.length === 0) || (process.env.FORCE_UPDATER === '1') || (currentRole === 'updater');
    const mainBot = await createMainBot(mainName, isUpdater, skip);
    await waitCaptchaClear(mainBot);
    activeBots.push({ mainBot });
}


function setupMainBotEvents(bot) {
    const AUTH_OK = 'Успешная авторизация! Приятной игры!';

    function maybeStopMimicOnAuth(textMsg) {
        if (!textMsg) return;
        try {
            const s = String(textMsg).trim();
            if (s.includes(AUTH_OK)) {
                bot.__mimicEnabled = false;
                bot.mimic?.stop?.();
            }
        } catch {}
    }

    bot.on('message', (jsonMsg) => {
        try { maybeStopMimicOnAuth(jsonMsg?.toString?.()); } catch {}
    });

    bot.on('chat', (_username, message) => {
        try { maybeStopMimicOnAuth(message); } catch {}
    });
    try { attachVanillaMimic(bot); } catch {}
    if (bot.__mimicEnabled === undefined) bot.__mimicEnabled = true;
    bot.on('login', () => setTimeout(() => { try { if (bot.__mimicEnabled) bot.mimic?.start(); } catch {} }, 200));
    bot.on('spawn', () => { try { if (bot.__mimicEnabled) bot.mimic?.start(); } catch {} });
    bot.on('kicked', () => { try { bot.mimic?.stop(); } catch {} });
    bot.on('end', () => { try { bot.mimic?.stop(); } catch {} });

    try { attachVanillaMimic(bot); } catch {}
    bot.on('login', () => setTimeout(() => { try { bot.mimic?.start(); } catch {} }, 200));
    bot.on('spawn', () => { try { bot.mimic?.start(); } catch {} });
    bot.on('kicked', () => { try { bot.mimic?.stop(); } catch {} });
    bot.on('end', () => { try { bot.mimic?.stop(); } catch {} });

    bot.on('chat', (username, message) => {
        logInfo(`[Chat][${bot.customUsername}] ${username}: ${message}`, 'chat');
    });

    bot.on('message', async (message) => {
        const raw = message.toString();
        logInfo(`[Message][${bot.customUsername}] ${raw}`, 'general');

        if (raw.includes('Введите номер с картинки')) {
            bot.requireCaptcha = true;
        }
        const msg = message.getText().replace(/\u00A7./g, '');
        const msgLower = msg.toLowerCase();

        logInfo(`[DEBUG] Проверка входящего сообщения: ${msg}`, 'auction');

        if (
            msgLower.includes('пока вас не было') &&
            msg.includes('$') &&
            (
                msgLower.includes('принёс вам') ||
                msgLower.includes('принесли вам') ||
                msgLower.includes('продажи с аукциона')
            )
        ) {
            logInfo('[DEBUG] Сработал handleOfflineSale()', 'auction');
            handleOfflineSale(bot, msg);
        } else if (msg.includes('У Вас купили') && msg.includes('за')) {
            logInfo('[DEBUG] Сработал handleSingleSale()', 'auction');
            handleSingleSale(bot, msg);
        }
    });

    bot.on('windowOpen', (window) => {
        if (!window) {
            logWarn(`[${bot.customUsername}] windowOpen: null`, 'auction');
            return;
        }
        const wTitle = typeof window.title === 'string' ? window.title : JSON.stringify(window.title);
        bot.currentWindow = window;
        logInfo(`[${bot.customUsername}] Открыто окно: ${wTitle}`, 'auction');
    });

    bot.on('windowClose', (window) => {
        if (!window) {
            logWarn(`[${bot.customUsername}] windowClose: null`, 'auction');
            bot.currentWindow = null;
            return;
        }
        const wTitle = typeof window.title === 'string' ? window.title : JSON.stringify(window.title);
        bot.currentWindow = null;
        logInfo(`[${bot.customUsername}] Закрыто окно: ${wTitle}`, 'auction');
    });

    bot.on('error', (err) => {
        logError(`Ошибка у ${bot.customUsername}: ${err.message}`, 'general');
        if (err.message.includes('timed out')) {
            bot.quit();
        }
    });

    bot.on('kicked', (reason) => {
        const r = typeof reason === 'object' ? JSON.stringify(reason) : reason;
        logError(`Бот ${bot.customUsername} кикнут. Причина: ${r}`, 'general');
    });

    bot.once('end', (reason) => {
        logWarn(`Бот ${bot.customUsername} отключился. Причина: ${reason}`, 'general');
        scheduleReconnection(bot, true);
    });

    bot.on('kicked', (reason) => {
        scheduleReconnection(bot, true);
    });

    bot.once('spawn', async () => {
        logInfo(`Бот ${bot.customUsername} зашёл на сервер`, 'general');

        let captchaDetectedDuringWait = false;
        const tempListener = (message) => {
            if (message.toString().includes('Введите номер с картинки')) {
                captchaDetectedDuringWait = true;
            }
        };
        bot.on('message', tempListener);

        await delay(5000);

        bot.removeListener('message', tempListener);
        if (!captchaDetectedDuringWait) {
            startBalanceUpdater(bot);
            await executeCommands(bot);
            startInventoryMonitoring(bot, targetItems);
            startAuctionProcess(bot);
        } else {
            while (bot.captchaInProgress) {
                await delay(1000);
            }
            if (bot.state !== 'disconnected') {
                startBalanceUpdater(bot);
                await executeCommands(bot);
                startInventoryMonitoring(bot, targetItems);
                startAuctionProcess(bot);
            }
        }
    });
}
function handleSingleSale(bot, text) {
    const priceMatch = text.match(/\$(\d[\d,\.]*)/);
    if (!priceMatch) {
        logWarn(`[handleSingleSale] Не найдена сумма $ в сообщении: ${text}`, 'auction');
        return;
    }

    const rawPriceStr = priceMatch[1];
    const cleanedStr = rawPriceStr.replace(/[^\d]/g, '');
    const soldPrice = parseInt(cleanedStr, 10);
    if (isNaN(soldPrice)) {
        logWarn(`[handleSingleSale] Сумма $${rawPriceStr} не является числом`, 'auction');
        return;
    }

    const anNumber = bot.currentAN;
    if (!anNumber) {
        logWarn(`[handleSingleSale] Нет bot.currentAN, не можем удалить лот`, 'auction');
        return;
    }

    const listed = loadListedItems(bot.customUsername);
    if (!listed || listed.length === 0) {
        return;
    }

    const idx = listed.findIndex(lot => lot.anNumber === anNumber && lot.price === soldPrice);

    if (idx === -1) {
        logWarn(
            `[handleSingleSale] Не нашли лот an=${anNumber}, price=$${soldPrice} среди ${listed.length} записей`,
            'auction'
        );
        return;
    }

    listed.splice(idx, 1);
    saveListedItems(bot.customUsername, listed);
    bot.myListedItems = listed;

    logInfo(`[handleSingleSale] (${bot.customUsername}) Удалён лот an=${anNumber}, $${soldPrice}`, 'auction');

    bot.waitingForSaleBeforeBuy = false;
    enqueueTask(bot, async () => {
        await autoSell(bot, targetItems);
        await parseAndBuyFromAh(bot);
    });
}

function handleOfflineSale(bot, text) {
    const priceMatch = text.match(/\$(\d[\d,\.]*)/);
    if (!priceMatch) {
        logWarn(`[handleOfflineSale] Не найдена сумма в "${text}"`, 'auction');
        return;
    }

    const rawPriceStr = priceMatch[1];
    const cleanedStr = rawPriceStr.replace(/[^\d]/g, '');
    const soldPrice = parseInt(cleanedStr, 10);
    if (isNaN(soldPrice)) {
        logWarn(`[handleOfflineSale] Сумма $${rawPriceStr} не число`, 'auction');
        return;
    }

    const anNumber = bot.currentAN;
    if (!anNumber) {
        logWarn(`[handleOfflineSale] Нет bot.currentAN, не можем удалить лоты`, 'auction');
        return;
    }

    let listed = loadListedItems(bot.customUsername);
    if (!listed || listed.length === 0) {
        logInfo(`[handleOfflineSale] Нечего удалять у бота ${bot.customUsername}`, 'auction');
        return;
    }

    const relevantIndexes = [];
    for (let i = 0; i < listed.length; i++) {
        if (listed[i].anNumber === anNumber) {
            relevantIndexes.push(i);
        }
    }
    if (relevantIndexes.length === 0) {
        logWarn(`[handleOfflineSale] Нет лотов an=${anNumber}`, 'auction');
        return;
    }

    const subsetIndexes = findUpToThreeLots(listed, relevantIndexes, soldPrice);
    if (subsetIndexes.length === 0) {
        logWarn(
            `[handleOfflineSale] Не нашли комбинацию 1..3 лотов an=${anNumber} на сумму $${soldPrice}`,
            'auction'
        );
        return;
    }

    subsetIndexes.sort((a, b) => b - a);
    for (const idx of subsetIndexes) {
        listed.splice(idx, 1);
    }

    enqueueTask(bot, async () => {
        saveListedItems(bot.customUsername, listed);
        bot.myListedItems = listed;
        logInfo(
            `[handleOfflineSale] (${bot.customUsername}) Обновлён список лотов после удаления: ${JSON.stringify(listed)}`,
            'auction'
        );
    });

    logInfo(
        `[handleOfflineSale] (${bot.customUsername}) Удалено ${subsetIndexes.length} лот(ов) an=${anNumber} на $${soldPrice}`,
        'auction'
    );

    bot.waitingForSaleBeforeBuy = false;
    enqueueTask(bot, async () => {
        await autoSell(bot, targetItems);
        await parseAndBuyFromAh(bot);
    });
}


function findUpToThreeLots(listed, candidateIndexes, targetPrice) {
    for (const i of candidateIndexes) {
        if (listed[i].price === targetPrice) {
            return [i];
        }
    }
    for (let a = 0; a < candidateIndexes.length; a++) {
        for (let b = a + 1; b < candidateIndexes.length; b++) {
            const i = candidateIndexes[a];
            const j = candidateIndexes[b];
            if (listed[i].price + listed[j].price === targetPrice) {
                return [i, j];
            }
        }
    }
    for (let a = 0; a < candidateIndexes.length; a++) {
        for (let b = a + 1; b < candidateIndexes.length; b++) {
            for (let c = b + 1; c < candidateIndexes.length; c++) {
                const i = candidateIndexes[a];
                const j = candidateIndexes[b];
                const k = candidateIndexes[c];
                if (listed[i].price + listed[j].price + listed[k].price === targetPrice) {
                    return [i, j, k];
                }
            }
        }
    }
    return [];
}

function setupHelperBotEvents() {
}


function startAuctionProcess(bot) {
    const performAuctionTask = async () => {
        if (bot.isPriceUpdater) {
            await performAuctionActions(bot);
        }
    };
    const parseTask = async () => {
        await parseAndBuyFromAh(bot);
    };
    const rctTask = async () => {
        await rct(bot);
    };

    enqueueTask(bot, parseTask);
    enqueueTask(bot, rctTask);
    if (bot.isPriceUpdater) {
        enqueueTask(bot, performAuctionTask);
    }

    setInterval(() => {
        enqueueTask(bot, parseTask);
        enqueueTask(bot, rctTask);
        if (bot.isPriceUpdater) {
            enqueueTask(bot, performAuctionTask);
        }
    }, 15 * 60_000);

    setInterval(() => {
        enqueueTask(bot, rctTask);
        enqueueTask(bot, parseTask);
    }, 45_000);
}

function startHelperRCTProcess(bot) {
    const rctTask = async () => {
        await rct(bot);
    };

    enqueueTask(bot, rctTask);

    const intervalId = setInterval(() => {
        if (!bot.entity || bot.state === 'disconnected') {
            clearInterval(intervalId);
        } else {
            enqueueTask(bot, rctTask);
        }
    }, 120000);
}

const rctCommands = [
    '/an212', '/an213', '/an214', '/an215', '/an216', '/an217'
];

function initializeRCT(bot) {
    if (bot.rctIndex === undefined) {
        bot.rctIndex = 0;
    }
}

async function rct(bot) {
    try {
        initializeRCT(bot);
        await delay(1500);

        const cmd = rctCommands[bot.rctIndex];
        const an = cmd.slice(1);

        bot.currentAN = an;
        bot.chat(cmd);
        logInfo(`[rct] (${bot.customUsername}): ${cmd}`, 'actions');

        if (!hasVisited(bot.customUsername, an)) {

            markVisited(bot.customUsername, an);

            await delay(1000);
            logInfo(`[rct] (${bot.customUsername}): Переход на arena для ${an}`, 'actions');
            bot.chat('/darena');
            await delay(5000);

            try {
                await bot.clickWindow(24, 0, 0);
                logInfo(`[rct] (${bot.customUsername}): Слот 25 выбран после /darena`, 'actions');
            } catch (err) {
                logWarn(`[rct] (${bot.customUsername}): Ошибка при выборе слота 25: ${err.message}`, 'actions');
            }

            await delay(10000);

            bot.chat('/tpa Abrikson999');
            logInfo(`[rct] (${bot.customUsername}): Отправлена команда /tpa Abrikson999`, 'actions');
        } else {
            logInfo(
                `[rct] (${bot.customUsername}): ${an} уже посещена – переход без /darena.`,
                'actions'
            );
        }

        bot.rctIndex = (bot.rctIndex + 1) % rctCommands.length;
    } catch (err) {
        logError(`Ошибка в rct(${bot.customUsername}): ${err.message}`, 'general');
    }
    await delay(15000);
}

function startPeriodicJump(bot) {
    if (bot.customUsername !== 'Labjan4ik1') return;

    const jumpInterval = 15000;
    const doJump = async () => {
        if (!bot.entity) return;
        if (bot.entity.onGround) {
            bot.setControlState('jump', true);
            await delay(500);
            bot.setControlState('jump', false);
        }
    };
    const intervalId = setInterval(doJump, jumpInterval);
    bot.on('end', () => clearInterval(intervalId));
    bot.on('kicked', () => clearInterval(intervalId));
    bot.on('error', () => clearInterval(intervalId));
}


function getAllBotData() {
    const data = { totalBalance: 0, hourlyIncome: 0, bots: [] };
    activeBots.forEach(({ mainBot }) => {
        data.bots.push({
            username: mainBot.username,
            an: mainBot.currentAN,
            balance: mainBot.balance ? mainBot.balance.toString() : "0",
            logs: mainBot.logs || []
        });
        data.totalBalance += Number(mainBot.balance || 0);
    });

    const now = Date.now();
    const dtSec = (now - lastUpdateTime) / 1000;
    if (dtSec > 0) {
        const diff = data.totalBalance - lastTotalBalance;
        currentHourlyIncome = diff * (3600 / dtSec);
        lastUpdateTime = now;
        lastTotalBalance = data.totalBalance;
    }
    data.hourlyIncome = currentHourlyIncome;
    return data;
}


function stopAllBots() {
    activeBots.forEach(({ mainBot }) => { try { mainBot.quit(); } catch {} });
    activeBots.length = 0;
}


function findBotByUsername(username) {
    const rec = activeBots.find(p => p.mainBot && p.mainBot.username === username);
    return rec ? rec.mainBot : null;
}


function getMainBotsForTransfer() {
    return activeBots.slice(1).map(p => p.mainBot);
}


module.exports = {
    startBots,
    startBotPair,
    getAllBotData,
    stopAllBots,
    findBotByUsername,
    getMainBotsForTransfer
};

({ scheduleTransfers, setBotFinder } = require('./modules/transfer'));
setBotFinder(findBotByUsername);
