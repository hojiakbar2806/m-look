"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "src/hooks/useDebounce";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [onFocus, setOnFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );
  const router = useRouter();

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue) {
      params.set("query", debouncedValue);
      router.push(`/search/?${params.toString()}`);
    }
  }, [debouncedValue, params, router]);

  return (
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
          onChange={(e) => setSearchValue(e.target.value)}
          className={`transition-all text-xs sm:text-sm md:text-lg text-dark placeholder:text-dark/50 duration-300 outline-none ${
            onFocus ? "w-32 sm:w-60" : "w-0"
          }`}
          placeholder="Search..."
          type="text"
          id="search-header"
        />
        <Search
          className="cursor-pointer text-dark  size-4 md:size-6"
        />
      </label>
    </li>
  );
}
