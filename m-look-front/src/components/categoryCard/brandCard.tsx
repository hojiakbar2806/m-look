import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type Brand = {
  name: string;
  count: number;
};

const brands: Brand[] = [
  { name: "Adidas", count: 95 },
  { name: "Vans", count: 23 },
  { name: "Nike", count: 14 },
  { name: "Airmax", count: 48 },
];

const BrandCard: React.FC = () => {
  const searchParams = useSearchParams();

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return (
    <div className="flex flex-col gap-4 w-full rounded-lg bg-gray-100 p-4">
      <h2 className="text-xl font-medium">Brands</h2>

      {brands.map((item) => {
        const validQuery = item.name.replace(" ", "_");
        const mergeQuery = { ...params, brand: validQuery };
        const isActive = searchParams.get("brand") === validQuery;

        return (
          <Link
            data-active={isActive}
            href={{ pathname: "", query: mergeQuery }}
            key={item.name}
            className={`data-[active=true]:text-primary flex items-center justify-between gap-2`}
          >
            <span>{item.name}</span>
            <span>{item.count}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BrandCard;
