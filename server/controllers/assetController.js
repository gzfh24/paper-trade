const yahooFinance = require('yahoo-finance2').default;
const Portfolio = require('../models/portfolioModel')
const assetController = {};

// testing
// yahooFinance.quote('BTC-USD')
// .then(data => {
//     console.log(data)
// })

assetController.lookupStock = async (req, res, next) => {
    const asset = req.body.asset;
    try {
        const quote = await yahooFinance.quote(asset);
        res.locals.quote = quote;
        return next();
    } catch {
        return next('Error in assetController.lookupStock');
    }
}

assetController.buyAsset = async(req, res, next) => {
    const userId = res.locals.userId;
    const quote = res.locals.quote;
    try {
        const portfolio = await Portfolio.findOne({userId});
        if (!portfolio) {
            console.log('Portfolio not found')
            throw new Error()
        };
        const newAsset = {
            assetName: quote.shortName,
            assetType: quote.quoteType,
            assetSymbol: quote.symbol,
            quantity: req.body.quantity,
            // currentPrice: quote.regularMarketPrice
        }
        const newTransaction = {
            assetName: quote.shortName,
            assetType: quote.quoteType,
            assetSymbol: quote.symbol,
            quantity: req.body.quantity,
            transactionType: 'BUY',
            purchasePrice: quote.regularMarketPrice,
            totalPrice: quote.regularMarketPrice * req.body.quantity
        }
        portfolio.cash -= newTransaction.totalPrice;
        portfolio.assets.push(newAsset);
        portfolio.transactions.push(newTransaction);
        await portfolio.save();
        res.locals.portfolio = portfolio;
        return next();
    } catch {
        return next('Error in assetController.buyAsset')
    }
}

module.exports = assetController;