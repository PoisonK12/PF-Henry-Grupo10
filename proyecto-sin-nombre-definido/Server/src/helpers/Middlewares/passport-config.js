require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/users'); 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {

        const existingUser = await User.findOne({ where: { googleId: profile.id } });

        if (existingUser) {
          return done(null, existingUser);
        } else {
          // Create a new user
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });

          return done(null, newUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
