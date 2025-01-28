"use client";

import { BellRingIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  useNotificationDialogStore,
  useSidebarDialogStore,
} from "src/store/profileStore";

const ProfileHead: React.FC = () => {
  const { openDialog: openSidebar } = useSidebarDialogStore();
  const { openDialog: openNotification } = useNotificationDialogStore();
  return (
    <header className="app-container w-full flex items-center justify-between bg-white shadow-md">
      <Link href={"/"} className="text-2xl font-bold">
        M-LOOK
      </Link>
      <div className="flex items-center gap-8">
        <button
          onClick={openNotification}
          data-state={true}
          className="relative
          data-[state=true]:after:block
          after:w-3 after:hidden after:h-3 after:bg-primary after:rounded-full after:absolute after:-top-1/3 after:-right-1/3 after:animate-ping"
        >
          <BellRingIcon className="app-icon" />
        </button>
        <div onClick={openSidebar} className="flex items-center gap-3">
          <figure className="size-10 cursor-pointer rounded-full bg-slate-500"></figure>
        </div>
      </div>
    </header>
  );
};

export default ProfileHead;
