"use client";

import React from "react";
import Dialog from "src/components/common/dialog";
import SidebarItem from "./sidebarItem";
import { useSidebarDialogStore } from "src/store/profileStore";
import { PROFILE_LINKS } from "src/utils/const";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { MyProfileService } from "src/services/user.service";
import { useAuthStore } from "src/store/authStore";

const SidebarDialog: React.FC = () => {
  const { isOpen, closeDialog } = useSidebarDialogStore();
  const { logout } = useAuthStore();
  const { data = null } = useQuery({
    queryKey: ["profile"],
    queryFn: MyProfileService,
  });

  return (
    <Dialog dialogState={isOpen ? "open" : "close"} onClose={closeDialog}>
      <div className="flex flex-col h-full">
        <div className="w-full flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-6">
            <figure className="w-20 h-20 rounded-full bg-slate-500"></figure>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl text-dark font-semibold">
                {data?.data.username}
              </h1>
              <p className="text-sm">{data?.data.full_name}</p>
            </div>
          </div>
          <button onClick={closeDialog} className="text-red-500">
            <X />
          </button>
        </div>
        <div className="w-full flex flex-col justify-between rounded-xl p-6">
          <ul>
            {PROFILE_LINKS.map((link) => (
              <SidebarItem
                key={link.path}
                href={link.path}
                label={link.label}
                Icon={link.icon}
              />
            ))}
          </ul>
        </div>
        <button
          className="text-red-500 mt-auto m-4 p-4 bg-gray-200 rounded-md"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </Dialog>
  );
};

export default SidebarDialog;
