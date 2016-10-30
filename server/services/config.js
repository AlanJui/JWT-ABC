const baseUrl = 'http://localhost:3000';
const verifyUrl = '/auth/verifyEmail';
const appUrl = 'http://localhost:9000';

module.exports = {
  FACEBOOK_SECRET: '63c7e2f1367c6425fdc258a1a78a1220',
  GOOGLE_SECRET: '__dcCMQ5UMxA77rQ_DyY406A',
  EMAIL_SECRET: 'something',
  APP_URL: appUrl,
  BASE_URL: baseUrl,
  VERIFY_URL: baseUrl + verifyUrl,
  TRANSPORT: {
    host: 'localhost',
    secure: false
  }
};


