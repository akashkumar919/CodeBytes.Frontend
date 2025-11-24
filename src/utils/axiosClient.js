import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.VITE_API_URL|| 'https://codebytes-backend-1.onrender.com',
  
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;