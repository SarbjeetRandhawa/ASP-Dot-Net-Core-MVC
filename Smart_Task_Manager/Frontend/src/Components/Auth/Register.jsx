import { useState } from "react";
import { registerUser } from "../../Services/AuthService";


function Register({ switchForm }) {
  

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "Admin",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const SelectRole = (role) => {
    setFormData({
      ...formData,
      Role: role,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // console.log(formData);
    try {
      await registerUser(formData);
      switchForm();
    } catch (error) {
      if(Array.isArray(error.response?.data)){
        setErrors(error.response.data.errors);
      }
      if(!error.response ){
        alert("Registration failed: Server is not responding" );
        return;
      }
      console.log(error.response.data);

      

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

      <div class="grid grid-cols-3 gap-4 mb-2">
        <div
          onClick={() => SelectRole("Admin")}
          className={`cursor-pointer h-[70px] p-1   rounded-md text-center ${formData.Role === "Admin" ? "border-2 border-indigo-500 bg-indigo-50" : "border-2 border-gray-200 hover:bg-gray-100"}`}
        >
          <div>👑</div>
          <h3 className="font-semibold text-[.8rem]">Admin</h3>
          <p className="text-[#64748B] text-[.5rem] font-semibold">
            Full Access
          </p>
        </div>
        <div
          onClick={() => SelectRole("Manager")}
          className={`cursor-pointer h-[70px] p-1   rounded-md text-center ${formData.Role === "Manager" ? "border-2 border-indigo-500 bg-indigo-50" : "border-2 border-gray-200 hover:bg-gray-100"}`}
        >
          <div>🗃️</div>
          <h3 className="font-semibold text-[.8rem]">Manager</h3>
          <p className="text-[#64748B] text-[.5rem] font-semibold">
            Manage Tasks
          </p>
        </div>
        <div
          onClick={() => SelectRole("Employee")}
          className={`cursor-pointer h-[70px] p-1 rounded-md text-center ${formData.Role === "Employee" ? "border-2 border-indigo-500 bg-indigo-50" : "border-2 border-gray-200 hover:bg-gray-100"}`}
        >
          <div>👤</div>
          <h3 className="font-semibold text-[.8rem]">Employee</h3>
          <p className="text-[#64748B] text-[.5rem] font-semibold">
            View Tasks
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} method="post" className="flex-col flex gap-1">
        <span className="flex-col md:flex-row flex gap-3">
          <span className="flex flex-col gap-1
          ">
            <label
              htmlFor="FirstName"
              className="text-[.8rem] font-bold text-[#64748B]"
            >
              First Name
            </label>
            <input
              type="text"
              name="FirstName"
              placeholder="First Name"
              value={formData.FirstName}
              onChange={handleChange}
              className="border-2 py-1 px-2  rounded-md text-[.9rem] focus:border-blue-600  focus:outline-none"
              required
            />
            {/* {errors.find(e => e.toLowerCase().include("FirstName")) && (<p className="text-red-500 text-sm"> 
              {errors.find(e => e.toLowerCase().include("FirstName"))}
            </p>)} */}
          </span>
          <span className="flex flex-col gap-1  ">
            <label
              htmlFor="LastName"
              className="text-[.8rem] font-bold text-[#64748B]"
            >
              Last Name
            </label>
            <input
              type="text"
              name="LastName"
              placeholder="Last Name"
              value={formData.LastName}
              onChange={handleChange}
              className="border-2 py-1 px-2  rounded-md text-[.9rem] focus:border-blue-600  focus:outline-none"
              required
            />
            {errors?.LastName && <p className="text-red-500 text-[.7rem]">{errors.LastName[0]}</p>}

          </span>
        </span>
        <label
          htmlFor="Email"
          className="text-[.8rem] font-bold text-[#64748B] mt-2"
        >
          Email
        </label>
        <span className="relative top-2 left-2 h-0">📧</span>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          className="border-2 py-1 px-2 pl-9 rounded-md text-[.9rem] focus:border-blue-600  focus:outline-none"
          required
        />
            {errors?.Email && <p className="text-red-500 text-[.7rem]">{errors.Email[0]}</p>}

        <span className="flex flex-col md:flex-row gap-3">
          <span className="flex flex-col gap-1">
            <label
              htmlFor="Password"
              className="text-[.8rem] font-bold text-[#64748B] mt-2"
            >
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={formData.Password}
              className="border-2 py-1 px-2  rounded-md text-[.9rem] focus:border-blue-600  focus:outline-none"
              onChange={handleChange}
              required
            />
            {errors?.Password && <p className="text-red-500 text-[.7rem]">{errors.Password[0]}</p>}

          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="ConfirmPassword"
              className="text-[.8rem] font-bold text-[#64748B] mt-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="ConfirmPassword"
              placeholder="Confirm Password"
              value={formData.ConfirmPassword}
              className="border-2 py-1 px-2  rounded-md text-[.9rem] focus:border-blue-600  focus:outline-none"
              onChange={handleChange}
              required
            />
            {errors?.ConfirmPassword && <p className="text-red-500 text-[.7rem]">{errors.ConfirmPassword[0]}</p>}

            
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
