"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

type sideBarProps = {
  name: string;
  path: string;
  icon: ReactNode;
};

const SideBarLink: React.FC<sideBarProps> = ({ name, path, icon }) => {
  const pathName = usePathname().split("/").slice(0, 3).join("/");
  const isActive = pathName === path;

  return (
    <Link
      href={path}
      className={`w-full cursor-pointer flex gap-4 items-center text-lg hover:bg-primary/30 rounded-lg p-3 transition-all duration-300   ${
        isActive && "border-primary border-r-2 text-primary"
      }`}
    >
      {icon}
      <p>{name}</p>
    </Link>
  );
};

export default SideBarLink;
