require('dotenv').config();
const GitHubStrategy = require('passport-github').Strategy;
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
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Configura passport
server.use(passport.initialize());
server.use(passport.session());

// Configura serializeUser y deserializeUser antes de configurar Passport
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  cb(null, id)
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({
    where: { githubId: profile.id },
    defaults: {
      githubId: profile.id,
      userName: profile.username,
      profilePic: profile.avatar_url,
    }
  })
  console.log(profile)
    cb(null, profile)
}
));

server.get('/auth/github',
  passport.authenticate('github'));

server.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

server.use(router);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor.');
});

module.exports = server;