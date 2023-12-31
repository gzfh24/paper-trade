const express = require('express');
const portfolioController = require('../controllers/portfolioController.js')
const userController = require('../controllers/userController')
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')
const assetController = require('../controllers/assetController.js')
const router = express.Router();

// get portfolio data
// router.get('/portfolio', portfolioController.getPortfolio, (req, res) => {
//     return res.status(200).json()
// })

// buy stock, sell stock, create a record of transaction
router.post('/lookup', assetController.lookupStock, (req, res) => {
    return res.status(200).json(res.locals.quote);
})

router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    return res.status(200).json({value: true});
});

router.post('/signup', userController.createUser, portfolioController.createPortfolio, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    return res.status(200).json({value: true});
});

router.get('/portfolio', sessionController.isLoggedIn, portfolioController.getPortfolio, (req, res) => {
    return res.status(200).json(res.locals.portfolio);
})

router.post('/buy', sessionController.isLoggedIn, assetController.lookupStock, assetController.buyAsset, (req, res) => {
    return res.status(200).json(res.locals.portfolio);
})

router.post('/sell', sessionController.isLoggedIn, assetController.lookupStock, assetController.sellAsset, (req, res) => {
    return res.status(200).json(res.locals.portfolio);
})

module.exports = router;