// import axios from 'axios';

// const API_URL = 'https://taskmanager-60036587353.development.catalystserverless.in/server/todo-app/tasks';

// export const getTasks = async () => {
//     const response = await axios.get(`${API_URL}/getTasks`);
//     return response.data;
// };

// export const createTask = async (task: { title: string; description: string; status: string }) => {
//     const response = await axios.post(`${API_URL}/addTask`, task);
//     return response.data;
// };

// export const updateTask = async (task: { id: string; title: string; description: string; status: string }) => {
//     const response = await axios.put(`${API_URL}/UpdateTask/${task.id}`, task);
//     return response.data;
// };

// export const deleteTask = async (ROWID: string) => {
//     const response = await axios.delete(`${API_URL}/deleteTask/:${ROWID}`);
//     return response.data;
// };

























import axios from 'axios';

const API_URL = 'https://taskmanager-60036587353.development.catalystserverless.in/server/todo-app/tasks';

interface APITask {
  id: bigint;
  title: string;
  description: string;
  pending: boolean;
}

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/getTasks`);
  return response.data;
};

export const createTask = async (task: Omit<APITask, 'id'>) => {
  const response = await axios.post(`${API_URL}/addTask`, task);
  return response.data;
};

export const updateTask = async (task: APITask) => {
  const response = await axios.put(`${API_URL}/UpdateTask/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (ROWID: string) => {
  const response = await axios.delete(`${API_URL}/deleteTask/:${ROWID}`);
  return response.data;
};