import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// User Registration
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
};

// User Login
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
};

// Create Task
export const createTask = async (taskData) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
};

// Get All Tasks
export const getAllTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
};
