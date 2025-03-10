import axios from "../utils/axios";
import { useAuthStore } from "src/store/authStore";

const axiosWithAuth = axios.create();

axiosWithAuth.interceptors.request.use(async (config) => {
  const { getToken } = useAuthStore.getState();
  const token = await getToken();
  if (!token) {
    return config;
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const { refreshToken } = useAuthStore.getState();
      await refreshToken();
    }
    return Promise.reject(error);
  }
);

const axiosWithCredentials = axios.create({ withCredentials: true });

axiosWithCredentials.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const { logout } = useAuthStore.getState();
      await logout();
    }
    return Promise.reject(error);
  }
);

const defaultAxios = axios.create();

export { axiosWithAuth, axiosWithCredentials, defaultAxios };
