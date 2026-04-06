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

let query = `?PageNumber=${page}&PageSize=1`;

  if (status !== undefined) {
    query += `&status=${status}`;
  }
  if (priority !== undefined) {
    query += `&priority=${priority}`;
  }
  if (search !== undefined) {
    query += `&search=${search}`;
  }


  const res= await axiosInstance.get(`${API_URL}/Task${query}`);
  return res.data;
}