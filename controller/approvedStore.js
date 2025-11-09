const fs = require('fs');
const path = require('path');
const storePath = path.join(__dirname, '..', 'approvedMachines.json');

function readStore() {
    try {
        if (fs.existsSync(storePath)) {
            return new Set(JSON.parse(fs.readFileSync(storePath, 'utf8')));
        }
    } catch (err) {
        console.error('[approvedStore] read error:', err);
    }
    return new Set();
}

function writeStore(set) {
    try {
        fs.writeFileSync(storePath, JSON.stringify([...set], null, 2), 'utf8');
    } catch (err) {
        console.error('[approvedStore] write error:', err);
    }
}

const approved = readStore();

function isApproved(vpsId) {
    return approved.has(vpsId);
}

function addApproved(vpsId) {
    if (!approved.has(vpsId)) {
        approved.add(vpsId);
        writeStore(approved);
    }
}

module.exports = {
    isApproved,
    addApproved,
};
