import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../Services/AuthService";

function Register({ switchForm }) {
  const [formData, setFormData] = useState({
    Role: "Admin",
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const password = watch("Password");

  const SelectRole = (role) => {
    setFormData({
      ...formData,
      Role: role,
    });
  };

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      Role: formData.Role,
    };

    try {
      await registerUser(finalData);
      switchForm();
    } catch (error) {
      if (!error.response) {
        alert("Server not responding");
        return;
      }

      const serverError = error.response.data;

      if (serverError.toLowerCase().includes("email")) {
        setError("Email", {
          type: "server",
          message: serverError,
        });
      }

      if (serverError.toLowerCase().includes("password")) {
        setError("Password", {
          type: "server",
          message: serverError,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-5">
      <span>
        <h1 className="text-[1.6rem] font-bold leading-7">Create Account</h1>
        <p className="text-[#64748B] text-[.8rem]">
          Choose your role to get started.
        </p>
      </span>

      {/* ROLE SELECTOR */}

      <div className="grid grid-cols-3 gap-4 mb-2">
        <div
          onClick={() => SelectRole("Admin")}
          className={`cursor-pointer h-[70px] p-1 rounded-md text-center ${
            formData.Role === "Admin"
              ? "border-2 border-indigo-500 bg-indigo-50"
              : "border-2 border-gray-200 hover:bg-gray-100"
          }`}
        >
          <div>👑</div>
          <h3 className="font-semibold text-[.8rem]">Admin</h3>
          <p className="text-[#64748B] text-[.5rem] font-semibold">
            Full Access
          </p>
        </div>

        <div
          onClick={() => SelectRole("Manager")}
          className={`cursor-pointer h-[70px] p-1 rounded-md text-center ${
            formData.Role === "Manager"
              ? "border-2 border-indigo-500 bg-indigo-50"
              : "border-2 border-gray-200 hover:bg-gray-100"
          }`}
        >
          <div>🗃️</div>
          <h3 className="font-semibold text-[.8rem]">Manager</h3>
          <p className="text-[#64748B] text-[.5rem] font-semibold">
            Manage Tasks
          </p>
        </div>

        <div
          onClick={() => SelectRole("Employee")}
          className={`cursor-pointer h-[70px] p-1 rounded-md text-center ${
            formData.Role === "Employee"
              ? "border-2 border-indigo-500 bg-indigo-50"
              : "border-2 border-gray-200 hover:bg-gray-100"
          }`}
        >
          <div>👤</div>
          <h3 className="font-semibold text-[.8rem]">Employee</h3>
          <p className="text-[#64748B] text-[.5rem] font-semibold">
            View Tasks
          </p>
        </div>
      </div>

      {/* FORM */}

      <form onSubmit={handleSubmit(onSubmit)} className="flex-col flex gap-1">
        {/* FIRST NAME */}
        <span className="flex flex-col md:flex-row">
          {/* FIRST NAME */}

          <span className="flex flex-col gap-1 w-full md:w-1/2 pr-0 md:pr-2">
            <label className="text-[.8rem] font-bold text-[#64748B]">
              First Name
            </label>

            <input
              {...register("FirstName", {
                required: "First name is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only letters allowed",
                },
              })}
              className="border-2 py-1 px-1 rounded-md focus:border-blue-600 focus:outline-none"
            />

            {errors.FirstName && (
              <p className="text-red-500 text-[.7rem]">
                {errors.FirstName.message}
              </p>
            )}
          </span>

          {/* LAST NAME */}

          <span className="flex flex-col gap-1  w-full md:w-1/2 pl-0 md:pl-2">
            <label className="text-[.8rem] font-bold text-[#64748B]">
              Last Name
            </label>

            <input
              {...register("LastName", {
                required: "Last name is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only letters allowed",
                },
              })}
              className="border-2 py-1 px-2 rounded-md focus:border-blue-600 focus:outline-none"
            />

            {errors.LastName && (
              <p className="text-red-500 text-[.7rem]">
                {errors.LastName.message}
              </p>
            )}
          </span>
        </span>
        {/* EMAIL */}

        <label className="text-[.8rem] font-bold text-[#64748B]">Email</label>

        <input
          {...register("Email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email",
            },
          })}
          className="border-2 py-1 px-1 rounded-md focus:border-blue-600 focus:outline-none"
        />

        {errors.Email && (
          <p className="text-red-500 text-[.7rem]">{errors.Email.message}</p>
        )}

        <span className="flex flex-col md:flex-row ">
          {/* PASSWORD */}

          <span className="flex flex-col pr0 md:pr-2 w-full md:w-1/2">
            <label className="text-[.8rem] font-bold text-[#64748B]">
              Password
            </label>

            <input
              type="password"
              {...register("Password", {
                required: "Password required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                  message:
                    "Must include uppercase, lowercase, number, special char",
                },
              })}
              className="border-2 py-1 px-2 rounded-md focus:border-blue-600 focus:outline-none"
            />

            {errors.Password && (
              <p className="text-red-500 text-[.7rem]">
                {errors.Password.message}
              </p>
            )}
          </span>

          {/* CONFIRM PASSWORD */}

          <span className="flex flex-col pl-0 md:pl-2 w-full md:w-1/2">
            <label className="text-[.8rem] font-bold text-[#64748B]">
              Confirm Password
            </label>

            <input
              type="password"
              {...register("ConfirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="border-2 py-1 px-2 rounded-md focus:border-blue-600 focus:outline-none"
            />

            {errors.ConfirmPassword && (
              <p className="text-red-500 text-[.7rem]">
                {errors.ConfirmPassword.message}
              </p>
            )}
          </span>
        </span>

        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 mt-5"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
