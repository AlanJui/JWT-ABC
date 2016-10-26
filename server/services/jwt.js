const crypto = require('crypto');

exports.encode = function (payload, secret) {
  const algorithm = 'HS256';

  const header = {
    type: 'JTW',
    alg: algorithm
  };

  // JWT Structure
  // [Header].[Payload].[Signature]
  const headerPart = base64Encode(JSON.stringify(header));
  const payloadPart = base64Encode(JSON.stringify(payload));
  const signaturePart = sign(`${headerPart}${payloadPart}`, secret);
  const jwt = `${headerPart}.${payloadPart}.${signaturePart}`;

  return jwt;
};

function base64Encode(str) {
  return new Buffer(str).toString('base64');
}

function sign(str, key) {
  return crypto.createHmac('sha256', key)
          .update(str)
          .digest('base64');
}
