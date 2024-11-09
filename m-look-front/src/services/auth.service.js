import apiAgent from "./api.service";

export const LoginService = async (data) => {
  return await apiAgent.post("auth/login", data);
};

export const LogOutService = async () => {
  return await apiAgent.post("auth/logout");
};

export const RegisterService = async (data) => {
  try {
    return (await apiAgent.post("auth/login", data)).data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const ActivateService = async (token) => {
  return await apiAgent.post(`/auth/activate/${token}`);
};
