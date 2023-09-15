const { Router } = require('express')
const passport = require('passport')


const googleLoginRouter = Router()

//Permite iniciar sesion
googleLoginRouter.get('/auth/google',
passport.authenticate('google', { scope: ['profile'] }));

googleLoginRouter.get("/login", (req, res) => {
  res.json('Houston tenemos un problema')
})


// Ruta de callback para Google después de la autenticación
googleLoginRouter.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});


module.exports = googleLoginRouter