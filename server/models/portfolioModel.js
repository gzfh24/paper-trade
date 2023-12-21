const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: String,
    quantity: Number,
    purchasePrice: Number,
    currentPrice: Number,
    purchaseDate: Date
})
const portfolioSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    value: Number,
    items: [itemSchema]
})



module.exports = mongoose.model('Portfolio', portfolioSchema)