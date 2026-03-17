import { useForm } from "react-hook-form";
import { loginUser } from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import AuthSidebar from "./AuthSidebar";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      login(res.data);

      navigate("/dashboard");
    } catch (error) {
      if (!error.response) {
        alert("Server not responding");
        return;
      }

      const message = error.response.data.toLowerCase();

      if (message.includes("email")) {
        setError("email", {
          type: "server",
          message: error.response.data,
        });
      } else {
        setError("password", {
          type: "server",
          message: error.response.data,
        });
      }
    }
  };

  return (
    <div className="auth-Container flex flex-col md:flex-row  ">
      <AuthSidebar />
      <div
        className="Auth-form-section"
        class=" flex flex-col items-center justify-center w-full md:w-2/3 h-screen"
      >
        <div class="w-[300px] md:w-[400px]  p-2 ">
          <div
            className="authToogle"
            class="justify-around gap-1 flex mb-2 bg-[#F1F5F9] h-10 items-center rounded-md "
          >
            <button
              onClick={() => navigate("/auth/login")}
              className={`h-9  rounded-md w-1/2 mx-1  bg-[#FFFF] font-semibold text-[#4F46E5]`}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth/register")}
              className={` h-9 rounded-md w-1/2 mx-1 bg-[#f1f5f9] text-[#64748B]`}
            >
              Sign Up
            </button>
          </div>

          <div className="flex flex-col gap-8 mt-5">
            <span>
              <h1 className="text-[1.6rem] font-bold">Welcome back👋</h1>
              <p className="text-[#64748B] text-[.8rem]">
                Enter your credentials to access your workspace.
              </p>
            </span>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex-col flex gap-1"
            >
              {/* EMAIL */}

              <label className="text-[.8rem] font-bold text-[#64748B]">
                Email Address
              </label>

              <span className="relative left-2 top-2 w-2 text-[#64748B] h-0">
                📧
              </span>

              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                className="border-2 py-1 px-2 pl-9 rounded-md text-[.9rem] focus: border-blue-600 focus:outline-none"
              />

              {errors.email && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.email.message}
                </p>
              )}

              {/* PASSWORD */}

              <label className="text-[.8rem] font-bold text-[#64748B] mt-4">
                Password
              </label>

              <span className="relative left-2 top-2 w-2 h-0">🔒</span>

              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="border-2 py-1 px-2 pl-9 rounded-md text-[.9rem] focus:border-blue-600 focus:outline-none"
              />

              {errors.password && (
                <p className="text-red-500 text-[.7rem]">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="bg-[linear-gradient(to_bottom,#4338CA,#06B6D4)] text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity mt-7 font-semibold"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-[.8rem] font-semibold text-[#64748B]">
              Dont have an account?{" "}
              <a onClick={()=> navigate("/auth/register")} className="text-blue-500 hover:underline cursor-pointer">
                Create one free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
