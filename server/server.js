const SECRET = 'shhh...';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('./services/jwtTools');
const User = require('./models/User');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


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

app.post('/login', (req, res) => {
  const reqUser = req.body;
  const password = reqUser.password;

  User.findOne({ email: reqUser.email }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ message: 'Can not find this user' });
    }

    user.comparePasswords(password, (err, isMatch) => {
      if (err) throw err;

      if (!isMatch) {
        res.status(401).send({ message: 'Wrong email/password' });
      }
      const token = jwt.createToken(req.hostname, user);
      res.status(200).send(token);
    });
  });
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
