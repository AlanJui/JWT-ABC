const config = require('./config');

const _ = require('underscore');
const path = require('path');
const fs = require('fs');
const nodeMailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');

const jwt = require('./jwtTools');
const User = require('../models/User');

const model = {
  verifyUrl: config.VERIFY_URL,
  title: 'myJWT',
  subtitle: 'Thanks for signing up',
  body: 'Please verify your email address by clicking the button below'
};

function getHtml(token) {
  const rootPath = path.normalize(__dirname + '/../..');
  const filePath = rootPath + '/server/views/emailVerification.html';
  const encoding = 'utf8';
  const html = fs.readFileSync(filePath, encoding);

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  const template = _.template(html);

  model.verifyUrl += ('?token=' + token);
  // model.verifyUrl = model.verifyUrl + '?token=' + token;
  console.log(`Verify URL: ${model.verifyUrl}`);

  const contents = template(model);
  return contents;
}

function handleError(res) {
  return res.status(401).send({
    message: 'Authentication failed, unable to verify email!'
  });
}

exports.send = function (emailAddress, callback) {
  const payload = {
    subject: emailAddress
  };

  const token = jwt.encode(payload, config.EMAIL_SECRET);
  console.log('Email token: ' + token);

  // console.log(getHtml(token));
  const transporter = nodeMailer.createTransport(config.TRANSPORT);

  const mailData = {
    from: `Ju Zheng-Zhong <JuZhengZhong@gmail.com>`,
    to: emailAddress,
    subject: 'User Account Verification',
    html: getHtml(token)
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      return callback(err, null);
    }
    callback(null, info);
  });

};

exports.handler = function (req, res) {
  const token = req.query.token;
  // console.log(token);

  const payload = jwt.decode(token, config.EMAIL_SECRET);
  const emailAddress = payload.subject;

  if (!emailAddress) return handleError(res);

  User.findOne({ email: emailAddress }, function (err, foundUser) {
    if (err) return res.status(500).send(err);

    if (!foundUser) return handleError(res);

    if (!foundUser.active) foundUser.active = true;

    foundUser.save(function (err) {
      if (err) return res.status(500).send(err);

      return res.redirect(config.APP_URL);
    });
  });
};
