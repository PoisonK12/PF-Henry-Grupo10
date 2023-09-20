// require('dotenv').config();
// const passport = require('passport');
// const { User } = require('../../db');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//   clientID: process.env.CLIENT_ID_GOOGLE,
//   clientSecret: process.env.CLIENT_SECRET_GOOGLE,
//   callbackURL: "http://localhost:3001/auth/google/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ googleId: profile.id, email: profile.email, userName: profile.name }, function (err, user) {
//     return done(err, user);
//   });
// }
// ));