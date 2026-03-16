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
        <div className='flex flex-col gap-8 mt-5'>
            <span>
            <h1 className='text-[1.6rem] font-bold'>Welcome back👋</h1>
            <p className='text-[#64748B] text-[.8rem]'>Enter your credentials to access your workspace.</p>
            </span>
            <form onSubmit={handleSubmit} className='flex-col flex gap-1'>

                <label className='text-[.8rem] font-bold text-[#64748B]' >Email Address</label>
                <span className='relative left-2 top-2 w-2 text-[#64748B] h-0'>📧</span>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required  className='border-2 py-1 px-2 pl-9 rounded-md text-[.9rem] focus:border-blue-600  focus:outline-none'/>
                <label className='text-[.8rem] font-bold text-[#64748B] mt-4'>Password</label>
                <span className='relative left-2 top-2 w-2 h-0' >🔒</span>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required  className='border-2 py-1 px-2 pl-9 rounded-md text-[.9rem] focus:border-blue-600 focus:outline-none'/>
                <button type="submit" className="bg-[linear-gradient(to_bottom,#4338CA,#06B6D4)] text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity mt-7 font-semibold">Sign In </button>
            </form>
            <p className='text-center text-[.8rem] font-semibold text-[#64748B]'>Dont have an account? <a href="" className='text-blue-500 hover:underline'>Create one free</a></p>
        </div>
    );
}

export default Login;