const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'listedItems.json');

function _readAll() {
    if (!fs.existsSync(FILE_PATH)) return {};
    try {
        const raw = fs.readFileSync(FILE_PATH, 'utf8');
        const parsed = JSON.parse(raw || '{}');
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (err) {
        console.error(`[listedItemsStore] Ошибка чтения: ${err.message}`);
        return {};
    }
}

function _writeAll(obj) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(obj || {}, null, 2), 'utf8');
    } catch (err) {
        console.error(`[listedItemsStore] Ошибка записи: ${err.message}`);
    }
}

function loadAllOpenListings() {
    const all = _readAll();
    const out = {};
    for (const [k, v] of Object.entries(all || {})) {
        out[String(k)] = Array.isArray(v) ? v : [];
    }
    return out;
}

function loadOpenListings(botUsername) {
    const all = _readAll();
    const list = all[String(botUsername || '')] || [];
    return Array.isArray(list) ? list : [];
}

function saveOpenListings(botUsername, listings) {
    const all = _readAll();
    all[String(botUsername || '')] = Array.isArray(listings) ? listings : [];
    _writeAll(all);
}

function upsertOpenListing(botUsername, listing) {
    if (!listing || typeof listing !== 'object') return;
    const key = String(botUsername || '');
    if (!key) return;
    const list = loadOpenListings(key);
    const id = listing.listingId;
    if (!id) return;
    const idx = list.findIndex((x) => x && x.listingId === id);
    const rec = { ...listing };
    if (!Number.isFinite(rec.listedAt)) rec.listedAt = Date.now();
    if (idx >= 0) list[idx] = { ...list[idx], ...rec };
    else list.push(rec);
    if (list.length > 2000) {
        list.sort((a, b) => (a?.listedAt || 0) - (b?.listedAt || 0));
        list.splice(0, Math.max(0, list.length - 2000));
    }
    saveOpenListings(key, list);
}

function removeOpenListing(botUsername, listingId) {
    const key = String(botUsername || '');
    if (!key || !listingId) return;
    const list = loadOpenListings(key).filter((x) => x && x.listingId !== listingId);
    saveOpenListings(key, list);
}

function findByItemNameCountPrice(botUsername, itemName, count, totalPrice) {
    const key = String(botUsername || '');
    if (!key) return null;
    const list = loadOpenListings(key);
    const name = String(itemName || '');
    const c = Number(count);
    const p = Number(totalPrice);

    const exact = list.find((x) => x && String(x.itemName || '') === name && Number(x.count) === c && Number(x.totalPrice) === p);
    if (exact) return exact;

    const alt = list.find((x) => x && String(x.itemName || '') === name && Number(x.totalPrice) === p);
    return alt || null;
}

function findBestByPrice(botUsername, amount, itemText) {
    const key = String(botUsername || '');
    if (!key) return null;
    const list = loadOpenListings(key);
    const p = Number(amount);
    if (!Number.isFinite(p)) return null;

    const candidates = list.filter((x) => x && Number(x.totalPrice) === p);
    if (candidates.length === 0) return null;

    const text = String(itemText || '').toLowerCase();
    if (text) {
        const byText = candidates.find((x) => {
            const nm = String(x.displayName || x.itemName || '').toLowerCase();
            return nm && (text.includes(nm) || nm.includes(text));
        });
        if (byText) return byText;
    }

    candidates.sort((a, b) => (a?.listedAt || 0) - (b?.listedAt || 0));
    return candidates[0] || null;
}

function _subsetSum(listings, target) {
    const items = listings
        .filter((x) => x && Number.isFinite(Number(x.totalPrice)) && Number(x.totalPrice) > 0)
        .map((x) => ({ ...x, totalPrice: Number(x.totalPrice) }))
        .filter((x) => x.totalPrice <= target)
        .sort((a, b) => b.totalPrice - a.totalPrice);

    const MAX = 28;
    const slice = items.slice(0, MAX);
    const memo = new Set();

    function dfs(i, remaining) {
        if (remaining === 0) return [];
        if (i >= slice.length) return null;
        const key = `${i}|${remaining}`;
        if (memo.has(key)) return null;

        const it = slice[i];
        if (it.totalPrice <= remaining) {
            const res = dfs(i + 1, remaining - it.totalPrice);
            if (res) return [it, ...res];
        }

        const res2 = dfs(i + 1, remaining);
        if (res2) return res2;

        memo.add(key);
        return null;
    }

    return dfs(0, target);
}

function previewOfflineAmount(botUsername, amount) {
    const key = String(botUsername || '');
    const p = Number(amount);
    if (!key || !Number.isFinite(p) || p <= 0) return null;
    const list = loadOpenListings(key);
    const matched = _subsetSum(list, p);
    if (!matched || matched.length === 0) return null;
    return matched;
}

function matchOfflineAmount(botUsername, amount) {
    const key = String(botUsername || '');
    const p = Number(amount);
    if (!key || !Number.isFinite(p) || p <= 0) return null;
    const list = loadOpenListings(key);
    const matched = _subsetSum(list, p);
    if (!matched || matched.length === 0) return null;

    const ids = new Set(matched.map((x) => x.listingId).filter(Boolean));
    const remaining = list.filter((x) => x && !ids.has(x.listingId));
    saveOpenListings(key, remaining);
    return matched;
}

function loadListedItems(botUsername) {
    return loadOpenListings(botUsername);
}

function saveListedItems(botUsername, items) {
    return saveOpenListings(botUsername, items);
}

module.exports = {
    loadAllOpenListings,
    loadOpenListings,
    saveOpenListings,
    upsertOpenListing,
    removeOpenListing,
    findByItemNameCountPrice,
    findBestByPrice,
    previewOfflineAmount,
    matchOfflineAmount,
    loadListedItems,
    saveListedItems
};
