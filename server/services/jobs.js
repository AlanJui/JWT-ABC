const jwt = require('./jwtTools');

const jobs = [
  'Cook',
  'SuperHero',
  'Unicorn Wisperer',
  'Toast Inspector'
];

module.exports = (req, res) => {

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
};


