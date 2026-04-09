import axiosInstance from "../api/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const createTask = async (data) => {
  return await axiosInstance.post(`${API_URL}/api/Task`, data , {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTasks = async ({page , status , priority ,search , PageSize, myTask}) => {

let query = `?PageNumber=${page}&PageSize=${PageSize}&MyTasks=${myTask}`;

  if (status !== undefined) {
    query += `&status=${status}`;
  }
  if (priority !== undefined) {
    query += `&priority=${priority}`;
  }
  if (search !== undefined) {
    query += `&search=${search}`;
  }


  const res= await axiosInstance.get(`${API_URL}/api/Task${query}`);
  return res.data;
}

export const getTaskById = async (id) =>{
  const res = await axiosInstance.get(`${API_URL}/api/Task/${id}`);
  // console.log(res.data);
  return res.data;
  
}

export const getTasksByProjectId = async (id) => {
  const res = await axiosInstance.get(`${API_URL}/api/Task/project/${id}`);
  return res.data;
}

export const getTaskCounts = async (params) => {
  const res = await axiosInstance.get(`${API_URL}/api/Task/counts` , {params});
  // console.log(res.data);
  
  return res.data;
}