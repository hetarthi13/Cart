import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userReducer/UserReducer";
import ProductReducer from "./productReducer/ProductReducer";
import cartReducer from "./cartReducer/cartReducer";

const store = configureStore({
    reducer:{
        users:UserReducer,
        product:ProductReducer,
        cart: cartReducer
    }
})



export type AppDispatch = typeof store.dispatch;
export default store    