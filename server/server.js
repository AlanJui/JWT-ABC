const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('./services/jwtTools');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

const strategy = new LocalStrategy(
  {
    usernameField: 'email'
  },
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

passport.use(strategy);

app.post('/register', (req, res) => {
  const user = req.body;

  // let newUser = new User.model({
  let newUser = new User({
    email: user.email,
    password: user.password
  });

  newUser.save((err) => {
    if (err) { throw err };

    const token = jwt.createToken(req.hostname, newUser);
    res.status(200).send(token);
  });
});

// ------------------------------------------------

app.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user) {
    if (err) { return next(err); }

    req.login(user, function (err) {
      if (err) { return next(err); }

      const token = jwt.createToken(req.hostname, user);
      res.status(200).send(token);
    });
  })(req, res, next);
});

// ------------------------------------------------

const jobs = [
  'Cook',
  'SuperHero',
  'Unicorn Wisperer',
  'Toast Inspector'
];

app.get('/jobs', (req, res) => {

  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'You are not authorized'
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  if (!jwt.isValid(token)) {
    res.status(401).send({
      message: 'Authentication failed'
    });
  }

  res.json(jobs);
});

// ================================================

mongoose.connect('mongodb://localhost/JWT');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => {
  console.log('DB Server connected!');
});

const server = app.listen(3000, function () {
  console.log(`API Server listening on ${server.address().port}`);
});

// console.log(jwt.encode('hi', 'secret'));

function createToken(user, res) {

}
