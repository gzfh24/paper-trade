const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: String,
    itemType: String,
    quantity: Number,
    currentPrice: Number
})

const transactionSchema = new Schema({
    itemName: String,
    itemType: String,
    quantity: Number,
    purchasePrice: Number,
    purchaseDate: { type: Date, default: Date.now }
})

const portfolioSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    value: { type: Number, default: 10000 },
    items: { type: [itemSchema], default: [] },
    transactions: { type: [transactionSchema], default: [] }
})



module.exports = mongoose.model('Portfolio', portfolioSchema)