const User = require('../models/userModel');
const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  User.find({username: req.body.username}) 
    .then(data => {
      res.cookie('ssid', data[0]._id, {httpOnly: true})
      return next()
    })
    .catch(() => {
      return next('Error occurred in cookieController.setSSIDCookie')
    })
}

module.exports = cookieController;