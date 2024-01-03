const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();
// app.use(express.static(path.join(__dirname, '../build')))
// connect to DB
const MONGO_URI = 'mongodb+srv://gzfh24:d6a41b1gLN1OiiDb@cluster0.vjf67y3.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'PaperTrade' });
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
})

// require routers and controllers
const apiRouter = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use('/api', apiRouter);

// 404 handler
app.get('*', (req, res) => {
    return res.status(404).send("Not Found");
})

// global error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).send({error: err});
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
});
