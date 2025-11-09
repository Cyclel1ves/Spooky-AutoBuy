const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'visitedAN.json');

function loadVisitedData() {
    if (!fs.existsSync(filePath)) return {};
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Ошибка чтения visitedAN.json:', err);
        return {};
    }
}

function saveVisitedData(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Ошибка записи visitedAN.json:', err);
    }
}

function hasVisited(botNick, an) {
    const data = loadVisitedData();
    return data[botNick] && data[botNick].includes(an);
}

function markVisited(botNick, an) {
    const data = loadVisitedData();
    if (!data[botNick]) {
        data[botNick] = [];
    }
    if (!data[botNick].includes(an)) {
        data[botNick].push(an);
        saveVisitedData(data);
    }
}

module.exports = { hasVisited, markVisited };
