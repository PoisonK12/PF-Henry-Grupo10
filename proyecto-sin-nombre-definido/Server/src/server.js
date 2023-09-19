require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./helpers/middlewares/passport-config');
const router = require('./routes/index');
const { User } = require('./db')


const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors({
  origin: 'http://localhost:5173',
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Habilita las credenciales si es necesario (cookies, autenticación, etc.)
}));

server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Configura passport
server.use(passport.initialize());
server.use(passport.session());

// Configura serializeUser y deserializeUser antes de configurar Passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

server.use(router);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor.');
});

module.exports = server;