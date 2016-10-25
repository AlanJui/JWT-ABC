const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', UserSchema);


// UserSchema.pre('save', (next) => {
UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

module.exports = User;
