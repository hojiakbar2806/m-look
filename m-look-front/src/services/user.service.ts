import { IUserUpdate } from "src/types/user";
import { apiWithAuth } from "./api.service";

export const MyProfileService = async () => {
  return await apiWithAuth.get("/user/me");
};

export const UpdateProfileService = async (data: IUserUpdate) => {
  return await apiWithAuth.patch("/user", data);
};
