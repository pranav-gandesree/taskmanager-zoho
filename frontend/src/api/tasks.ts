import axios from 'axios';

interface APITask {
    id: bigint;
    title: string;
    description: string;
    pending: boolean;
}

// Create a single axios instance with all necessary configurations
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/server/todo-app/tasks',
    // baseURL: 'https://taskmanager-60036587353.development.catalystserverless.in/server/todo-app/tasks',
    headers: {
        'Content-Type': 'application/json'
    }
});


axiosInstance.interceptors.request.use((config) => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
});


export const getTasks = async () => {
    const response = await axiosInstance.get('/getTasks');
    return response.data;
};

export const createTask = async (task: Omit<APITask, 'id'>) => {
    const response = await axiosInstance.post('/addTask', task);
    return response.data;
};

export const updateTask = async (task: APITask) => {
    const response = await axiosInstance.put(`/UpdateTask/${task.id}`, task);
    return response.data;
};

export const deleteTask = async (ROWID: bigint): Promise<void> => {
    const response = await axiosInstance.delete(`/deleteTask/${ROWID}`);
    return response.data;
};

