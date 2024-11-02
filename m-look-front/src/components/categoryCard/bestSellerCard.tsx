"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

const ct_data = [
  {
    name: "All Stars",
    count: 1,
  },
  {
    name: "Adidas",
    count: 95,
  },
  {
    name: "Vans",
    count: 23,
  },
  {
    name: "Nike",
    count: 14,
  },
  {
    name: "Airmax",
    count: 48,
  },
];

const BestSellerCard = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());

  return (
    <div className="w-full flex flex-col gap-4 bg-gray-100 rounded-lg p-4">
      <h2 className="text-xl font-medium">Best Seller</h2>
      {ct_data.map((item) => {
        const valid_query = item.name.toLocaleLowerCase().replace(" ", "_");
        const is_active = searchParams.get("best_seller") === valid_query;
        params.set("best_seller", valid_query);
        return (
          <Link
            data-active={is_active}
            href={`${pathname}?${params.toString()}`}
            key={item.name}
            className="data-[active=true]:text-primary flex items-center justify-between gap-2"
          >
            <span>{item.name}</span>
            <span className=""> 1</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BestSellerCard;
