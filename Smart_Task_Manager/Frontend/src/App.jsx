import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'

import CreateProject from './Components/Projects/CreateProject'
import { DashBoardRoutes } from './Routes/DashBoardRoutes'
import { AuthRoutes } from './Routes/AuthRoute'
function App() {
 
const {token} = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/" element={token ? <Navigate to="/projects" /> : <Navigate to="/login" /> } />
        {AuthRoutes}
        {DashBoardRoutes}
        {/* <Route path="/login" element={ <ProtectedRoute><AuthRoute/></ProtectedRoute> } />
        <Route path="/dashboard" element={ <ProtectedRoute><DashBoardRoutes/></ProtectedRoute> } />
         */}
      </Routes>
    </BrowserRouter>
  )
}
export default App
