import React, { useState } from "react";

import SearchIcon from "src/assets/icons/search-icon.svg";
import Image from "next/image";
import Link from "next/link";

import LanguageDropdown from "./langDropDown";
import ProfileIcon from "src/assets/icons/profile_close_2.svg";
import CartIcon from "src/assets/icons/cart.svg";
import { useSelector } from "react-redux";
import { RootState } from "src/app/globalReux/store";

const HeaderItems = () => {
  const [onFocus, setOnFocus] = useState(false);

  const cart = useSelector((state: RootState) => state.cart);

  const cartLength = cart.products.length;
  const totalPrice = cart.totalPrice;

  return (
    <div className="flex w-full bg-white justify-between items-center px-4 py-4 md:px-24 border-b">
      <LanguageDropdown />
      <ul className="flex items-center gap-8">
        <li>
          <Link
            href={""}
            className="flex text-sm md:text-lg lg:text-xl items-center gap-2"
          >
            <Image src={ProfileIcon} alt={"Profile icon"} />
          </Link>
        </li>
        <li>
          <Link href="" className="flex relative items-center gap-2">
            <Image src={CartIcon} alt="Cart icon" />
            <span className="absolute grid place-items-center left-4 -top-2   h-5 w-5 text-white rounded-full bg-red-500 text-[12px] border border-white">
              {cartLength}
            </span>
          </Link>
        </li>
        <li className="flex items-center text-sm md:text-lg lg:text-xl gap-2">
          <span>Items:</span>
          <span className="font-light text-gray-400">{totalPrice}$</span>
        </li>

        <li>
          <label
            htmlFor="search-header"
            className={`relative flex p-2 border rounded-md ${
              onFocus ? "border-blue-500" : "border-gray-400 border-transparent"
            }`}
          >
            <input
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              className={`transition-all duration-300 outline-none ${
                onFocus ? "w-60" : "w-0"
              }`}
              placeholder="Search..."
              type="text"
              id="search-header"
            />
            <Image
              className="cursor-pointer"
              src={SearchIcon}
              alt="Search icon"
            />
          </label>
        </li>
      </ul>
    </div>
  );
};

export default HeaderItems;
