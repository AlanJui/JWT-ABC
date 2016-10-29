const SECRET = 'shhh..';

const jwt = require('jwt-simple');
const crypto = require('crypto');
const moment = require('moment');

exports.createPayload = function (hostName, userID) {
  return {
    issuer: hostName,
    subject: userID,
    expired: moment().add(10, 'days').unix()
  };
};

exports.createToken = function createToken(hostname, user) {
  const payload = this.createPayload(hostname, user.id);

  const token = jwt.encode(payload, SECRET);

  return {
    user: user.toJSON(),
    token: token
  };
};

exports.isValid = function (token) {
  const payload = jwt.decode(token, SECRET);

  return payload.subject;
};

