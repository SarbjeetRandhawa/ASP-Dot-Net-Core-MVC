import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const getCommentsByTask = (taskId) => {
  return axiosInstance.get(`${API_URL}/api/Comment/${taskId}`);
};

export const addComment = (data) => {
  return axiosInstance.post(`${API_URL}/api/Comment`, data);
};

export const toogleLike = (commentId) => {
  console.log(commentId);

  return axiosInstance.post(`${API_URL}/api/Comment/like/${commentId}`);
};
