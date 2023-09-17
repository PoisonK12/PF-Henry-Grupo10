require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./helpers/middlewares/passport-config');
const router = require('./routes/index');
const cookieSession = require('cookie-session');

const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Configura passport
server.use(passport.initialize());
server.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2],
}));
server.use(passport.session());

server.use(router);

module.exports = server;
