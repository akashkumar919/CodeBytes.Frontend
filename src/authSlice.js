import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";



export const registerUser = createAsyncThunk(
    'auth/register',

    async(userData,{rejectWithValue})=>{
        
        try{
            const response = await axiosClient.post('/user/register',userData);
            return response.data.user;

        }
        catch(err){
            return rejectWithValue(err.message); 
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async(userData,{rejectWithValue})=>{
        
        try{
         const response = await axiosClient.post("/user/login",userData);
        
            return response.data.user;
        }
        catch(err){
           return rejectWithValue(err.response?.data?.message || "Login failed");
           
        }
    }
)


export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async(userData,{rejectWithValue})=>{
       
        
        try{
            //  console.log(userData);
         const response = await axiosClient.post("/googleAuth/google/login",userData);
        
         
            return response.data.user;
        }
        catch(err){
           return rejectWithValue(err.response?.data?.message || "Login failed!");
           
        }
    }
)

export const checkAuthUser = createAsyncThunk(
    'auth/check',
    async(_,{rejectWithValue})=>{ 
        try{
            const response = await axiosClient.get("/user/check");
           
            return response.data.user;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async(_,{rejectWithValue})=>{
        try{
            await axiosClient.post("/user/logout");
            return null;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
)



export const updateUser = createAsyncThunk(
    'auth/update',
    async(userData,{rejectWithValue})=>{
        try{
            const response = await axiosClient.put("/user/update",userData);
             return response.data.user;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
)





export const authSlice = createSlice({

    name:'auth',
    initialState:{
        loading:false,
        user:null,
        isAuthenticate:false,
        error:null
    },
    reducers:{ },
    extraReducers:(builder)=>{
        builder

        // Register user
        .addCase(registerUser.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.isAuthenticate = !!action.payload;
            state.user = action.payload;
            state.error = null
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.isAuthenticate = false;
            state.error = action.payload?.message || action.error?.message || "Something went wrong!";
            state.user = null;
        })


        // login user
        .addCase(loginUser.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            // state.isAuthenticate = !!action.payload;
            state.isAuthenticate = Boolean(action.payload && action.payload._id);
            state.user = action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
           state.error = action.payload?.message || action.error?.message || "Something went wrong!";
            state.isAuthenticate = false;
            state.user = null;
        })


        // update user
        .addCase(updateUser.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            // state.isAuthenticate = !!action.payload;
            state.isAuthenticate = Boolean(action.payload && action.payload._id);
            state.user = action.payload;
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.loading = false;
           state.error = action.payload?.message || action.error?.message || "Something went wrong!";
            state.isAuthenticate = false;
            state.user = null;
        })


        // login user with google
        .addCase(loginWithGoogle.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(loginWithGoogle.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            // state.isAuthenticate = !!action.payload;
            state.isAuthenticate = Boolean(action.payload && action.payload._id);
            state.user = action.payload;
        })
        .addCase(loginWithGoogle.rejected,(state,action)=>{
            state.loading = false;
           state.error = action.payload?.message || action.error?.message || "Something went wrong!";
            state.isAuthenticate = false;
            state.user = null;
        })


        // checkAuthUser 
        .addCase(checkAuthUser.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(checkAuthUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.isAuthenticate = !!action.payload;
            state.user = action.payload;
        })
        .addCase(checkAuthUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || action.error?.message || "Something went wrong!";
            state.isAuthenticate = false;
            state.user = null;
        })



        // logout user
        .addCase(logoutUser.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.isAuthenticate = false;
            state.user = null;
        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || action.error?.message || "Something went wrong!";
            state.isAuthenticate = false;
            state.user = null;
        })
    }

})

export default authSlice.reducer;