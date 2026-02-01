import axios from 'axios';

// Create instance
const api = axios.create({
    baseURL: '/api', // Proxy in package.json will handle localhost:5000
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: Add Token to every request if it exists
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default api;