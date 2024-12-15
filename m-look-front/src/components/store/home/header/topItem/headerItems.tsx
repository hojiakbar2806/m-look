import React, { Suspense } from "react";
import Link from "next/link";
import LanguageDropdown from "../navItems/langDropDown";
import { UserRound } from "lucide-react";
import SearchBar from "./searchComp";
import CartComp from "./cartComp";

const HeaderItems = () => {
  return (
    <div className="global-padding h-20 sticky top-0 z-40 flex w-full bg-white justify-between items-center border-b">
      <LanguageDropdown />
      <ul className="flex items-center gap-8">
        <li>
          <Link
            href={"/profile"}
            className="flex text-sm md:text-lg lg:text-xl items-center gap-2"
          >
            <UserRound className="text-dark  size-4 md:size-6" />
          </Link>
        </li>
        <CartComp />
        <Suspense>
          <SearchBar />
        </Suspense>
      </ul>
    </div>
  );
};

export default HeaderItems;
