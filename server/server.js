const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('./services/jwtTools');
const passport = require('passport');
const LocalStrategy = require('./services/localStrategy');
const googleAuth = require('./services/googleAuth');
const facebookAuth = require('./services/facebookAuth');

const jobs = require('./services/jobs');

//*********************************************************

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//------------------------------------------------

/**
 * Satellizer Login
 */
app.post('/auth/facebook', facebookAuth);
app.post('/auth/google', googleAuth);

/**
 * Local
 */
app.post('/register', passport.authenticate('local-register'), (req, res) => {
  const token = jwt.createToken(req.hostname, req.user);
  res.status(200).send(token);
});

app.post('/login', passport.authenticate('local-login'), (req, res) => {
  const token = jwt.createToken(req.hostname, req.user);
  res.status(200).send(token);
});

//------------------------------------------------

/**
 * Routes for API
 */
app.get('/jobs', jobs);

//================================================

mongoose.connect('mongodb://localhost/JWT');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => {
  console.log('DB Server connected!');
});

const server = app.listen(3000, function () {
  console.log(`API Server listening on ${server.address().port}`);
});

