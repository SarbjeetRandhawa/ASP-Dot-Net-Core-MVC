import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProjectRoles } from "../../Services/ProjectRoleService";


export const fetchProjectRoles = createAsyncThunk("ProjectRoles/fetch" ,
    async () => {
        return await getAllProjectRoles();
    } 
);

const projectRoleSlice = createSlice({
    name:"projectRoles",
    initialState : {
        roles:[],
        loading:false,

    },
    extraReducers : (builder) => {
        builder.addCase(fetchProjectRoles.pending , (state) => {
            state.loading = true;
        })
        .addCase(fetchProjectRoles.fulfilled , (state , action) =>{
            state.loading = false;
            state.roles = action.payload;
        })
        .addCase(fetchProjectRoles.rejected , (state) =>{
            state.loading = false;
        })
    },
});

export default projectRoleSlice.reducer;