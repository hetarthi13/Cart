import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userReducer/UserReducer";
import ProductReducer from "./productReducer/ProductReducer";


const store = configureStore({
    reducer:{
        users:UserReducer,
        product:ProductReducer
    }
})



export type AppDispatch = typeof store.dispatch;
export default store    