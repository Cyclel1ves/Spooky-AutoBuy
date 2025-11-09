function norm(x) {
  return String(x || '').trim().toLowerCase();
}

function shouldSkipLot(lot, botNames) {
  if (!lot) return false;
  const set = new Set(Array.from(botNames || []).map(norm));
  const candidates = [
    lot.seller,
    lot.owner,
    lot.username,
    lot.nickname,
    lot.nick,
    lot.name,
    lot.user,
  ]
    .map(norm)
    .filter(Boolean);

  return candidates.some((c) => set.has(c));
}

function filterLots(lots, botNames) {
  return (lots || []).filter((l) => !shouldSkipLot(l, botNames));
}

module.exports = { shouldSkipLot, filterLots };
