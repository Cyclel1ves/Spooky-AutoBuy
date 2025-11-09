const MIN_SAFE = 1e8;

function collectCandidates(agentsMap) {
    const arr = [];
    for (const ag of agentsMap.values()) {
        const bots = ag.bots?.bots || [];
        for (const b of bots) {
            if (b.username) {
                const bal = Number(b.balance || 0);
                arr.push({ socket: ag.socket, username: b.username, balance: bal });
            }
            if (b.helper && b.helper.username) {
                const bal = Number(b.helper.balance || 0);
                arr.push({ socket: ag.socket, username: b.helper.username, balance: bal });
            }
        }
    }
    return arr;
}

function allocate(candidates, required) {
    let list = candidates.filter(c => c.balance > MIN_SAFE)
        .map(c => ({ ...c, available: c.balance - MIN_SAFE }));
    if (list.length === 0) return null;
    const totalAvailable = list.reduce((s, c) => s + c.available, 0);
    if (totalAvailable < required) return null;

    const balances = list.map(c => c.balance);
    const max = Math.max(...balances);
    const min = Math.min(...balances);
    const useAll = max / min < 1.2;

    let subset;
    if (useAll) {
        subset = list;
    } else {
        list.sort((a, b) => b.available - a.available);
        subset = [];
        let sum = 0;
        for (const c of list) {
            subset.push(c);
            sum += c.available;
            if (sum >= required) break;
        }
    }
    const subsetTotal = subset.reduce((s, c) => s + c.available, 0);
    const allocations = subset.map(c => ({
        socket: c.socket,
        username: c.username,
        allocation: Math.floor(required * (c.available / subsetTotal))
    }));
    let allocated = allocations.reduce((s, a) => s + a.allocation, 0);
    let rem = required - allocated;
    for (let i = 0; rem > 0; i = (i + 1) % allocations.length) {
        allocations[i].allocation += 1;
        rem -= 1;
    }
    return allocations;
}

function planTransfer(agentsMap, an, recipient, amount) {
    const candidates = collectCandidates(agentsMap);
    const allocations = allocate(candidates, amount);
    if (!allocations) return null;
    const bySocket = new Map();
    for (const a of allocations) {
        if (a.allocation <= 0) continue;
        const arr = bySocket.get(a.socket) || [];
        arr.push({ bot: a.username, an, recipient, amount: a.allocation });
        bySocket.set(a.socket, arr);
    }
    return bySocket;
}

module.exports = { planTransfer };
