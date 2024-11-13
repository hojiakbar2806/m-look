import { useAuthStore } from "src/store/authStore";
import apiAgent from "./api.service";
import axios from "axios";
import { IUpdateUser } from "src/types/user";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`;

const userAxios = axios.create({
  baseURL: BASE_URL,
});

userAxios.interceptors.request.use(async (config) => {
  const { getToken } = useAuthStore.getState();
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const MyProfileService = async () => {
  return await userAxios.get("user/profile");
};

export const UpdateProfileService = async (data: IUpdateUser) => {
  return await userAxios.patch("user", data);
};
