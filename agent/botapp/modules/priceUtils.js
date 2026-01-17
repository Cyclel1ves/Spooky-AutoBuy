function chooseNiceStep(maxStep) {
    const limit = Math.max(1, Math.floor(maxStep || 1));

    let pow10 = 1;
    while (pow10 * 10 <= limit) pow10 *= 10;

    while (pow10 >= 1) {
        for (const m of [10, 5, 2, 1]) {
            const step = m * pow10;
            if (step <= limit) return step;
        }
        pow10 = Math.floor(pow10 / 10);
    }

    return 1;
}

function normalizePrice(value, options = {}) {
    const v = Number(value);
    if (!Number.isFinite(v) || v <= 0) return 1;

    const mode = options.mode || 'nearest';
    const maxRelErrorRaw = Number(options.maxRelError);
    const maxRelError = Number.isFinite(maxRelErrorRaw) ? maxRelErrorRaw : 0.01;
    const err = Math.min(0.2, Math.max(0, maxRelError));

    const stepLimit = Math.max(1, Math.floor(v * err * 2));
    const step = chooseNiceStep(stepLimit);

    const div = v / step;
    let k;
    if (mode === 'down') k = Math.floor(div);
    else if (mode === 'up') k = Math.ceil(div);
    else k = Math.round(div);

    let rounded = k * step;
    if (!Number.isFinite(rounded)) rounded = v;

    rounded = Math.max(1, Math.round(rounded));
    return rounded;
}

module.exports = {
    chooseNiceStep,
    normalizePrice
};
