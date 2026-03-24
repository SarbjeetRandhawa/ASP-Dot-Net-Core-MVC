import { Route, Routes } from "react-router-dom";
import CreateProject from "../Components/Projects/CreateProject";
import ProtectedRoute from "../Components/ProtectedRoute";
// import ProtectedRoute from './Components/ProtectedRoute'

export const DashBoardRoutes = [
  <Route
    key="createProject"
    path="/projects/createProject"
    element={
      <ProtectedRoute>
        <CreateProject />
      </ProtectedRoute>
    }
  />,
  <Route
    key="dashboard"
    path="/dashboard"
    element={
      <ProtectedRoute>
        <h1>Dashboard</h1>
      </ProtectedRoute>
    }
  />,
   <Route
    key="projects"
    path="/projects"
    element={
      <ProtectedRoute>
        {/* <CreateProject /> */}
        <div>Projects page</div>
      </ProtectedRoute>
    }
  />,
  
];
