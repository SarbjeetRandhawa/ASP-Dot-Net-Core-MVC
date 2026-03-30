import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllProjects, GetProjectById , archiveProject } from "../../Services/Project";
import { act } from "react";


export const fetchProjects = createAsyncThunk("projects/fetchProjects",
    async(_ , thunkApi)=>{
        try{
            return await GetAllProjects();
        }catch(err){
            thunkApi.rejectWithValue(err.response.data || "Error");
        }
    }
);

export const fetchProjectById = createAsyncThunk("projects/fetchProjectById", async (id) =>{
    return await GetProjectById(id);
});

export const archiveProjectById = createAsyncThunk("project/archiveProject", async (id , {rejectWithValue})=>{
    try{
        await archiveProject(id);
        return id;
    }catch(err){
        return rejectWithValue(err.response?.data || 
        "error"
        );
    }
});

const projectSlice = createSlice({
    name: "projects",
    initialState:{
        projects:[],
        selectedProject:null,
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
        })
        .addCase(fetchProjectById.pending , (state)=>{
            state.loading = true;
            state.selectedProject = null;
        }).addCase(fetchProjectById.fulfilled ,(state,action)=>{
            state.loading = false,
            state.selectedProject = action.payload;
        }).addCase(fetchProjectById.rejected , (state,action) =>{
            state.loading = false,
            state.error = action.payload;
        })

        .addCase(archiveProjectById.pending , (state)=>{
            state.loading = true;
        }).addCase(archiveProjectById.fulfilled ,(state)=>{
            state.loading = false;
        }).addCase(archiveProjectById.rejected , (state,action) =>{
            state.loading = false,
            state.error = action.payload;
        })
        
    },
});

export default projectSlice.reducer;