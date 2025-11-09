const fs = require('fs');
const path = require('path');

const feedPath = path.join(__dirname, '..', 'itemFeed.json');

function readFeed() {
    try {
        if (fs.existsSync(feedPath)) {
            const data = fs.readFileSync(feedPath, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('[itemFeed] read error:', err);
    }
    return [];
}

function writeFeed(arr) {
    try {
        fs.writeFileSync(feedPath, JSON.stringify(arr, null, 2), 'utf8');
    } catch (err) {
        console.error('[itemFeed] write error:', err);
    }
}

const feed = readFeed();

function addItem({ id, price, sellPrice, timestamp = Date.now() }) {
    feed.push({ id, price, sellPrice, timestamp });
    if (feed.length > 1000) feed.shift();
    writeFeed(feed);
}

function getFeed() {
    return [...feed];
}

module.exports = { addItem, getFeed };
