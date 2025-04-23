import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  quantity : Number;
  userId : string;
  productId : string
}

interface  CartState{
  cart: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

  export const AddToCartProduct = createAsyncThunk(
    "cart/addToCart",
    async (productId: string, { rejectWithValue }) => {
      console.log(productId,"productId"); 
      const userId = localStorage.getItem("userId")
      console.log(userId,"productId ");
      
      try {
        const response = await fetch(`http://localhost:4000/api/addToCart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId,userId  }),
        });
  
        if (!response.ok) {       
          const errorResponse = await response.json();
          return rejectWithValue(errorResponse);
        }
  
  
        window.location.href = "/cart"
        return response.json();
      } catch (error) {
        return rejectWithValue("Failed to add to cart");
    }}
  )
  
  export const RemoveFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (_id: string, { rejectWithValue }) => {
      const userId = localStorage.getItem("userId")
      const productId = _id
      try {
        const response = await fetch(`http://localhost:4000/api/removeFromCart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },       
          body :  JSON.stringify({ productId,userId  }),
        });
  
        if (!response.ok) {       
          const errorResponse = await response.json();
          return rejectWithValue(errorResponse);
        }
        return response.json(); 
      } catch (error) {
        return rejectWithValue("Failed to remove from cart"); 
      }
    }
  )
  
  export const GetCartItems = createAsyncThunk(
    "cart/getCartItems",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch("http://localhost:4000/api/getCart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(response.json(),"response cart");
        
        // if (!response.ok) {
        //   const errorResponse = await response.json();
        //   return rejectWithValue(errorResponse);
        // }
        return response.json();
      } catch (error) {
        return rejectWithValue("Failed to get cart items");
      } }
  )

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(AddToCartProduct.pending, (state) => {
          state.loading = true;
        })
        .addCase(AddToCartProduct.fulfilled, (state, action) => {
          console.log(action.payload,"action.payload");
          
          state.loading = false;
          state.cart = action.payload;
        })
        .addCase(AddToCartProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(RemoveFromCart.pending, (state) => {
          state.loading = true;     
        })
        .addCase(RemoveFromCart.fulfilled, (state, action) => {
          state.loading = false;
          state.cart = action.payload;
        })
        .addCase(RemoveFromCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(GetCartItems.pending, (state) => {
          state.loading = true;   
        })
        .addCase(GetCartItems.fulfilled, (state, action) => {
          console.log(action.payload,"action.payload");
          state.loading = false;
          state.cart = action.payload;
        })  
        .addCase(GetCartItems.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
      },
  });


export default cartReducer.reducer;