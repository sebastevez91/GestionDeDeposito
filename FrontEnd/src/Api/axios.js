import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,  // para enviar cookies si usás sesiones o autenticación basada en cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;