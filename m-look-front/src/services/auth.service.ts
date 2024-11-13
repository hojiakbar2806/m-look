import { IUserLogin, IUserRegister } from "src/types/user";
import apiAgent from "./api.service";

export const LoginService = async (data: IUserLogin) => {
  return await apiAgent.post("auth/login", data);
};

export const LogoutService = async () => {
  return await apiAgent.post("auth/logout");
};

export const RegisterService = async (data: IUserRegister) => {
  try {
    return (await apiAgent.post("auth/register", data)).data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const ActivateService = async (token: string) => {
  return await apiAgent.post(`/auth/activate/${token}`);
};

apiAgent.interceptors.request.use(
  async (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const SessionService = async () => {
  return await apiAgent.post("auth/refresh-token");
};
