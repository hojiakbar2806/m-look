"use client";

import { Search } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "src/hooks/useDebounce";

export default function SearchBar() {
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("query", debouncedValue);
      redirect(`/search?${params.toString()}`);
    }
  }, [debouncedValue, searchParams]);

  return (
    <li className="flex items-center">
      <label
        data-focused={isOpen}
        htmlFor="search"
        className="group relative items-center flex p-1 border rounded-md  border-transparent
        data-[focused=true]:border-blue-500"
      >
        <input
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-0 transition-all text-xs sm:text-sm md:text-lg text-dark placeholder:text-dark/50 duration-300 outline-none
          group-data-[focused=true]:w-32 
          group-data-[focused=true]:sm:w-60"
          placeholder="Search..."
          type="text"
          id="search"
        />
        <Search className="app-icon cursor-pointer" />
      </label>
    </li>
  );
}
