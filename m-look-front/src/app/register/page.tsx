"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import Input from "src/components/Input";

import { LoginService } from "src/services/user.service";

type LoginData = {
  email: string;
  password: string;
};

type Success = {
  message: string;
  token: string;
};

export default function RegisterPage() {
  const mutation = useMutation({
    mutationFn: (data: LoginData) => LoginService(data),
    onSuccess: (data: Success) => console.log(data),
    onError: (error: Error) => console.log(error),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: LoginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
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

      <Input label="Email" type="email" name="email" />

      <Input label="Password" type="password" name="password" />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Login
      </button>

      <Link href="/login" className="text-blue-500">
        Login
      </Link>

      {mutation.isError && (
        <p className="text-red-500">{mutation.error?.message}</p>
      )}
    </form>
  );
}
