import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`;

const apiAgent = axios.create({
  baseURL: BASE_URL,
});

apiAgent.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

apiAgent.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message);
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 422 && error.response?.data?.detail) {
      error.response.data.detail.forEach(
        (err: { loc: string[]; msg: string }) => {
          const field = err.loc[1];
          const message = err.msg.split(":")[0];
          const formattedField = field.charAt(0).toUpperCase() + field.slice(1);
          toast.error(`${formattedField}: ${message}`);
        }
      );
    } else if (error.response?.data?.detail) {
      toast.error(error.response.data.detail);
    }
    return Promise.reject(error);
  }
);

export default apiAgent;
