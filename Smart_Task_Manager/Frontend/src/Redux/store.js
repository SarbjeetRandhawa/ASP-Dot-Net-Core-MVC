import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import userReducer from "../features/users/userSlice"
import projectRolesReducer from "../features/project/projectRoleSlice"
import projectReducer from "../features/project/projectSlice"
import taskReducer from "../features/Task/TaskSlice"
import commentReducer from "../features/Task/commentSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        users : userReducer,
        projectRoles : projectRolesReducer,
        projects :projectReducer,
        tasks : taskReducer,
        comments : commentReducer,
    },
});