const {Router} = require('express')
const passport = require('passport')


const googleLoginRouter = Router()

//Permite iniciar sesion
googleLoginRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Ruta de callback para Google después de la autenticación
googleLoginRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirecciona a la página de inicio o a donde quieras después de la autenticación exitosa
    res.redirect('/');
  }
);


module.exports = googleLoginRouter