const { Router } = require("express");
const usersRouter = require("./usersRouter");
const assetsRouter = require("./assetsRouter");
const amenitiesRouter = require("./amenitiesRouter");
const authRouter = require("./auth");

const router = Router();

router.use("/login", authRouter)
router.use("/users", usersRouter);
router.use("/assets", assetsRouter);
router.use("/amenities", amenitiesRouter);

module.exports = router;
