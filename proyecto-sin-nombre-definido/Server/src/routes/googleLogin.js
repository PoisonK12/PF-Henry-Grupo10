const { Router } = require('express')
const passport = require('passport')
const {User} = require("../db")
const { tokenSign } = require('../helpers/Token/loginToken')


const githubLogin = Router()

//Permite iniciar sesion
// githubLogin.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email', 'name'] }));

// githubLogin.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

githubLogin.get("/github", passport.authenticate("auth-github", {
  scope:["user:email"],
  session:false
}))

githubLogin.get("/github/callback", passport.authenticate("auth-github", {
  scope:["user:email"],
  session:false
}),async (req, res) => {
  const user = JSON.stringify(req.user)
  // const tokenUser = await User.findByPk(user.id)
  // const token = tokenSign(req.user)
  
  // res.status(200).json(req.user)
  res.status(200).send(`<!DOCTYPE html>
   <html lang="es">
   <body>
   <script>
   window.opener.postMessage(${user}, "http://localhost:5173")
   </script
   </body>
  `)
})



module.exports = githubLogin