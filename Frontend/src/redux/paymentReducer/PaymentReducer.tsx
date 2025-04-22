import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// interface Product {
//   _id: string;
//   quantity : Number;
//   userId : string;
//   productId : string
// }

interface  orderState{
    // cart: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: orderState = {
//   cart: null,
  loading: false,
  error: null,
};


  
export const createOrder = createAsyncThunk("payment/create",async ({rejectWithValue}) => {
    try{
       const response = await fetch("http://localhost:4000/api/create-order",{
        method: "POST",
        headers:{
            "content-type":"application/json"
        }
       });
       if(!response.ok){
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse);
       }
       return response.json();
    }catch(error){
        return rejectWithValue("Failed to create order");
    }   
}
    
)

const PaymentReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state) => {
          state.loading = true;
        }),
        .addCase(createOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.cart = action.payload;
        }),
        .addCase(createOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
   
      },
  });


export default PaymentReducer.reducer;