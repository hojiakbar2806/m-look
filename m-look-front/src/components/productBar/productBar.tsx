"use client";

import { ChevronDown, LayoutGrid, LayoutList } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/globalReux/store";

type ProductBarProps = {
  productLength: number;
};

const ProductBar = ({ productLength }: ProductBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const navbarState = useSelector((state: RootState) => state.navbarHeight);

  const params = new URLSearchParams(searchParams.toString());
  const view = params.get("view") === "list" ? "list" : "grid";

  const updateView = (newView: "grid" | "list") => {
    params.set("view", newView);
    router.push(`${pathname}?${params.toString()}`);
  };

  const sortBy = [
    { name: "Popularity", value: "popularity" },
    { name: "Price: Low to High", value: "price-asc" },
    { name: "Price: High to Low", value: "price-desc" },
  ];

  const size = ["10", "15", "20"];

  const dropdownRef = useRef<HTMLSpanElement | null>(null);
  const showSizeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }

      if (
        showSizeRef.current &&
        !showSizeRef.current.contains(event.target as Node)
      ) {
        setShowSize(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      data-state={navbarState.isTop}
      className="w-full data-[state=true]:top-32 sticky top-[80px] z-20 flex items-center justify-between p-4 bg-gray-100 rounded-md transition-all duration-300"
    >
      <div className="flex items-center justify-center gap-6">
        <h2 className="text-xl font-medium">{productLength} Items</h2>
        <div className="relative flex items-center">
          <span
            ref={dropdownRef}
            onClick={() => setOpen(!open)}
            className="select-none text-lg min-w-32 flex items-center gap-4 cursor-pointer"
          >
            Sort by
            <ChevronDown
              className={`${open ? "rotate-180" : ""} transition-all`}
            />
          </span>
          <ul
            data-open={open}
            className="data-[open=true]:opacity-100 data-[open=true]:top-8 opacity-0 w-auto overflow-hidden absolute top-12 rounded-md flex flex-col  bg-white shadow-md transition-all duration-300"
          >
            {sortBy.map((item) => {
              const is_active = params.get("sort") === item.value;
              return (
                <li
                  data-state={is_active}
                  key={item.value}
                  className="data-[state=true]:bg-slate-200 text-lg p-2 cursor-pointer whitespace-nowrap hover:text-primary transition-all"
                  onClick={() => {
                    params.set("sort", item.value);
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative flex items-center">
          <span
            ref={showSizeRef}
            onClick={() => setShowSize(!showSize)}
            className="select-none text-lg min-w-32 flex items-center gap-4 cursor-pointer"
          >
            Show items
            <ChevronDown
              className={`${showSize ? "rotate-180" : ""} transition-all`}
            />
          </span>
          <ul
            data-open={showSize}
            className="data-[open=true]:opacity-100 w-full data-[open=true]:top-8 opacity-0 overflow-hidden absolute top-12 rounded-md flex flex-col  bg-white shadow-md transition-all duration-300"
          >
            {size.map((size) => {
              const is_active = params.get("page_size") === size;
              return (
                <li
                  data-state={is_active}
                  key={size}
                  className="data-[state=true]:bg-slate-200  text-lg p-2 cursor-pointer whitespace-nowrap hover:text-primary transition-all"
                  onClick={() => {
                    params.set("page_size", size);
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  {size} items
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          data-active={view === "grid"}
          className="data-[active=true]:bg-primary/80 data-[active=true]:text-white p-2 hover:bg-primary/80 hover:text-white rounded transition-all"
          onClick={() => updateView("grid")}
        >
          <LayoutGrid />
        </button>
        <button
          data-active={view === "list"}
          className="data-[active=true]:bg-primary/80 data-[active=true]:text-white p-2 hover:bg-primary/80 hover:text-white rounded transition-all"
          onClick={() => updateView("list")}
        >
          <LayoutList />
        </button>
      </div>
    </div>
  );
};

export default ProductBar;
