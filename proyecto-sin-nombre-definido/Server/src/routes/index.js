const { Router } = require("express");
const usersRouter = require("./usersRouter");
const assetsRouter = require("./assetsRouter");

const router = Router();

router.use("/users", usersRouter);
router.use("/assets", assetsRouter);

module.exports = router;
