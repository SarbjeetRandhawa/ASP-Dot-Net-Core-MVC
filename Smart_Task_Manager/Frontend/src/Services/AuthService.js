import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = (data) => {
    return axiosInstance.post(`${API_URL}/Auth/register`, data);
};

export const loginUser = (data) => {
    return axiosInstance.post(`${API_URL}/Auth/login`, data);
};