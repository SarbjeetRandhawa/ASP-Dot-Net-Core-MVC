import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async () => {
    const res = await axiosInstance.get(`${API_URL}/users`);
    return res.data;
}