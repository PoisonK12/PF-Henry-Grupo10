require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const router = require('./routes/index');

const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

server.use(router);

module.exports = server;
