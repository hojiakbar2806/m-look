"use client";
import React from "react";
import { useAuthStore } from "src/store/authStore";

export default function LogoutButton() {
  const { logout } = useAuthStore();

  return <button onClick={async () => await logout()}>LOGOUT</button>;
}
