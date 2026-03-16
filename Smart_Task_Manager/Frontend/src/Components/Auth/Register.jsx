import { useState } from "react";
import { registerUser } from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);

      alert(JSON.stringify(error.response.data));
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="FirstName"
          placeholder="First Name"
          value={formData.FirstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="LastName"
          placeholder="Last Name"
          value={formData.LastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="ConfirmPassword"
          placeholder="Confirm Password"
          value={formData.ConfirmPassword}
          onChange={handleChange}
          required
        />
        <select
          name="Role"
          value={formData.Role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
