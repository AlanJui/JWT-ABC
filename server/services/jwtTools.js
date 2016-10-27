const jwt = require('jwt-simple');
const crypto = require('crypto');

const SECRET = 'shhh..';

exports.createPayload = function (hostName, userID) {
  return {
    issuer: hostName,
    subject: userID
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

