"use client";

import Form from "next/form";
import Link from "next/link";
import Input from "src/components/common/input";
import { LoginService } from "src/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setAuth } from "src/redux/feature/authSlice";
import { AppDispatch } from "src/redux/store";
import { useRouter } from "next/navigation";

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (data: LoginData) => LoginService(data),
    onSuccess: () => {
      dispatch(setAuth());
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/");
    },
  });

  const onSubmit = (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    mutation.mutate({ email, password });
  };

  return (
    <Form
      action={onSubmit}
      className="w-full p-8 sm:w-1/2 lg:w-[400px] flex mt-auto gap-4 flex-col m-auto space-y-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold">Login</h2>
      <Input
        value={"user@example.com"}
        label="Email"
        type="email"
        name="email"
      />
      <Input
        value={"string"}
        label="Password"
        type="password"
        name="password"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Login
      </button>

      <Link href="/register" className="text-blue-500">
        Register
      </Link>
    </Form>
  );
}
