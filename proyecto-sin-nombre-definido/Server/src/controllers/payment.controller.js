require("dotenv").config();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const createSession = async (pago, id, res) => {
  const { name, description, rentPrice } = pago;
  // console.log(name);
  // console.log(description);
  // console.log();
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: name,
              description: description,
            },
            currency: "usd",
            unit_amount: rentPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3001/pay/success/${id}`,
      cancel_url: "http://localhost:3001/pay/cancel",
    });
    console.log(session.url);
    return session.url;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createSession };
