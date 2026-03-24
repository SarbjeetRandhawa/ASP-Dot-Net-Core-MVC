import { get } from "react-hook-form";
import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

const getAllUsers = async () => {
    const res = await axiosInstance.get(`${API_URL}/users`);
    return res.data;
}

const deleteUser = async (userId) => {
    const response = await axiosInstance.delete(`${API_URL}/users/${userId}`);
    return response.data;
}
const userService = {
    getAllUsers,
    deleteUser,
};
export default userService;