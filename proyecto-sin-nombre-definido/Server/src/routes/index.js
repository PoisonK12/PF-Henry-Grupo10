const { Router } = require("express");
const usersRouter = require("./usersRouter");
const assetsRouter = require("./assetsRouter");
const amenitiesRouter = require("./amenitiesRouter");
const authRouter = require("./auth");
const reviewsRouter = require("./reviewsRouter");
const logOutRouter = require('./logOut')
const rentsRouter = require("./rentsRouters");
const router = Router();

router.use("/login", authRouter);
router.use('/logout', logOutRouter)
router.use("/users", usersRouter);
router.use("/assets", assetsRouter);
router.use("/amenities", amenitiesRouter);
router.use("/reviews", reviewsRouter);
router.use("/rents", rentsRouter);

module.exports = router;
