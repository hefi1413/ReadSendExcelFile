import axios from 'axios';
import { baseURL } from '../env.js';

const api = axios.create({
  baseURL: baseURL
})

// intercepta o que vai as chamadas para o backend.
api.interceptors.request.use( (config) => {
  try {
    //const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlZmkxNDEzQGdtYWlsLmNvbSIsImlhdCI6MTY2NzI0MDUyNSwiZXhwIjoxNjY3Mjc2NTI1fQ.uovlLx1N_comB1eBwEz-5jxComeVUjI3qdQeHLTs6Gc';
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  } catch (error) {
    console.log(error);
  }
})

export default api;