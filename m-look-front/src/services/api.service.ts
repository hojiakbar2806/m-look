import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`;

const apiAgent = axios.create({
  baseURL: BASE_URL,
});

apiAgent.interceptors.request.use(
  async (config) => {
    const accessToken = "";
    console.log(accessToken);

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
    if (error.response.data) {
      error.response.data?.detail.forEach(
        (err: { loc: string[]; msg: string }) => {
          const field = err.loc[1];
          const message = err.msg.split(":")[0];
          const formattedField = field.charAt(0).toUpperCase() + field.slice(1);
          toast.error(`${formattedField}: ${message}`);
        }
      );
    }

    return Promise.reject(error);
  }
);

export default apiAgent;
