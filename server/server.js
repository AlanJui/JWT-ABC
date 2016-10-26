const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('./services/jwt');
const User = require('./models/User');

const SECRET = 'shhh..';

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

  const payload = {
    iss: req.hostname, // issuer
    sub: newUser.id       // subject
  };

  const token = jwt.encode(payload, SECRET);

  newUser.save((err) => {
    if (err) { throw err };

    // res.status(200).json(newUser);
    res.status(200).send({
      user: newUser.toJSON(),
      token: token
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
  const payload = jwt.decode(token, SECRET);

  if (!payload.sub) {
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
