const yahooFinance = require('yahoo-finance2').default;
const assetController = {};

assetController.lookupStock = async (req, res, next) => {
    const asset = req.body.asset;
    try {
        const quote = await yahooFinance.quote(asset);
        res.locals.quote = {
            price: quote.regularMarketPrice,
            currency: quote.currency
        }
        return next();
    } catch {
        return next('Error in assetController.lookupStock');
    }
}

module.exports = assetController;