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
    const quantity = Number(req.body.quantity)
    try {
        const portfolio = await Portfolio.findOne({userId});
        
        if (!portfolio) {
            console.log('Portfolio not found')
            throw new Error();
        };
        if (portfolio.cash - quote.regularMarketPrice * quantity < 0) {
            return res.status(400).json({value: false})
        }
        let asset;
        for (const element of portfolio.assets) {
            if (element.assetSymbol === quote.symbol) {
                asset = element;
                break;
            }
        }
        if (asset) {
            asset.quantity += quantity;
            console.log(asset.quantity)
        } else {
            const newAsset = {
                assetName: quote.shortName,
                assetType: quote.quoteType,
                assetSymbol: quote.symbol,
                quantity,
                // currentPrice: quote.regularMarketPrice
            }
            portfolio.assets.push(newAsset)
        }
        const newTransaction = {
            assetName: quote.shortName,
            assetType: quote.quoteType,
            assetSymbol: quote.symbol,
            quantity,
            transactionType: 'BUY',
            purchasePrice: quote.regularMarketPrice,
            totalPrice: quote.regularMarketPrice * quantity
        }
        portfolio.cash -= newTransaction.totalPrice;
        portfolio.transactions.push(newTransaction);
        await portfolio.save();
        console.log(portfolio)
        res.locals.portfolio = portfolio;
        return next();
    } catch(error) {
        console.error(error);
        return next('Error in assetController.buyAsset');
    }
}

assetController.sellAsset = async(req, res, next) => {
    const userId = res.locals.userId;
    const quote = res.locals.quote;
    const assetId = req.body.assetId;
    const quantity = Number(req.body.quantity);
    console.log(assetId);
    try {
        const portfolio = await Portfolio.findOne({userId});
        if (!portfolio) {
            console.log('Portfolio not found')
            throw new Error();
        };
        let asset;
        let index = 0;
        for (const element of portfolio.assets) {
            if (element._id.toString() === assetId) {
                asset = element;
                break;
            }
            index++;
        }
        if (!asset) {
            console.log('Asset not found');
            throw new Error();
        }
        if (asset.quantity < quantity) {
            console.log('Not enough to sell')
            return res.status(400).json({value: false})
        }
        asset.quantity -= quantity;
        if (asset.quantity === 0) {
            portfolio.assets.splice(index, 1);
        };
        const newTransaction = {
            assetName: quote.shortName,
            assetType: quote.quoteType,
            assetSymbol: quote.symbol,
            quantity,
            transactionType: 'SELL',
            purchasePrice: quote.regularMarketPrice,
            totalPrice: quote.regularMarketPrice * quantity
        }
        portfolio.cash += newTransaction.totalPrice;
        portfolio.transactions.push(newTransaction);
        await portfolio.save();
        res.locals.portfolio = portfolio;
        return next();
    } catch {
        return next('Error in assetController.sellAsset')
    }
}

module.exports = assetController;