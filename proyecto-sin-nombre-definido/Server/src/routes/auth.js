const {Router} = require('express')
const {loginCtrl, registerCtrl} = require('../controllers/auth')

const authRouter = Router()

//Permite iniciar sesion
authRouter.post('/', loginCtrl)

//Permite registrar una cuenta nueva
// authRouter.post('/register', registerCtrl)

module.exports = authRouter