const Session = require('../models/sessionModel');
const User = require('../models/userModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  Session.find({cookieId: req.cookies.ssid})
    .then(data => {
      if (data[0] !== undefined) {
        res.locals.userId = data[0]._id;
        return next()
      } else {
        return res.status(400).json({value: false});
      }
    }
    )
    .catch(() => {
      return next('Error occurred in sessionController.isLoggedIn')
    })

};

sessionController.startSession = (req, res, next) => {
  //write code here
  Session.findOneAndUpdate({cookieId: res.locals.user._id}, {createdAt: Date.now()}, {upsert: true})
    .then(() => {
      return next();
    })
    .catch((err) => {
      return next(err);
    })
};

module.exports = sessionController;