const Portfolio = require('../models/portfolioModel')
const portfolioController = {};

portfolioController.createPortfolio = (req, res, next) => {
    const userId = res.locals.user._id;
    console.log(userId)
    Portfolio.create({ userId })
        .then(() => next())
        .catch((err) => {
            return next('Error in portfolioController.createPortfolio');
        })
}

portfolioController.getPortfolio = (req, res, next) => {
    const userId = res.locals.userId;
    console.log(userId);
    Portfolio.findOne({userId})
        .then((data) => {
            res.locals.portfolio = data;
            return next();
        })
        .catch(() => {
            return next('Error in portfolioController.getPortfolio');
        })
}

module.exports = portfolioController;