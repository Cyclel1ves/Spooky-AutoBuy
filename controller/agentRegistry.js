const agents = new Map();

function registerAgent(socket, info) {
    agents.set(socket.id, { socket, ...info });
}

function updateAgentBots(socket, bots) {
    const ag = agents.get(socket.id);
    if (ag) ag.bots = bots;
}

function setAgentRole(socket, role) {
    const ag = agents.get(socket.id);
    if (ag) ag.role = role;
}

function removeAgent(socket) {
    agents.delete(socket.id);
}

function listAgents() {
    return Array.from(agents.values()).map(a => ({
        vpsId: a.vpsId,
        bots: a.bots || [],
        socketId: a.socket.id,
        role: a.role || 'worker',
        auctionType: a.auctionType || 'a'
    }));
}

module.exports = {
    agents,
    registerAgent,
    updateAgentBots,
    removeAgent,
    listAgents,
    setAgentRole
};
