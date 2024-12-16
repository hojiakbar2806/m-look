import axios from "../utils/axios";
import { useAuthStore } from "src/store/authStore";

const axiosWithAuth = axios.create();

axiosWithAuth.interceptors.request.use(async (config) => {
  const { getToken } = useAuthStore.getState();
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const axiosWithCredentials = axios.create({ withCredentials: true });
const defaultAxios = axios.create();

export { axiosWithAuth, axiosWithCredentials, defaultAxios };
