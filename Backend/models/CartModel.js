import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false        
    },
    category: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    userId : {
        type: String,
        required: true
    },
    productId : {
        type: String,
        required: true
    }
})

const Cart = mongoose.model("Cart",CartSchema)
export default Cart