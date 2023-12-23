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
        return res.status(400).redirect('/signup');
      }
    }
    )
    .catch(() => {
      return next('Error occurred in sessionController.isLoggedIn')
    })

};

sessionController.startSession = (req, res, next) => {
  //write code here
  User.find({username: req.body.username})
    .then((data) => {
      Session.findOneAndUpdate({cookieId: data[0]._id}, {createdAt: Date.now()}, {upsert: true})
        .then(() => {
          return next()
        })
    })
    .catch(() => {
      return next('Error occurred in sessionController.startSession')
    })

};

module.exports = sessionController;