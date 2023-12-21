const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        return next();
      })
  })

module.exports = mongoose.model('User', userSchema)