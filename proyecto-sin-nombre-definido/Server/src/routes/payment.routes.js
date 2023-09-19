const { Router } = require("express");
const { createSession } = require("../controllers/payment.controller");
const { finalHandler } = require("../handlers/rentHandler");

const paymentRouter = Router();

paymentRouter.post("/create-checkout-session", createSession);

paymentRouter.get('/success', (req, res) => {
  res.send('<script>window.close();</script>');
});

/* paymentRouter.get("/success/:id", (req , res ) => {
  finalHandler(req, id ,res)
  res.send("<script>setTimeOut(() => { window.lose() }}, 2000)</script>")
}

  ); */

paymentRouter.get("/cancel", (req, res) => {
  res.json("Pago cancelado");
});

module.exports = { paymentRouter };
