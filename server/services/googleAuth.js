const config = require('./config');

const request = require('request');
const jwt = require('./jwtTools');

const User = require('../models/User');

module.exports = function (req, res, next) {

  console.log(`Authorization Code: ${req.body.code}`);

  // Get "Authorization Token" by "Authorization Code"
  const url = 'https://accounts.google.com/o/oauth2/token';
  const params = {
    code: req.body.code,    // Authorization Code from Google API
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: config.GOOGLE_SECRET,
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
};
