const { Router } = require('express')
const { loginCtrl } = require('../controllers/auth')

const authRouter = Router()

//Permite iniciar sesion
authRouter.post('/', loginCtrl)

module.exports = authRouter