import React from "react";
import Header from "src/components/header/header";
import Products from "src/components/products/products";

type param = {
  params: Promise<{ params: string }>;
  searchParams: Promise<{ searchParams: string }>;
};

export default async function Product({ searchParams }: param) {
  const searchParam = await searchParams;

  return (
    <div>
      <Header />
      <div className="w-full md:px-16 lg:px-24">
        <Products productType="all" q={searchParam.searchParams} />
      </div>
    </div>
  );
}
