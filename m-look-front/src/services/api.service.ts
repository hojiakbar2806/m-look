import axios from "axios";
import { useAuthStore } from "src/store/authStore";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/m-look/api"
    : "http://localhost:8000/api";

const apiWithAuth = axios.create({
  baseURL: BASE_URL,
});

apiWithAuth.interceptors.request.use(async (config) => {
  const token = await useAuthStore.getState().getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const apiWithCredentials = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const api = axios.create({
  baseURL: BASE_URL,
});

export { apiWithAuth, apiWithCredentials, api };
