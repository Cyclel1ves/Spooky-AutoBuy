const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'listedItems.json');


function readListedItemsFile() {
    if (!fs.existsSync(FILE_PATH)) {
        return {};
    }
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`[listedItemsStore] Ошибка чтения: ${err.message}`);
        return {};
    }
}


function writeListedItemsFile(obj) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(obj, null, 2), 'utf8');
    } catch (err) {
        console.error(`[listedItemsStore] Ошибка записи: ${err.message}`);
    }
}


function loadListedItems(botUsername) {
    const all = readListedItemsFile();
    return all[botUsername] || [];
}


function saveListedItems(botUsername, items) {
    const all = readListedItemsFile();
    all[botUsername] = items;
    writeListedItemsFile(all);
}

module.exports = {
    loadListedItems,
    saveListedItems
};
