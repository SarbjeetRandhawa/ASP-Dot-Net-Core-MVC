import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import userReducer from "../features/users/userSlice"
import projectRolesReducer from "../features/project/projectRoleSlice"

// import projectReducer from "../features/project/projectSlice"



export const store = configureStore({
    reducer:{
        auth:authReducer,
        users : userReducer,
        projectRoles : projectRolesReducer
        
    },
});