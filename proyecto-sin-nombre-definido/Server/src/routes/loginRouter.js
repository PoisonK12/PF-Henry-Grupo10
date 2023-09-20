const { Router } = require('express')
const { loginCtrl } = require('../controllers/loginController')

const loginRouter = Router()

//Permite iniciar sesion
loginRouter.post('/', loginCtrl)

module.exports = loginRouter