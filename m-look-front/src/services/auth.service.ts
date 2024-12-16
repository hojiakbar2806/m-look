import { IUserLogin, IUserRegister } from "src/types/user";
import { toast } from "sonner";
import { axiosWithCredentials, defaultAxios } from "./api.service";
import { isAxiosError } from "axios";
import { useAuthStore } from "src/store/authStore";

export const LoginService = async (data: IUserLogin) => {
  try {
    const res = await axiosWithCredentials.post("auth/login", data);
    toast.success(res.data.message);
    const { setAuth } = useAuthStore.getState();
    setAuth(res.data.access_token);
    return res;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data.detail || "Login failed");
    }
  }
};

export const RegisterService = async (data: IUserRegister) => {
  return await defaultAxios.post("auth/register", data);
};

export const LogoutService = async () => {
  return await axiosWithCredentials.post("auth/logout");
};

export const ActivateService = async (token: string) => {
  return await axiosWithCredentials.post(`/auth/activate/${token}`);
};

export const SessionService = async () => {
  return await axiosWithCredentials.post("/auth/refresh-token");
};
