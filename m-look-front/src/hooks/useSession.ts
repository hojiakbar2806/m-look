import { api } from "src/services/api.service";
import { IUser } from "../types/user";
import { useQuery } from "@tanstack/react-query";

interface IAuthUser extends IUser {
  role: string;
}

export const useSession = () => {
  return useQuery<IAuthUser, Error>({
    queryKey: ["session"],
    retry: false,
    queryFn: async () => await api.get("/"),
  });
};
