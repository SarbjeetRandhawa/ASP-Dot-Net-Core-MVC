import { useState } from "react";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import AuthSidebar from "../Components/Auth/AuthSidebar";
import "../index.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="auth-Container flex flex-col md:flex-row  " >
      <AuthSidebar />
      <div
        className="Auth-form-section"
        class=" flex flex-col items-center justify-center w-full md:w-2/3 h-screen"
      >
        <div class="w-[300px] md:w-[400px]  p-2 ">
          <div className="authToogle" class="justify-around gap-1 flex mb-2 bg-[#F1F5F9] h-10 items-center rounded-md ">
            <button
              onClick={() => setIsLogin(true)}
              className={`h-9  rounded-md w-1/2 mx-1 ${!isLogin ? "bg-[#f1f5f9] text-[#64748B]" : "bg-[#FFFF] font-semibold text-[#4F46E5]"} `}
              
            >
              Login
            </button>
            <button
              
              onClick={() => setIsLogin(false)}
              className={` h-9 rounded-md w-1/2 mx-1 ${isLogin ? "bg-[#f1f5f9] text-[#64748B]" : "bg-[#FFFF] font-semibold text-[#4F46E5]"}`}
              
            >
              Sign Up
            </button>
          </div>
          <div className="auth-form">{isLogin ? <Login switchForm={() => setIsLogin(false)} /> : <Register switchForm={() => setIsLogin(true)} />}</div>
        </div>
      </div>
    </div>
  );
}
export default AuthPage;
