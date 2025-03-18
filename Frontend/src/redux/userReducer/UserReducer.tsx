// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface User {
//     name: string;
//     email: string;
//     // Add other user properties as needed
// }

// interface UserState {
//     user: User | null;
//     loading: boolean;
//     error: string | null;
// }

// export const loginUser = createAsyncThunk(
//     "user/login",
//     async({email,password}:{email:string,password:string}, {rejectWithValue}) => {
//         try {
//             const response = await fetch("http://localhost:4000/api/login", {
//                 method: "POST",
//                 headers: {
//                     "content-type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),                
//             });
//     }catch(error){
//         console.log(error);
        
//     }
// })


// export const registerUser = createAsyncThunk(
//     "user/register",
//     async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
//         try {
//             const response = await fetch("http://localhost:4000/api/register", {
//                 method: "POST",
//                 headers: {
//                     "content-type": "application/json",
//                 },
//                 body: JSON.stringify({ name, email, password }),
//             });

//             if (!response.ok) {
//                 const errorResponse = await response.json();
//                 return rejectWithValue(errorResponse);
//             }

//             const data = await response.json(); 
//             return data;
//         } catch (error) {
//             return rejectWithValue("Something went wrong");
//         }
//     }
// );

// const initialState: UserState = {
//     user: null,
//     loading: false,
//     error: null,
// };

// const UserReducer = createSlice({
//     name: "user",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(registerUser.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
//                 state.loading = false;
//                 state.user = action.payload; // Store the single user object
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || "Registration failed";
//             })
//             .addCase(loginUser.pending, (state) => {
//                 state.loading = true;

//             })
//             .addCase(loginUser.fulfilled, (state,action) => {
//                 state.loading = false;
//                 state.user = action.payload ; 
//             })
//             .addCase(loginUser.rejected, (state, action) => {           
//                 state.loading = false;
//                 state.error = action.payload as string || "Login failed";
//             })
            
//     },
// });

// export default UserReducer.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;

}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
// console.log(response,"response login");
// return null
      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse.message || "Login failed");
      }

      const data = await response.json();
      console.log(data,"data");
      localStorage.setItem("token", data.token);
      console.log(data.role,"data.role");
      
      if(data.role === "admin"){
        window.location.href = "/Home"
      }else{
        window.location.href = "/userpage"
      }
      localStorage.setItem("role", data.role);
      
      return data;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse);
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Login failed";
      });
  },
});

export default UserReducer.reducer;
