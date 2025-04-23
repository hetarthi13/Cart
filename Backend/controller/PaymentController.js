import Stripe from 'stripe';
import Payment from '../models/PaymentModel.js';
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_51Mwx4BLxkNzjI6Ko8Q5jZBrZ4iM0vEjmZ9aYd7v2kXqVXt3ycF5OEFQ7cWzJrTKvLOyMZzEoeW7TzzCQQ7pLm2CZ00ILWRRpG1");
console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
export const createOrder = async (req, res) => {

  console.log(req.body,"req.body");
  
  const { items, customerName, email } = req.body;
  // console.log(items,customerName,email,"items");
  // return null

  try {
    const line_items = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item?.name ?? "Filiberto Rodriguez",
        },
        unit_amount: item?.price * 100 ?? 2000,
      },
      quantity: item?.quantity ?? 2,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      customer_email: email ?? "demo@gmail.com",
    });

    const amountTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const payment = new Payment({
      customerName,
      email,  
      items,
      amountTotal: amountTotal * 100,
      sessionId: session.id,
      paymentStatus: 'pending',
    });

    await payment.save();

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.message });
  }
};
