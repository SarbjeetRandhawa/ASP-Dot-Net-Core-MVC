import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const createProject = async (data) => {
  return await axiosInstance.post(`${API_URL}/Project`, data);
};

export const GetAllProjects = async () => {
  const res = await axiosInstance.get(`${API_URL}/Project`);
  return res.data;
};

export const GetProjectById = async (id) => {
  const res = await axiosInstance.get(`${API_URL}/Project/${id}`);
  return res.data;
};

export const archiveProject = async (id) => {
  const res = await axiosInstance.put(`${API_URL}/Project/${id}/archive`);
  return res.data;
};

export const addProjectMember = async (projectId, data) => {
  const res = await axiosInstance.post(
    `${API_URL}/${projectId}/add-members`,
    data,
  );
  return res.data;
};
