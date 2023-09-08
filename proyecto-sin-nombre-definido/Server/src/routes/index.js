const { Router } = require("express");
const usersRouter = require("./usersRouter");
const assetsRouter = require("./assetsRouter");
const amenitiesRouter = require("./amenitiesRouter");
const authRouter = require("./auth");
const reviewsRouter = require("./reviewsRouter");
const logOutRouter = require('./logOut')
<<<<<<< HEAD
const rentsRouter = require("./rentsRouters");
=======
const googleLoginRouter = require('./googleLogin')
>>>>>>> 6af67d0595d6cf2ef50fd0b36f5a17a639b70466
const router = Router();

router.use('/googleAuth', googleLoginRouter)
router.use("/login", authRouter);
router.use('/logout', logOutRouter)
router.use("/users", usersRouter);
router.use("/assets", assetsRouter);
router.use("/amenities", amenitiesRouter);
router.use("/reviews", reviewsRouter);
router.use("/rents", rentsRouter);

module.exports = router;
