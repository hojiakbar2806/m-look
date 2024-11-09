import axiosInstance from "src/services/api.service";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";

axiosInstance.interceptors.request.use(
  async (config) => {
    config.withCredentials = true;
    return config;
  },
  (error: AxiosError) => {
    toast.error("So‘rovni yuborishda xatolik yuz berdi.");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(
        `Xatolik: ${error.response.status} - ${
          error.response.data.message || "Noma’lum xatolik"
        }`
      );
    } else if (error.request) {
      toast.error("Server ishlamayapti yoki aloqada muammo bor.");
    } else {
      toast.error(`Xato: ${error.message}`);
    }
  }
);

export const Session = async () => {
  try {
    return await axiosInstance.post("auth/refresh-token");
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};
