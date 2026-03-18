

import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import ProtectedRoute from './Components/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './features/auth/authSlice'

function App() {
 
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

        <Route path="/dashboard" element={ <ProtectedRoute><button onClick={()=>dispatch(logout())}>logout</button></ProtectedRoute> } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
