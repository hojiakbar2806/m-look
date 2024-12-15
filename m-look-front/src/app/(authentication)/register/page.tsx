"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import Input from "src/components/common/input";
import { RegisterService } from "src/services/auth.service";
import { IUserRegister } from "src/types/user";

export default function RegisterPage() {
  const mutation = useMutation({
    mutationFn: (data: IUserRegister) => RegisterService(data),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      phone_number: formData.get("phone_number") as string,
    };

    mutation.mutate(data);
  };

  return (
    <form
      className="w-full p-8  sm:w-1/2 lg:w-[400px] flex mt-auto gap-4 flex-col m-auto space-y-4 shadow-lg"
      onSubmit={onSubmit}
    >
      <h2 className="text-2xl font-bold">Register</h2>

      <Input label="Fullname" type="text" name="full_name" />

      <Input label="Phone number" type="text" name="phone_number" />

      <Input label="Username" type="text" name="username" />

      <Input label="Email" type="email" name="email" />

      <Input label="Password" type="password" name="password" />

      <button
        type="submit"
        className={`bg-primary text-white p-2 rounded ${
          mutation.isPending ? "bg-primary/50" : ""
        }`}
      >
        {mutation.isPending ? "Loading ..." : "Register"}
      </button>

      <Link href="/login" className="text-primary">
        Login
      </Link>
    </form>
  );
}
