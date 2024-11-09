import { IUser } from "../types/user";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "src/services/api.service";

interface IAuthUser extends IUser {
  role: string;
}

export const useSession = () => {
  return useQuery<IAuthUser, Error>({
    queryKey: ["session"],
    retry: false,
    queryFn: async () => await axiosInstance.get("/"),
  });
};
