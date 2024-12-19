"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Input from "src/components/common/input";
import Textarea from "src/components/common/textarea";
import {
  MyProfileService,
  UpdateProfileService,
} from "src/services/user.service";
import { IUserUpdate } from "src/types/user";

export default function SettingPage() {
  const [image, setImage] = useState<string>();
  const client = useQueryClient();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: MyProfileService,
  });

  const mutation = useMutation({
    mutationFn: (data: IUserUpdate) => UpdateProfileService(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formData: FormData) => {
    const birthDate = formData.get("birth_date") as string;
    const formattedBirthDate = new Date(birthDate).toISOString();

    const data: IUserUpdate = {
      full_name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone_number: formData.get("phoneNumber") as string,
      bio: formData.get("bio") as string,
      gender: formData.get("gender") as string,
      birth_date: formattedBirthDate,
    };
    mutation.mutate(data);
  };

  return (
    <div className="w-full flex flex-col px-6 gap-4">
      <div className="w-full py-4 border-b flex flex-col gap-2">
        <p>Your profile image</p>
        <label
          htmlFor="image"
          className="size-32 overflow-hidden cursor-pointer border-dashed grid place-items-center border rounded-lg"
        >
          {image ? (
            <Image
              width={100}
              height={100}
              src={image}
              alt=""
              className="object-cover h-full"
            />
          ) : (
            <div>
              <ImagePlus size={50} className="stroke-accent" />
            </div>
          )}
          <input
            id="image"
            type="file"
            className="hidden absolute"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <form action={onSubmit} className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          label="Full name"
          name="fullName"
          value={data?.data.full_name}
        />
        <Input
          type="text"
          label="Email"
          name="email"
          value={data?.data.email}
        />
        <Input
          type="date"
          label="Birth date"
          name="birth_date"
          value={data?.data.profile.birth_date}
        />
        <Input label="Gender" name="gender" value={data?.data.profile.gender} />
        <Input
          type="text"
          label="Username"
          name="username"
          value={data?.data.username}
        />
        <Input
          type="text"
          label="Phone number"
          name="phoneNumber"
          value={data?.data.phone_number}
        />
        <Textarea
          value={data?.data.profile?.bio}
          label="Bio"
          name="bio"
          className="col-start-1 col-end-3"
        />
        <button
          disabled={mutation.isPending}
          className={`p-2.5 bg-primary rounded-md text-white text-xl ${
            mutation.isPending ? "bg-primary/50" : ""
          }`}
        >
          {mutation.isPending ? "Loading ..." : "Update"}
        </button>
      </form>
    </div>
  );
}
