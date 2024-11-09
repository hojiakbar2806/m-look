"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { LogOutService } from "src/services/auth.service";

export default function LogoutButton() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => LogOutService(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  return <button onClick={() => mutation.mutate()}>LOGOUT</button>;
}
