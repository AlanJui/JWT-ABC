const config = require('./config');

const request = require('request');
const queryString = require('querystring');

const jwt = require('./jwtTools');

const User = require('../models/User');

const facebookAuth = function (req, res) {
  var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/me';
  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: config.FACEBOOK_SECRET,
    code: req.body.code
  };

  request.get({
    url: accessTokenUrl,
    qs: params
  }, function (err, response, accessToken) {
    accessToken = queryString.parse(accessToken);

    request.get({
      url: graphApiUrl,
      qs: accessToken,
      json: true
    }, function (err, response, profile) {
      User.findOne({facebookID: profile.id}, function (err, existingUser) {
        if (existingUser) {
          const token = jwt.createToken(req.hostname, existingUser);
          return res.status(200).send(token);
        }

        let newUser = new User({
          facebookID: profile.id,
          displayName: profile.name
        });
        newUser.save((err) => {
          if (err) {
            return res.status(500).send(err);
          }

          const token = jwt.createToken(req.hostname, newUser);
          return res.status(200).send(token);
        });
      })
    });
  });
};

module.exports = facebookAuth;
