
const fs = require('fs');
const path = require('path');
const priceStorePath = path.join(__dirname, '..', 'priceStore.json');

let priceStore = readPriceStore();


function readPriceStore() {
    try {
        if (fs.existsSync(priceStorePath)) {
            const data = fs.readFileSync(priceStorePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error("[priceStore] Ошибка чтения:", err);
    }
    return {};
}


function writePriceStore(store) {
    try {
        fs.writeFileSync(priceStorePath, JSON.stringify(store, null, 2), 'utf8');
    } catch (err) {
        console.error("[priceStore] Ошибка записи:", err);
    }
}


function getHistoricalPrice(itemName) {
    const store = readPriceStore();
    if (
        store[itemName] &&
        typeof store[itemName].absoluteMinUnitPrice === 'number'
    ) {
        return store[itemName].absoluteMinUnitPrice;
    }
    return null;
}


function updatePriceData(newData) {
    const key = newData.item;

    if (!priceStore[key]) {
        priceStore[key] = {
            absoluteMinUnitPrice: newData.absoluteMinUnitPrice,
            buyPrice: newData.buyPrice,
            sellPrice: newData.sellPrice,
            timestamp: newData.timestamp,
            history: []
        };
    } else {
        priceStore[key].absoluteMinUnitPrice = newData.absoluteMinUnitPrice;
        priceStore[key].buyPrice = newData.buyPrice;
        priceStore[key].sellPrice = newData.sellPrice;
        priceStore[key].timestamp = newData.timestamp;

        if (!priceStore[key].history) {
            priceStore[key].history = [];
        }
    }

    writePriceStore(priceStore);
    console.log(`[priceStore] Обновили цену для "${key}": ${newData.absoluteMinUnitPrice}`);
}


function addHistoryRecord(itemName, newRecord) {

    if (!priceStore[itemName]) {
        priceStore[itemName] = {
            absoluteMinUnitPrice: 0,
            buyPrice: 0,
            sellPrice: 0,
            timestamp: newRecord.timestamp,
            history: []
        };
    }
    if (!priceStore[itemName].history) {
        priceStore[itemName].history = [];
    }

    priceStore[itemName].history.push(newRecord);

    if (priceStore[itemName].history.length > 1000) {
        priceStore[itemName].history.shift();
    }

    writePriceStore(priceStore);
    console.log(`[priceStore] addHistoryRecord -> "${itemName}":`, newRecord);
}


function getItemHistory(itemName) {
    if (priceStore[itemName] && Array.isArray(priceStore[itemName].history)) {
        return priceStore[itemName].history;
    }
    return [];
}
function getHistoricalSellPrice(itemName) {
    if (priceStore[itemName]) {
        if (typeof priceStore[itemName].sellPrice === 'number') {
            return priceStore[itemName].sellPrice;
        } else if (typeof priceStore[itemName].absoluteMinUnitPrice === 'number') {
            return priceStore[itemName].absoluteMinUnitPrice;
        }
    }
    return null;
}
function getPriceSnapshot() {
    return { ...priceStore };
}

function mergeSnapshot(snap) {
    if (!snap || typeof snap !== 'object') return;
    priceStore = { ...priceStore, ...snap };
    writePriceStore(priceStore);
}

module.exports = {
    getHistoricalPrice,
    getHistoricalSellPrice,
    updatePriceData,
    addHistoryRecord,
    getItemHistory,
    getPriceSnapshot,
    mergeSnapshot
};
