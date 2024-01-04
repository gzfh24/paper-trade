const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assetSchema = new Schema({
    assetName: String,
    assetType: String,
    assetSymbol: String,
    quantity: Number
    // currentPrice: Number --- can just fetch when needed
})

const transactionSchema = new Schema({
    assetName: String,
    assetType: String,
    assetSymbol: String,
    quantity: Number,
    transactionType: String,
    purchasePrice: Number,
    totalPrice: Number,
    purchaseDate: { type: Date, default: Date.now }
})

const portfolioSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    cash: { type: Number, default: 10000 },
    assets: { type: [assetSchema], default: [] },
    transactions: { type: [transactionSchema], default: [] }
})

module.exports = mongoose.model('Portfolio', portfolioSchema)