import axios from "axios";
import { useAuthStore } from "src/store/authStore";

const API_ENDPOINT = process.env.API_ENDPOINT || "/api";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `${API_ENDPOINT}`
    : `http://localhost:8000${API_ENDPOINT}`;

const apiWithAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token",
  },
});

apiWithAuth.interceptors.request.use(async (config) => {
  const { getToken } = useAuthStore.getState();
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const apiWithCredentials = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiWithAuth, apiWithCredentials, api };
