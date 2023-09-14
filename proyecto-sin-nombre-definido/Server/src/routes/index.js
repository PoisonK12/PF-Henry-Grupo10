const { Router } = require("express");
const usersRouter = require("./usersRouter");
const assetsRouter = require("./assetsRouter");
const amenitiesRouter = require("./amenitiesRouter");
const loginRouter = require("./loginRouter");
const reviewsRouter = require("./reviewsRouter");
const logOutRouter = require('./logOut')
const rentsRouter = require("./rentsRouters");
const contactRouter = require('./contactRouter');
const emailContact = require('./email');
const favoritesRouter = require('./favoritesRouter');
const googleLoginRouter = require('./googleLogin');
const { paymentRouter } = require('./payment.routes');
const router = Router();

router.use('/google', googleLoginRouter)
router.use("/login", loginRouter);
router.use('/logout', logOutRouter)

router.use("/favorites", favoritesRouter);
router.use("/users", usersRouter); // falta search
router.use("/assets", assetsRouter); // tal vez editar los throw de controllers 
router.use("/amenities", amenitiesRouter);

router.use("/reviews", reviewsRouter);
router.use("/rents", rentsRouter);

router.use("/contact", contactRouter);
router.use("/sendmail", emailContact);
router.use('/pay', paymentRouter)

module.exports = router;
