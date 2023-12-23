const Portfolio = require('../models/portfolioModel')
const portfolioController = {};

portfolioController.createPortfolio = (req, res) => {
    const userId = res.locals.userId
    Portfolio.create({ userId })
        .then(() => next())
        .catch((err) => {
            return next('Error in portfolioController.createPortfolio');
        })
}

portfolioController.getPortfolio = (req, res) => {
    const userId = res.locals.userId;
    Portfolio.find({userId})
        .then((data) => res.locals.portfolio = data)
}

module.exports = portfolioController;