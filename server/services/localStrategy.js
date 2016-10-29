const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

const stragegyOptions = {
  usernameField: 'email'
};

exports.register = new LocalStrategy(stragegyOptions,
  function (email, password, done) {

    User.findOne({ email: email }, (err, user) => {
      if (err) { return done(err); }
      if (user) { return done(err); }

      let newUser = new User({
        email: email,
        password: password
      });

      newUser.save((err) => {
        if (err) { done(err); }

        done(null, newUser);
      });
    });

  }
);

exports.login = new LocalStrategy(stragegyOptions,
  function (email, password, done) {
    User.findOne({ email: email }, (err, user) => {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, {
          message: 'Can not find this user'
        });
      }

      user.comparePasswords(password, (err, isMatch) => {
        if (err) { return done(err); }

        if (!isMatch) {
          return done(null, false, {
            message: 'Wrong email/password'
          });
        }
        return done(null, user);
      });
    });
  }
);
