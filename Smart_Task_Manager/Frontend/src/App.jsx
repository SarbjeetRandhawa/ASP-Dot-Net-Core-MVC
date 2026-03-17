

import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import { useAuth } from './Context/AuthContext'

import ProtectedRoute from './Components/ProtectedRoute'

function App() {
 
  const {user,logout} = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/auth/login" /> } />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register/>} />

        <Route path="/dashboard" element={ <ProtectedRoute><button onClick={logout}>logout</button></ProtectedRoute> } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
