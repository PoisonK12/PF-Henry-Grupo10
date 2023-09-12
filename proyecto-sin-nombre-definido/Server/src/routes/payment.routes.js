const { Router } = require('express')
const { createSession } = require('../controllers/payment.controller')

const paymentRouter = Router()

paymentRouter.post('/create-checkout-session', createSession)

paymentRouter.get('/success', (req, res) => {
  res.json('Pago exitoso');
});

paymentRouter.get('/cancel', (req, res) => {
  res.json('Pago cancelado');
});


module.exports = { paymentRouter }