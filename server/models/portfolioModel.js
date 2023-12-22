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
    purchaseDate: Date
})

const portfolioSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    value: Number,
    items: [itemSchema],
    transactions: [transactionSchema]
})



module.exports = mongoose.model('Portfolio', portfolioSchema)