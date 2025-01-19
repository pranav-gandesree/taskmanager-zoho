
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

// const API_URL = 'http://localhost:3000/server/todo-app/tasks';


export const getTasks = async () =>{
    const response = await axios.get(`${API_URL}/tasks/getTasks`);
    return response.data;   
}

export const createTask = async (task: { title: string; description: string; pending: boolean }) => {
    const response = await axios.post(`${API_URL}/tasks/addTask`, task);
    return response.data;
};

export const updateTask = async (task: { id: bigint ; title: string; description: string; pending: boolean }) => {
    const response = await axios.put(`${API_URL}/tasks/updateTask/${task.id}`, task);
    return response.data;
};

export const deleteTask = async (ROWID: bigint) => {
    const response = await axios.delete(`${API_URL}/tasks/deleteTask/${ROWID}`);
    return response.data;
};

