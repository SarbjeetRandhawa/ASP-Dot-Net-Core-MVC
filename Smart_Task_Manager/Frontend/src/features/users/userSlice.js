import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../Services/userService";


export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_,thunkAPI) => {
    try{
        return await userService.getAllUsers();
    }catch(e){
        thunkAPI.rejectWithValue(e.response?.data || "error");
    }
  }
);

export const deleteuser = createAsyncThunk("users/deleteUser" , async (userId ,thunkAPI) => {
  try{
    await userService.deleteUser(userId);
    return userId;
  }catch(err){
     return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.users = state.users.filter((users)=> users.userId !== action.payload);
      });
  },
});

export default userSlice.reducer;