import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProjectRoles = async () =>{
    const res = await axiosInstance.get(`${API_URL}/api/project/projectRoles`)
    return res.data;
}
