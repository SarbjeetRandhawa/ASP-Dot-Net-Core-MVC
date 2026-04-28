// redux/slices/commentSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCommentsByTask, addComment } from "../../services/commentService";

// 🔥 Fetch Comments
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (taskId) => {
    const res = await getCommentsByTask(taskId);
    return res.data;
  }
);

// 🔥 Add Comment
export const createComment = createAsyncThunk(
  "comments/createComment",
  async (data, { dispatch }) => {
    await addComment(data);
    dispatch(fetchComments(data.taskId)); // refresh after add
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;