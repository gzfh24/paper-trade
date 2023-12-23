const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express();
// connect to DB
const MONGO_URI = 'mongodb+srv://gzfh24:d6a41b1gLN1OiiDb@cluster0.vjf67y3.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'PaperTrade' });
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
})

// require routers and controllers
const apiRouter = require('./routes/api');
const userController = require('./controllers/userController')
const cookieController = require('./controllers/cookieController')
const sessionController = require('./controllers/sessionController')
const portfolioController = require('./controllers/portfolioController')

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})

// api router that routes to database

app.use('/api', apiRouter);

app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    return res.status(200).redirect('/portfolio');
});

app.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, portfolioController.createPortfolio, (req, res) => {
    return res.status(200).redirect('/portfolio');
});

app.get('/portfolio', sessionController.isLoggedIn, (req, res) => {
    return res.status(200).sendFile();
})

// 404 handler
app.use('*', (req, res) => {
    return res.status(404).send('Not Found')
})

// global error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).send({error: err});
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
});
