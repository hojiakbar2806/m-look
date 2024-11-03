"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LanguageDropdown from "./langDropDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/globalReux/store";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import { openCartDialog } from "src/globalReux/feature/cartSlice";
// import { useRouter, useSearchParams } from "next/navigation";
// import useDebounce from "src/lib/useDebounce";

const HeaderItems = () => {
  const [onFocus, setOnFocus] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [searchValue, setSearchValue] = useState("");
  const { cart } = useSelector((state: RootState) => state.cart);
  // const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams.toString());
  const dispatch = useDispatch();
  // const router = useRouter();

  // const debouncedValue = useDebounce(searchValue, 500);

  // useEffect(() => {
  //   if (debouncedValue) {
  //     params.set("search", debouncedValue);
  //     router.push(`/product/?${params.toString()}`);
  //   }
  // }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCartLength(cart.products.length);
    setTotalPrice(cart.totalPrice);
  }, [cart, dispatch]);

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
        <li
          className="flex relative cursor-pointer items-center gap-2"
          onClick={() => dispatch(openCartDialog())}
        >
          <ShoppingCart className="text-dark  size-4 md:size-6" />
          <span className="absolute grid place-items-center left-4 -top-2 h-5 w-5 text-white rounded-full bg-secondary text-[12px] border border-white">
            {cartLength}
          </span>
        </li>
        <li className="flex items-center text-sm md:text-lg lg:text-xl gap-2">
          <span className="text-dark">Items:</span>
          <span className="font-light text-dark/50">{totalPrice || 0}$</span>
        </li>

        <li className="flex items-center">
          <label
            htmlFor="search-header"
            className={`relative items-center flex p-1 border rounded-md ${
              onFocus ? "border-blue-500" : "botext-dark  border-transparent"
            }`}
          >
            <input
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              // onChange={(e) => setSearchValue(e.target.value)}
              className={`transition-all text-xs sm:text-sm md:text-lg text-dark placeholder:text-dark/50 duration-300 outline-none ${
                onFocus ? "w-32 sm:w-60" : "w-0"
              }`}
              placeholder="Search..."
              type="text"
              id="search-header"
            />
            <Search
              className="cursor-pointer text-dark  size-4 md:size-6"
              strokeWidth={2.75}
            />
          </label>
        </li>
      </ul>
    </div>
  );
};

export default HeaderItems;
