import { IUserLogin, IUserRegister } from "src/types/user";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`;

const authApiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const LoginService = async (data: IUserLogin) => {
  return await authApiInstance.post("auth/login", data);
};

export const LogoutService = async () => {
  return await authApiInstance.post("auth/logout");
};

export const RegisterService = async (data: IUserRegister) => {
  return await authApiInstance.post("auth/register", data);
};

export const ActivateService = async (token: string) => {
  return await authApiInstance.post(`/auth/activate/${token}`);
};

export const SessionService = async () => {
  return await authApiInstance.post("/auth/refresh-token");
};
