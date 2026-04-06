import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks } from "../../Services/TaskService";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params, { rejectWithValue }) => {
    try {
      const data = await getTasks(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    totalCount: 0,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        // console.log(action.payload);
        
        state.loading = false;
        state.tasks = action.payload;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default taskSlice.reducer;