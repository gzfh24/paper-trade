const express = require('express');
const portfolioController = require('../controllers/portfolioController.js')
const router = express.Router();

// get portfolio data
router.get('/portfolio', portfolioController.getPortfolio, (req, res) => {
    return res.status(200).json()
})

// buy stock, sell stock, create a record of transaction
router.post('/portfolio')


module.exports = router;