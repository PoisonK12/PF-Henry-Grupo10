require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./helpers/middlewares/passport-config');
const router = require('./routes/index');
// const cookieSession = require('cookie-session');

const server = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Cambia esto según la URL de tu frontend
  credentials: true, // Habilita el envío de cookies y encabezados de autenticación
};

server.use(morgan('dev'));
server.use(express.json());
server.use(cors(corsOptions));

server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Configura passport
server.use(passport.initialize());
// server.use(cookieSession({
//   name: 'session',
//   keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2],
// }));
server.use(passport.session());

server.use(router);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor.');
});

module.exports = server;
