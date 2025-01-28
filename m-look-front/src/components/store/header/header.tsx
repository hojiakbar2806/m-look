import React, { Suspense } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import CartComp from "./cartComp";
import SearchBar from "./searchComp";

const Header: React.FC = () => {
  return (
    <header className="app-container flex justify-between items-center sticky top-0 z-20 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold">
        M-LOOK
      </Link>
      <ul className="flex items-center gap-8">
        <li>
          <Link
            href={"/profile"}
            className="flex text-sm md:text-lg lg:text-xl items-center gap-2"
          >
            <UserRound className="app-icon" />
          </Link>
        </li>
        <CartComp />
        <Suspense>
          <SearchBar />
        </Suspense>
      </ul>
    </header>
  );
};

export default Header;
