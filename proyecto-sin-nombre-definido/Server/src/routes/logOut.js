const {Router} = require('express')

const logOutRouter = Router()

logOutRouter.get('/', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      return res.status(400).json("Log-out failed")
    }
    res.redirect('/login')
  })
})

module.exports = logOutRouter