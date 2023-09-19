require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../db');

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID_GOOGLE,
  clientSecret: process.env.CLIENT_SECRET_GOOGLE,
  callbackURL: "http://localhost:3001/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));