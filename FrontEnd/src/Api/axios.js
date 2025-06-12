import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true, // Solo necesario si usás cookies; lo podés dejar
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir token JWT automáticamente en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Token guardado al hacer login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
