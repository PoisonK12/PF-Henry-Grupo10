const { Router } = require("express");
const usersRouter = require("./usersRouter");
const assetsRouter = require("./assetsRouter");
const amenitiesRouter = require("./amenitiesRouter");
const authRouter = require("./auth");
const reviewsRouter = require("./reviewsRouter");
const logOutRouter = require('./logOut')
const googleLoginRouter = require('./googleLogin')
const router = Router();

router.use('/googleAuth', googleLoginRouter)
router.use("/login", authRouter);
router.use('/logout', logOutRouter)
router.use("/users", usersRouter);
router.use("/assets", assetsRouter);
router.use("/amenities", amenitiesRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;
