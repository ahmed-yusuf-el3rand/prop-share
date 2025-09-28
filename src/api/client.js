import axios from "axios";

const client = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5173/api/v1" ||
    "http://localhost:5174/api/v1",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default client;
