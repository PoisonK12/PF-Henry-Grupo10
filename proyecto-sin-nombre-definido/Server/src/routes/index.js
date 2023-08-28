const {Router} = require('express')
const ownerRouter = require('./ownerRouter')
const usersRouter = require('./usersRouter')
const propertyRouter = require('./propertyRouter')

const router = Router()

router.use('/owner', ownerRouter)
router.use('/users', usersRouter)
router.use('/property', propertyRouter)

module.exports = router