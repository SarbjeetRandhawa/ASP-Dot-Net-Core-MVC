import { Route, Routes } from "react-router-dom";
import CreateProject from "../Components/Projects/CreateProject";
import ProtectedRoute from "../Components/ProtectedRoute";
import TeamMembers from "../Components/TeamMembers/TeamMembers";
import ProjectPage from "../Components/Projects/ProjectPage";
import ProjectDetails from "../Components/Projects/ProjectDetails";
import CreateTask from "../Components/Tasks/CreateTask";
// import ProtectedRoute from './Components/ProtectedRoute'

export const DashBoardRoutes = [
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
       <ProjectPage/>
     </ProtectedRoute>
   }
 />,
  <Route
    key="createProject"
    path="/projects/createProjects"
    element={
      <ProtectedRoute>
        <CreateProject />
      </ProtectedRoute>
    }
  />,
  <Route
    
    path="/projects/:projectIdSlug"
    element={
      <ProtectedRoute>
        <ProjectDetails/>
      </ProtectedRoute>
    }
  />,
   <Route
    
    path="/Task/CreateTask"
    element={
      <ProtectedRoute>
        <CreateTask/>
      </ProtectedRoute>
    }
  />,
  <Route
    key="team"
    path="/team"
    element={
      <ProtectedRoute>
        <TeamMembers/>
      </ProtectedRoute>
    }
  />,
  
];
