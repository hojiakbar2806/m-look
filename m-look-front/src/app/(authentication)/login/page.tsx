"use client";

import Form from "next/form";
import Link from "next/link";
import Input from "src/components/common/input";
import { LoginService } from "src/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { IUserLogin } from "src/types/user";

export default function Login() {

  const mutation = useMutation({
    mutationFn: (data: IUserLogin) => LoginService(data),
  });

  const onSubmit = (formData: FormData) => {
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    mutation.mutate(data);
  };

  return (
    <Form
      action={onSubmit}
      className="w-full p-8 sm:w-1/2 lg:w-[400px] flex mt-auto gap-4 flex-col m-auto space-y-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold">Login</h2>
      <Input value={"string"} label="Username" type="text" name="username" />
      <Input
        value={"string"}
        label="Password"
        type="password"
        name="password"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className={`bg-primary text-white p-2 rounded ${
          mutation.isPending ? "bg-primary/50" : ""
        }`}
      >
        {mutation.isPending ? "Loading ..." : "Login"}
      </button>

      <Link href="/register" className="text-primary">
        Register
      </Link>
    </Form>
  );
}
