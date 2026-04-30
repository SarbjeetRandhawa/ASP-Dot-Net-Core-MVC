import { Aperture } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

const getAllUsers = async () => {
  const res = await axiosInstance.get(`${API_URL}/api/users`);
  // console.log(res.data);
  return res.data;
};

const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`${API_URL}/api/users/${userId}`);
  return response.data;
};

const SearchUsersApi = async (query) => {
  const res = await axiosInstance.get(`${API_URL}/api/comment/search-users?query=${query}`);
  return res.data
}

const userService = {
  getAllUsers,
  deleteUser,
  SearchUsersApi,
};
export default userService;
