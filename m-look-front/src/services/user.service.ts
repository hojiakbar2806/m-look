import { useAuthStore } from "src/store/authStore";
import axios from "./api.service";
import { IUserUpdate } from "src/types/user";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`;

const userApiInstance = axios.create({
  baseURL: BASE_URL,
});

userApiInstance.interceptors.request.use(async (config) => {
  const { getToken } = useAuthStore.getState();
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const MyProfileService = async () => {
  return await userApiInstance.get("user/me");
};

export const UpdateProfileService = async (data: IUserUpdate) => {
  return await userApiInstance.patch("user", data);
};
