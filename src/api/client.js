import axios from "axios";
// import { tokenService } from "./tokenService";

const client = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5173/api/v1" ||
    "http://localhost:5174/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

client.interceptors.request.use((config) => {
  // const token = tokenService.getToken();
  let token="";
  if (token) config.headers.Authorization = `bearer ${token}`;
  return config;
});

export default client;
