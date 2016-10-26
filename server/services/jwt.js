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

exports.decode = function (token, secret) {
  var segements = token.split('.');

  if (segements.length !== 3) {
    throw new Error('Token structure incorrect');
  }

  let header = JSON.parse(base64Decode(segements[0]));
  let payload = JSON.parse(base64Decode(segements[1]));
  const rawSignature = `${segements[0]}${segements[1]}`;

  let verified = verify(rawSignature, secret, segements[2]);
  if (!verified) {
    throw new Error('Verification failed');
  }

  return payload;
};

function base64Encode(str) {
  return new Buffer(str).toString('base64');
}

function base64Decode(str) {
  return new Buffer(str, 'base64').toString();
}

function sign(str, key) {
  return crypto.createHmac('sha256', key)
          .update(str)
          .digest('base64');
}

function verify(rawSignature, secret, signature) {
  return signature === sign(rawSignature, secret);
}
