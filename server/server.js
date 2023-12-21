const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const app = express();
// connect to DB
const MONGO_URI = 'mongodb+srv://gzfh24:d6a41b1gLN1OiiDb@cluster0.vjf67y3.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'PaperTrade' });
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
})


app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})

app.use()

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
});
