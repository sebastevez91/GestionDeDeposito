import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,  // para enviar cookies si usás sesiones o autenticación basada en cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// parte del token

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;