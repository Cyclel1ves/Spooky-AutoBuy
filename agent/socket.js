const { io } = require('socket.io-client');

function createSocket(url, vpsId) {
    const socket = io(url, {
        auth: { vpsId },
        reconnectionDelayMax: 8000
    });

    socket.on('connect', () =>
        socket.emit('agent:hello', { vpsId, bots: [] })
    );

    socket.updateBots = bots => socket.emit('bots:update', bots);

    socket.on('disconnect', () => console.log('[SOCK] disconnected'));

    return socket;
}

module.exports = {
    createSocket
};
