import { Route } from "react-router-dom";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";

export const AuthRoutes = [
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
];
