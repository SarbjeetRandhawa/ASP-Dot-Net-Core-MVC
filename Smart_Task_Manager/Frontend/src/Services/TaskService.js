import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const createTask = async (data) => {
  return await axiosInstance.post(`${API_URL}/Task`, data , {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTasks = async ({page , status , priority ,search}) => {

  let query = `?page=${page}&pageSize=10`;

  if (status) {
    query += `&status=${status}`;
  }
  if (priority) {
    query += `&priority=${priority}`;
  }
  if (search) {
    query += `&search=${search}`;
  }


  const res= await axiosInstance.get(`${API_URL}/Task${query}`);
  return res.data;
}