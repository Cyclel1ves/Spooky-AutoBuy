
const { normalizePrice } = require('./priceUtils');

function solvePowerLaw(p1, y1, p2, y2) {
    const n = Math.log(y2 / y1) / Math.log(p2 / p1);
    const A = y1 / Math.pow(p1, n);
    return { A, n };
}


function computeSimplePrice(lots, historicalPrice) {
    if (!lots || lots.length === 0) {
        const fallback = historicalPrice || 0;
        const rawBuy = fallback * 0.75;
        const rawSell = fallback * 0.80;
        return {
            absolutePrice: fallback,
            buyPrice: normalizePrice(rawBuy),
            sellPrice: normalizePrice(rawSell)
        };
    }

    let newPrice = Math.min(...lots.map(lot => lot.unitPrice));

    if (historicalPrice && historicalPrice > 0) {
        const { A: B, n: m } = solvePowerLaw(1e5, 0.05, 1e8, 0.005);
        const boundFactor = B * Math.pow(historicalPrice, m);

        const lowerBound = historicalPrice * (1 - boundFactor);
        const upperBound = historicalPrice * (1 + boundFactor);

        if (newPrice < lowerBound) newPrice = lowerBound;
        if (newPrice > upperBound) newPrice = upperBound;
    }

    const { A, n } = solvePowerLaw(1e5, 0.17, 1e8, 0.03);
    let margin = A * Math.pow(newPrice, n);

    if (margin > 0.17) {
        margin = 0.17;
    }

    if (margin < 0.03) {
        margin = 0.03;
    }

    const rawBuy = newPrice * (1 - margin);
    const rawSell = newPrice * (1 - margin);

    const buyPrice = normalizePrice(rawBuy);
    const sellPrice = normalizePrice(rawSell);

    return {
        absolutePrice: newPrice,
        buyPrice,
        sellPrice
    };
}

module.exports = {
    computeSimplePrice
};
