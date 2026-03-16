import { useState } from "react";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import AuthSidebar from "../Components/Auth/AuthSidebar";
import "../index.css";



function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="auth-Container " class="flex ">
      <AuthSidebar />
      <div className="Auth-form-section">
        <div className="authToogle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </button>
        </div>
        <div className="auth-form">{isLogin ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
}
export default AuthPage