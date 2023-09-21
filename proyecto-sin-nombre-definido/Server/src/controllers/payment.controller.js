require("dotenv").config();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const createSession = async (rent,id, res) => {
 
  const { name, description, price} = rent;
  // console.log(rentPrice,name,description)
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
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://daily-oven-production.up.railway.app/pay/success/${id}`,
      cancel_url: "https://daily-oven-production.up.railway.app/pay/cancel",
    });
    console.log(session.url);
    return session.url;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createSession };
