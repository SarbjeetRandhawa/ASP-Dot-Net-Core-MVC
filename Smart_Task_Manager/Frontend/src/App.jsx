

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import AuthPage from './Pages/AuthPage'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/Dashboard" element={ <ProtectedRoute><h1>Dashboard</h1></ProtectedRoute> } />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
