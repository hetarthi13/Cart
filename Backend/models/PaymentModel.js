import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    customerName: String,
    email: String,
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      }
    ],
    amountTotal: Number,
    currency: {
      type: String,
      default: 'usd',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    sessionId: String, 
    createdAt: {
      type: Date,
      default: Date.now,
    },
});


const Payment = mongoose.model("Payment",PaymentSchema)
export default Payment