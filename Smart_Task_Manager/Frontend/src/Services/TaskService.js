import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const createTask = async (data) => {
  return await axiosInstance.post(`${API_URL}/Task`, data , {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTasks = async () => {
  const res= await axiosInstance.get(`${API_URL}/Task`);
  return res.data;
}