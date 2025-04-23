import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userReducer/UserReducer";
import ProductReducer from "./productReducer/ProductReducer";
import cartReducer from "./cartReducer/cartReducer";
import paymentReducer from "./paymentReducer/PaymentReducer";

const store = configureStore({
    reducer:{
        users:UserReducer,
        product:ProductReducer,
        cart: cartReducer,
        payment: paymentReducer
    }
})



export type AppDispatch = typeof store.dispatch;
export default store    