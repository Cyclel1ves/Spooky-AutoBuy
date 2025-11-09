
function toList(tag) {
    if (!tag) return [];
    if (Array.isArray(tag)) return tag;
    if (Array.isArray(tag.value)) return tag.value;
    if (tag.value && Array.isArray(tag.value.value))
        return tag.value.value;
    return [];
}


function toNumber(v) {
    if (v && typeof v === 'object' && 'value' in v) v = v.value;
    return Number(v);
}

module.exports = { toList, toNumber };
