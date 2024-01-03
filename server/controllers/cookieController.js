const User = require('../models/userModel');
const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.user._id.toString(), {httpOnly: true})
  console.log('cookies created')
  return next();
}

module.exports = cookieController;