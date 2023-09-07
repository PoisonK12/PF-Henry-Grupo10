const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const sessionSecret = process.env.SESSION_SECRET;
const router = require('./routes/index');

const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true
}));

server.use(router);

module.exports = server;