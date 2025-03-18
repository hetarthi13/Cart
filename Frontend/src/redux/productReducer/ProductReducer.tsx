// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// interface Product{
//         name:string,
//         image:string,
//         price:number,
//         category:string,
//         description:string, 
//         rating:number,  
//         multiImages:string[],
//         _id:string
//     }
// interface productState{
//     product : Product | null,
//     loading : boolean,
//     error:string | null,
// }

// const initialState : productState = {
//     product : null,
//     loading : false,
//     error : null
// }   

// export const GetProductData = createAsyncThunk("product/get",async ({rejectWithValue}) => {
//     try{
//        const response = await fetch("http://localhost:4000/api/products",{
//         method: "GET",
//         headers:{
//             "content-type":"application/json"
//         },
//         body : JSON.stringify({})  
//        })

//        if(!response.ok){
//         const errorResponse = await response.json();
//         return rejectWithValue(errorResponse);
//        }
//        console.log("produc response",response);
       
//        return response.json()
//     }catch(error){ 
//         console.log(error);
        
//      }
// })

// export const AddProductData = createAsyncThunk("product/add",async({name,image,price,category,description,rating,multiImages} :{_id:string,name:string,image:string,price:number,category:string,description:string,rating:number,multiImages:string[]},{rejectWithValue}) => {
//     try{
//         // const
//        const response = await fetch("http://localhost:4000/api/addProduct",{
//         method: "Post",
//         headers:{
//             "content-type":"application/json"
//         },
//         body : JSON.stringify({name,image,price,category,description,rating,multiImages})  
//        })
//        if(!response.ok){
//         const errorResponse = await response.json();
//         return rejectWithValue(errorResponse);
//        }
//        return response.json()
//     }catch(error){ 
//         console.log(error);
        
//      }
// })
// const ProductReducer = () => createSlice({
//     name:"product",
//     initialState,
//     reducers:{} ,
//     extraReducers:(builder) => {
//         builder
//         .addCase(GetProductData.pending,(state) => {
//             state.loading = true
//         })
//         .addCase(GetProductData.fulfilled,(state,action) => {       
//             state.loading = false
//             state.product = action.payload
//         })
//         .addCase(GetProductData.rejected,(state,action) => {    
//             state.loading = false   
//             state.error = action.payload as string || "Something went wrong"
//         })
//         .addCase(AddProductData.pending,(state) => {
//             state.loading = true
//         })
//         .addCase(AddProductData.fulfilled,(state,action) => {
//             state.loading = false
//             state.product = action.payload
//         })
//         .addCase(AddProductData.rejected,(state,action) => {
//             state.loading = false
//             state.error = action.payload as string || "Something went wrong"
//         })
//     }
// })


// export default ProductReducer.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string;
  image: File | string; 
  price: number;
  category: string;
  description: string;
  rating: number;
  multiImages: string[];
}

interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

// Fetch Products
export const GetProductData = createAsyncThunk(
  "product/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/getProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse);
      }

      return response.json();
    } catch (error) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

// Add Product
// export const AddProductData = createAsyncThunk(
//   "product/add",
//   async (
//     {
//       name,
//       image,
//       price,
//       category,
//       description,
//       rating,
//       multiImages,
//     }: Omit<Product, "_id">,
//     { rejectWithValue }
//   ) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("description", description);
//       formData.append("rating", rating.toString());

//       // Append single image
//       if (image instanceof File) {
//         formData.append("image", image);
//       }

//       // Append multiple images
//       if (multiImages && multiImages.length > 0) {
//         multiImages.forEach((img) => {
//           formData.append(`multiImages`, img);
//         });
//       }

//       // 🔥 Debugging: Log `FormData` contents properly
//       console.log(" FormData content before sending:");
//       for (let [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//       }

//       const response = await fetch("http://localhost:4000/api/addProduct", {
//         method: "POST",
//         body: formData, // Don't set Content-Type manually for FormData
//       });

//       if (!response.ok) {
//         const errorResponse = await response.json();
//         return rejectWithValue(errorResponse);
//       }

//       return response.json();
//     } catch (error) {
//       return rejectWithValue("Failed to add product");
//     }
//   }
// );


// Add Product
export const AddProductData = createAsyncThunk(
  "product/add",
  async (
    {
      name,
      image,
      price,  
      category
    }: Omit<Product, "_id">,
    { rejectWithValue }
  ) => {
    console.log("reducer is working or not");
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price.toString());
      formData.append("category", category);
      console.log(formData,"formdata");
      
      if (image instanceof File) {
        formData.append("image", image);
      }

      // Append multiple images correctly
      // if (multiImages && multiImages.length > 0) {
      //   multiImages.forEach((img, index) => {
      //     formData.append(`multiImages[${index}]`, img);
      //   });
      // }

      // Debugging: Log FormData content
      console.log("📦 FormData content before sending:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch("http://localhost:4000/api/addProduct", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse);
      }

      return response.json();
    } catch (error) {
      return rejectWithValue("Failed to add product");
    }
  }
);


// Product Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProductData.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(GetProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(AddProductData.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(AddProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
