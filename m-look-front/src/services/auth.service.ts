import { IUserLogin, IUserRegister } from "src/types/user";
import { toast } from "sonner";
import { api } from "./api.service";

export const LoginService = async (data: IUserLogin) => {
  try {
    const res = await api.post("auth/login", data);
    if (res.status >= 200 && res.status < 300) {
      toast.success(res.data.message);
      const redirect = localStorage.getItem("redirectURL") || "/";
      window.location.href = redirect;
      localStorage.removeItem("redirectURL");
    }
    return res;
  } catch {
    toast.error(`Login failed`);
  }
};

export const RegisterService = async (data: IUserRegister) => {
  try {
    const res = await api.post("auth/register", data);
    if (res.status >= 200 && res.status < 300) {
      toast.success(res.data.message);
      window.location.href = "/";
    }
    return res;
  } catch {
    toast.error(`Registration failed`);
  }
};

export const LogoutService = async () => {
  return await api.post("auth/logout");
};

export const ActivateService = async (token: string) => {
  return await api.post(`/auth/activate/${token}`);
};

export const SessionService = async () => {
  return await api.post("/auth/refresh-token");
};
