const { spawn } = require('child_process');
const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs');
const { createSocket } = require('./socket.js');


const VPS_ID = process.env.VPS_ID || 'vps-local';
const CTRL_URL = process.env.CTRL_URL || 'ws://localhost:4000';

const socket = createSocket(CTRL_URL, VPS_ID);

const BOTNAME_FILE = path.join(__dirname, 'botname.txt');
let savedBotName = null;
try {
    savedBotName = fs.readFileSync(BOTNAME_FILE, 'utf8').trim();
} catch {}

function saveBotName(name) {
    savedBotName = name;
    try { fs.writeFileSync(BOTNAME_FILE, name, 'utf8'); } catch (e) {
        console.error('[agent] failed to store bot name:', e.message);
    }
}

let currentRole = null;
let child;
let machineApproved = false;
let approveReqId = null;

function requestMachineApproval() {
    return new Promise(resolve => {
        approveReqId = uuid();
        socket.emit('approve:request', {
            id: approveReqId,
            botName: VPS_ID,
            vpsId: VPS_ID
        });
        function handler(data) {
            if (data.id === approveReqId) {
                socket.off('approve:answer', handler);
                machineApproved = data.ok === true;
                approveReqId = null;
                resolve(machineApproved);
            }
        }
        socket.on('approve:answer', handler);
    });
}

setInterval(() => {
    if (!child) return;
    child.send({ t: 'getBotData' });
}, 10_000);

socket.on('assignRole', role => {
    if (currentRole === role) return;
    currentRole = role;
    if (child) {
        child.kill();
    } else if (machineApproved) {
        start();
    }
});

socket.on('transfer', data => child?.send({ t: 'transfer', ...data }));

socket.on('connect', async () => {
    if (!machineApproved) {
        await requestMachineApproval();
        if (machineApproved && currentRole && !child) start();
    }
});

function start() {
    child = spawn('node', ['botapp.js'], {
        cwd: path.join(__dirname, 'botapp'),
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
        env: { ...process.env, SKIP_APPROVAL: '1' }
    });

    if (currentRole) {
        child.once('spawn', () => {
            child?.send({ t: 'init', role: currentRole });
            if (savedBotName) {
                child?.send({ t: 'startBotPair', username: savedBotName });
            }
        });
    } else if (savedBotName) {
        child.once('spawn', () => {
            child?.send({ t: 'startBotPair', username: savedBotName });
        });
    }

    child.on('message', msg => {
        if (!msg || !msg.t) return;
        switch (msg.t) {
            case 'captcha':
                socket.emit('captcha:request', msg);
                break;
            case 'approvalRequest':
                socket.emit('approve:request', msg);
                break;
            case 'price':
                socket.emit('price:update', msg.price);
                break;
            case 'botData':
                socket.updateBots(msg.data);
                break;
            case 'log':
                socket.emit('log', msg);
                break;
        }
    });

    child.on('exit', () => {
        child = null;
        if (machineApproved) setTimeout(start, 5_000);
    });
}

socket.on('captcha:answer', data =>
    child?.send({ ...data, t: 'captchaAnswer' })
);

socket.on('approve:answer', data => {
    if (approveReqId && data.id === approveReqId) {
        machineApproved = data.ok === true;
        approveReqId = null;
        if (machineApproved && currentRole && !child) start();
    } else {
        child?.send({ ...data, t: 'approveAnswer' });
    }
});

socket.on('price:broadcast', snap =>
    child?.send({ t: 'priceSnapshot', snapshot: snap })
);

socket.on('chat', ({ bot, message }) =>
    child?.send({ t: 'chat', bot, message })
);

socket.on('startBotPair', ({ username }) => {
    saveBotName(username);
    child?.send({ t: 'startBotPair', username });
});
