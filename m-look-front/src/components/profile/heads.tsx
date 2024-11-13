"use client";

import { useQuery } from "@tanstack/react-query";
import { BellRing } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MyProfileService } from "src/services/user.service";

const ProfileHead: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: MyProfileService,
  });
  return (
    <div className="w-full h-24 flex items-center justify-between px-[10%]  bg-slate-100">
      <Link href={"/"} className="text-2xl font-bold">
        M-LOOK
      </Link>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <p className="text-xs">{data?.data.full_name}</p>
            <h1>{data?.data.email}</h1>
          </div>
          <figure className="size-14 cursor-pointer rounded-full bg-slate-500"></figure>
        </div>

        <button className="">
          <BellRing size={25} />
        </button>
      </div>
    </div>
  );
};

export default ProfileHead;
