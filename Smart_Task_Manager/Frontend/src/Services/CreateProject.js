import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const createProject = async (data) => {
    return await axiosInstance.post(`${API_URL}/Project` , data);
}   