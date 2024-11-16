import { IUserLogin, IUserRegister } from "src/types/user";
import axios from "./api.service";
import { toast } from "sonner";

const authApiInstance = axios.create({
  withCredentials: true,
});

export const LoginService = async (data: IUserLogin) => {
  try {
    const res = await authApiInstance.post("auth/login", data);
    if (res.status >= 200 && res.status < 300) {
      toast.success(res.data.message);
    }
    return res;
  } catch {
    toast.error(`Login failed`);
  }
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
