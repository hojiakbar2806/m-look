"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LanguageDropdown from "./langDropDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/globalReux/store";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import { openCartDialog } from "src/app/globalReux/feature/cartSlice";

const HeaderItems = () => {
  const [onFocus, setOnFocus] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const [cartLength, setCartLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setCartLength(cart.products.length);
    setTotalPrice(cart.totalPrice);
  }, [cart]);

  return (
    <div className="sticky top-0 z-40 flex w-full bg-white justify-between items-center px-4 py-4 md:px-24 border-b">
      <LanguageDropdown />
      <ul className="flex items-center gap-8">
        <li>
          <Link
            href={""}
            className="flex text-sm md:text-lg lg:text-xl items-center gap-2"
          >
            <UserRound strokeWidth={2.75} />
          </Link>
        </li>
        <li
          className="flex relative cursor-pointer items-center gap-2"
          onClick={() => dispatch(openCartDialog())}
        >
          <ShoppingCart strokeWidth={2.75} />
          <span className="absolute grid place-items-center left-4 -top-2 h-5 w-5 text-white rounded-full bg-red-500 text-[12px] border border-white">
            {cartLength}
          </span>
        </li>
        <li className="flex items-center text-sm md:text-lg lg:text-xl gap-2">
          <span>Items:</span>
          <span className="font-light text-gray-400">{totalPrice || 0}$</span>
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
            <Search className="cursor-pointer" strokeWidth={2.75} />{" "}
          </label>
        </li>
      </ul>
    </div>
  );
};

export default HeaderItems;
