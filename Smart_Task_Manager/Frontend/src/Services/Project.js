import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const createProject = async (data) => {
    return await axiosInstance.post(`${API_URL}/Project` , data);
}   

export const GetAllProjects = async () => {
    const res = await axiosInstance.get(`${API_URL}/Project`);
    return res.data;
}

export const GetProjectById = async (id) => {
    const res = await axiosInstance.get(`${API_URL}/Project/${id}`);
    return res.data;
}