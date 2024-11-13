"use client";

import { LogOut } from "lucide-react";
import React from "react";
import { useAuthStore } from "src/store/authStore";

const LogoutButton = () => {
  const { logout } = useAuthStore();
  return (
    <button
      className="p-3 w-full text-xl flex items-center justify-center gap-4 hover:bg-slate-200 rounded-lg transition-all duration-300"
      onClick={async () => await logout()}
    >
      <LogOut />
      Logout
    </button>
  );
};

export default LogoutButton;
