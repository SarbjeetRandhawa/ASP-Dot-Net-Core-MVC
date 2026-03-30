import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllProjects, GetProjectById } from "../../Services/Project";


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
    },
});

export default projectSlice.reducer;