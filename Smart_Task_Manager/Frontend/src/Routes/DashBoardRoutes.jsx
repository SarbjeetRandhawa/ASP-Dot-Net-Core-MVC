import { Route, Routes } from "react-router-dom";
import CreateProject from "../Components/Projects/CreateProject";
import ProtectedRoute from "../Components/ProtectedRoute";
// import ProtectedRoute from './Components/ProtectedRoute'

export const DashBoardRoutes = [
  <Route
    key="dashboard"
    path="/dashboard"
    element={
      <ProtectedRoute>
        <CreateProject />
      </ProtectedRoute>
    }
  />,
   <Route
    key="projects"
    path="/projects"
    element={
      <ProtectedRoute>
        <CreateProject />
      </ProtectedRoute>
    }
  />,
  
];
