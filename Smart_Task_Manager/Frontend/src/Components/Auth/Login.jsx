import {useState} from 'react'
import {loginUser} from "../../Services/AuthService"
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/AuthContext';

function Login()
{
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            login(res.data);

            navigate("/dashboard");
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;