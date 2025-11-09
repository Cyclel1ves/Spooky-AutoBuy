const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const config = require('./config.js');
const { solveCaptcha } = require('./bareApiSolver.js');
const { updatePrice, getPriceSnapshot } = require('./priceStore.js');
const { addApproved, isApproved } = require('./approvedStore.js');
const { planTransfer } = require('./transferPlanner.js');
const { addItem: addFeedItem, getFeed } = require('./itemFeed.js');
const {
    agents,
    registerAgent,
    updateAgentBots,
    removeAgent,
    listAgents,
    setAgentRole
} = require('./agentRegistry.js');

let priceUpdaterAgentId = null;

function assignRoles() {
    if (agents.size === 0) {
        priceUpdaterAgentId = null;
        return;
    }

    if (!priceUpdaterAgentId || !agents.has(priceUpdaterAgentId)) {
        priceUpdaterAgentId = agents.keys().next().value;
    }

    for (const [id, ag] of agents.entries()) {
        const base = id === priceUpdaterAgentId ? 'updater' : 'worker';
        const type = ag.auctionType || 'a';
        const desired = `${base}-${type}`;
        if (ag.role !== desired) {
            setAgentRole(ag.socket, desired);
            ag.socket.emit('assignRole', desired);
            console.log(`[IO] role for ${ag.vpsId} -> ${desired}`);
        }
    }
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'webui')));

const pendingApprove = new Map();

io.on('connection', socket => {
    const { vpsId } = socket.handshake.auth || {};
    console.log(`[IO] ${vpsId} connected (${socket.id})`);

    socket.on('agent:hello', info => {
        registerAgent(socket, { vpsId, ...info });
        assignRoles();
        console.log(`[IO] agent registered ${vpsId}`);
    });

    socket.on('bots:update', bots => updateAgentBots(socket, bots));

    socket.on('log', msg => {
        const prefix = vpsId ? `[${vpsId}]` : '[agent]';
        console.log(prefix, msg.level, msg.category, msg.message);
    });

    socket.on('approve:request', ({ id, botName, vpsId: reqVpsId }) => {
        const machineId = reqVpsId || vpsId;
        if (isApproved(machineId)) {
            socket.emit('approve:answer', { t: 'approve:answer', id, ok: true });
        } else {
            pendingApprove.set(id, { socketId: socket.id, botName, vpsId: machineId });
        }
    });

    socket.on('captcha:request', async ({ id, botName, png }) => {
        if (!png) return;
        console.log(`[captcha] request from ${botName} (${id})`);
        try {
            const answer = await solveCaptcha(png);
            console.log(`[captcha] answer for ${botName}: ${answer}`);
            socket.emit('captcha:answer', { t: 'captcha:answer', id, answer });
        } catch (err) {
            console.error('[captcha] API error:', err.message);
        }
    });

    socket.on('price:update', p => {
        if (updatePrice(p)) io.emit('price:broadcast', getPriceSnapshot());
    });

    socket.on('disconnect', () => {
        if (priceUpdaterAgentId === socket.id) priceUpdaterAgentId = null;
        removeAgent(socket);
        assignRoles();
        console.log(`[IO] ${vpsId} disconnected`);
    });
});

app.get('/api/agents', (_, res) => res.json(listAgents()));
app.get('/api/price', (_, res) => res.json(getPriceSnapshot()));
app.post('/api/chat', (req, res) => {
    const { bot, message } = req.body || {};
    if (bot && message) io.emit('chat', { bot, message });
    res.json({ ok: true });
});

app.post('/api/transfer', (req, res) => {
    const { an, recipient, amount } = req.body || {};
    const amt = parseInt(amount, 10);
    if (!(an && recipient && amt > 0)) {
        return res.status(400).json({ ok: false });
    }

    const tasksBySocket = planTransfer(agents, an, recipient, amt);
    if (!tasksBySocket) {
        return res.status(400).json({ ok: false, error: 'insufficient funds' });
    }

    for (const [socket, tasks] of tasksBySocket.entries()) {
        socket.emit('transfer', { tasks });
    }

    res.json({ ok: true });
});

app.get('/api/approvals', (_, res) => {
    const list = Array.from(pendingApprove.entries()).map(([id, info]) => ({
        id,
        botName: info.botName,
        vpsId: info.vpsId
    }));
    res.json(list);
});

app.post('/api/approve', (req, res) => {
    const { id } = req.body || {};
    const info = pendingApprove.get(id);
    if (!info) return res.status(404).json({ ok: false });
    io.to(info.socketId).emit('approve:answer', { t: 'approve:answer', id, ok: true });
    pendingApprove.delete(id);
    addApproved(info.vpsId);
    res.json({ ok: true });
});

app.post('/api/start', (req, res) => {
    const { username } = req.body || {};
    if (username && priceUpdaterAgentId) {
        io.to(priceUpdaterAgentId).emit('startBotPair', { username });
    }
    res.json({ ok: true });
});

app.get('/api/feed', (_, res) => {
    res.json(getFeed());
});

app.post('/api/feed', (req, res) => {
    const { id, price, sellPrice } = req.body || {};
    const p = parseFloat(price);
    const s = parseFloat(sellPrice);
    if (!id || Number.isNaN(p) || Number.isNaN(s)) {
        return res.status(400).json({ ok: false });
    }
    addFeedItem({ id, price: p, sellPrice: s, timestamp: Date.now() });
    io.emit('feed:new', { id, price: p, sellPrice: s });
    res.json({ ok: true });
});

server.listen(config.port, () =>
    console.log(`Controller listening on :${config.port}`)
);
