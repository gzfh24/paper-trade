const express = require('express');
const portfolioController = require('../controllers/portfolioController.js')
const userController = require('../controllers/userController')
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')
const router = express.Router();

// get portfolio data
router.get('/portfolio', portfolioController.getPortfolio, (req, res) => {
    return res.status(200).json()
})

// buy stock, sell stock, create a record of transaction
router.post('/portfolio')

router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    return res.status(200).redirect('/portfolio');
});

router.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    return res.status(200).redirect('/portfolio');
});

router.get('/portfolio', sessionController.isLoggedIn, (req, res) => {
    return res.status(200).sendFile();
})

module.exports = router;