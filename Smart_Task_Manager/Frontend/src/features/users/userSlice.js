import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../Services/userService";


export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_,thunkAPI) => {
    try{
        return await getAllUsers();
    }catch(e){
        thunkAPI.rejectWithValue(e.response?.data || "error");
    }
  }
);

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
      });
  },
});

export default userSlice.reducer;