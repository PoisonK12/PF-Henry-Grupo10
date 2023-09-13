const { Router } = require('express')
const passport = require('passport')


const googleLoginRouter = Router()

//Permite iniciar sesion
googleLoginRouter.get('/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

googleLoginRouter.get('/success', (req, res) => {
  res.json({
    message: 'Te has logueado exitosamente',
    name: req.user.displayName, 
    email: req.user.emails[0].value, 
    pic: req.user.photos[0].value
  });
});


// Ruta de callback para Google después de la autenticación
googleLoginRouter.get('/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
    res.redirect('/success');
  }
);


module.exports = googleLoginRouter