require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const { User } = require('../../db')

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID_GOOGLE,
  clientSecret: process.env.CLIENT_SECRET_GOOGLE,
  callbackURL: "http://localhost:5173/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, {userName: profile.displayName}, function (err, user) {
      return done(err, user);
    });
  }
));