"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type ItemProps = {
  name: string;
  path: string;
};

const SettingHeaderItem: React.FC<ItemProps> = ({ name, path }) => {
  const pathName = usePathname();

  const isActive = pathName === path;
  return (
    <li
      data-active={isActive}
      className="p-4 border-b data-[active=true]:border-b-primary data-[active=true]:text-primary  hover:border-b-primary hover:text-primary transition-all duration-200"
    >
      <Link href={path}>{name}</Link>
    </li>
  );
};

export default SettingHeaderItem;
