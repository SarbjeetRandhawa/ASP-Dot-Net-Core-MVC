import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllProjects } from "../../Services/Project";


export const fetchProjects = createAsyncThunk("projects/fetchProjects",
    async(_ , thunkApi)=>{
        try{
            return await GetAllProjects();
        }catch(err){
            thunkApi.rejectWithValue(err.response.data || "Error");
        }
    }
);

const projectSlice = createSlice({
    name: "projects",
    initialState:{
        projects:[],
        loading:false,
        error:null,
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchProjects.pending , (state)=>{
            state.loading = true;
        }).addCase(fetchProjects.fulfilled ,(state,action)=>{
            state.loading = false,
            state.projects = action.payload;
        }).addCase(fetchProjects.rejected , (state,action) =>{
            state.loading = false,
            state.error = action.payload;
        });
    },
});

export default projectSlice.reducer;