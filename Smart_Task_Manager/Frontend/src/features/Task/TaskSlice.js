import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasks,
  getTaskCounts,
  getTasksByProjectId,
  getTaskById
} from "../../Services/TaskService";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params, { rejectWithValue }) => {
    try {
      const data = await getTasks(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  },
);

export const fetchTaskCounts = createAsyncThunk(
  "tasks/fetchTaskCounts",
  async (params, { rejectWithValue }) => {
    try {
      const data = await getTaskCounts(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  },
);

export const fetchTasksByProjectId = createAsyncThunk(
  "tasks/fetchTasksByProjectId",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getTasksByProjectId(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  },
);

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById" , async (id , {rejectWithValue}) =>{
    try{
      const data = await getTaskById(id);
      return data;
    }catch(err){
      return rejectWithValue(err.response?.data || "error");
    }
  }
)

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    SelectedTask : null,
    Counts: {},
    TotalCount: 0,
    loading: false,
    error: null,
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
        state.tasks = action.payload.data;
        state.TotalCount = action.payload.totalCount;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTaskCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskCounts.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        state.Counts = action.payload;
      })
      .addCase(fetchTaskCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTasksByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByProjectId.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTaskById.pending, (state) =>{
        state.loading = true;
        state.error = null;
      }).addCase(fetchTaskById.fulfilled , (state,action)=>{
        state.loading = false;
        state.SelectedTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
