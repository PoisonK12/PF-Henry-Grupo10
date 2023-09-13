require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../db');

// Serialización y deserialización de usuarios
passport.serializeUser((user, done) => {
  // Serializa el usuario utilizando su ID
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Deserializa el usuario buscando su ID en la base de datos
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: 'http://localhost:3001/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ where: { googleId: profile.id } });

        if (existingUser) {
          // Si el usuario ya existe, devuélvelo
          return done(null, existingUser);
        } else {
          // Si el usuario no existe, créalo
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
