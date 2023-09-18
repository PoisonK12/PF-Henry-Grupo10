const { Router } = require("express");
const { createSession } = require("../controllers/payment.controller");
const { finalHandler } = require("../handlers/rentHandler");

const paymentRouter = Router();

paymentRouter.post("/create-checkout-session", createSession);

paymentRouter.get("/success/:id", finalHandler);
paymentRouter.get('/success', (req, res) => {
  res.send('<script>window.close();</script>');
});

paymentRouter.get("/cancel", (req, res) => {
  res.json("Pago cancelado");
});

module.exports = { paymentRouter };
