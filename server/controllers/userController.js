const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = (req, res, next) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password
  };
  User.create(newUser)
    .then((data)=> {
      res.locals.user = data;
      return next();
    })
    .catch((err) => {
      return next('Error in userController.createUser')
    });
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  User.find({username: username})
    .then((data) => {
      if (data[0] === undefined) {
        throw new Error;
      }
      bcrypt.compare(password, data[0].password, function(err, result) {
        if (result) {
          res.locals.user = data[0];
          return next();
        } else {
          return next('error in userController.verifyUser: username or password did not match')
        }
      })
    })
    .catch(() => {
      return next('error in userController.verifyUser: username or password did not match')
    })
};

module.exports = userController;