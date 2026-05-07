// redux/slices/commentSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCommentsByTask,
  addComment,
  toogleLike,
} from "../../services/commentService";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (taskId) => {
    const res = await getCommentsByTask(taskId);
    return res.data;
  },
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (data, { dispatch }) => {
    await addComment(data);
    dispatch(fetchComments(data.taskId));
  },
);

export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async ({ commentId, taskId }, { dispatch }) => {
    console.log(commentId);

    await toogleLike(commentId);
    dispatch(fetchComments(taskId));
  },
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
      })
      .addCase(likeComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeComment.fulfilled, (state) => {
        state.loading = false;
        // The fetchComments action will re-fetch the list, so no direct state mutation is needed here.
      })
      .addCase(likeComment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
