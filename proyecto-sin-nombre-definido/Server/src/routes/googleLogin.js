const { Router } = require('express')
const passport = require('passport')


const googleLoginRouter = Router()

//Permite iniciar sesion
googleLoginRouter.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

googleLoginRouter.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = googleLoginRouter