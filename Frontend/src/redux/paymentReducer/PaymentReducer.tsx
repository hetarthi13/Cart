import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface Product {
  _id: string;
  quantity: number;
  userId: string;
  productId: string;
}

interface orderState {
  cart: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: orderState = {
  cart: null,
  loading: false,
  error: null,
};


  
// export const createOrder = createAsyncThunk("payment/create",async ({rejectWithValue}) => {
//     try{
//        const response = await fetch("http://localhost:4000/api/create-order",{
//         method: "POST",
//         headers:{
//             "content-type":"application/json"
//         }
//        });
//        console.log(response,"response");  
       
//        if(!response.ok){
//         const errorResponse = await response.json();
//         return rejectWithValue(errorResponse);
//        }
//        return response.json();
//     }catch(error){
//         return rejectWithValue("Failed to create order");
//     }   
// }
    
// )

export const createOrder = createAsyncThunk(
  "payment/create",
  async (data, { rejectWithValue }) => {
    console.log(data,"data");
    const userData = localStorage.getItem("userData")
    console.log(userData,"userData payment");
    
    const reqData = {
      customerName : "",
      email : "",
      items: [],
    }
    
    try {
      const response = await fetch("http://localhost:4000/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse.message || "Server error");
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create order");
    }
  }
);

const paymentReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state) => {
          state.loading = true;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.cart = action.payload;
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
      },
  });


export default paymentReducer.reducer;
// export default cartReducer.reducer;