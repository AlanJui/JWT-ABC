const express = require('express');

const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('./services/jwtTools');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User');

// OAuth client
// Client ID: 121521559049-pfd0m1ap65ue7fkfutsosvo3qqe7152n.apps.googleusercontent.com
// Client Secret: __dcCMQ5UMxA77rQ_DyY406A

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

const stragegyOptions = {
  usernameField: 'email'
};

const registerStrategy = new LocalStrategy(stragegyOptions,
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

const loginStrategy = new LocalStrategy(stragegyOptions,
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

passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

app.post('/register', passport.authenticate('local-register'), (req, res) => {
  // const user = req.body;
  const token = jwt.createToken(req.hostname, req.user);
  res.status(200).send(token);
});

// ------------------------------------------------

app.post('/auth/google', function (req, res, next) {

  console.log(`Authorization Code: ${req.body.code}`);

  // Get "Authorization Token" by "Authorization Code"
  const url = 'https://accounts.google.com/o/oauth2/token';
  const params = {
    code: req.body.code,    // Authorization Code from Google API
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: '__dcCMQ5UMxA77rQ_DyY406A',
    grant_type: 'authorization_code'
  };

  request.post(url, {
    json: true,
    form: params
  }, function (err, response, token) {

    // Use token to call Google API
    console.log(`Authorization Token: ${token}`);

    // Get Profile of User by Google+ API
    // Google+ API: GET https://www.googleapis.com/plus/v1/people/:userId
    const apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    const accessToken = token.access_token;
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    request.get({
      url: apiUrl,
      headers: headers,
      json: true
    }, (err, response, profile) => {

      // Get Google+ Profile
      console.log(`Google+ Profile: ${profile}`);
      const error = profile.error;
      if (error) {
        // next(profile.error.message);
        return res.status(error.code).json({
          errors: error.errors,
          message: error.message
        });
      }

      User.findOne({googleID: profile.sub}, (err, foundUser) => {
        if (foundUser) {
          const token = jwt.createToken(req.hostname, foundUser);
          return res.status(200).send(token);
        }

        let newUser = new User();
        newUser.googleID = profile.sub;
        newUser.email = profile.email;
        newUser.displayName = profile.name;
        newUser.save((err) => {
          if (err) return next(err);

          const token = jwt.createToken(req.hostname, newUser);
          res.status(200).send(token);
        });
      });
    });
  });
});

// ------------------------------------------------

app.post('/login', passport.authenticate('local-login'), (req, res) => {
  const token = jwt.createToken(req.hostname, req.user);
  res.status(200).send(token);
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
    return res.status(401).send({
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
