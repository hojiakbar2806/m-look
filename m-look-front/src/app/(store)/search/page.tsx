import React from "react";
import ProductsWrapper from "src/components/common/product/wrapper";
import Header from "src/components/store/home/header/header";
import Products from "src/components/store/search/products";

type SearchParams = {
  searchParams: Promise<string>;
};

export default async function SearchPage({ searchParams }: SearchParams) {
  const query = await searchParams;

  return (
    <div>
      <Header />
      <ProductsWrapper view={"grid"} className="p-4">
        <Products query={query} />
      </ProductsWrapper>
    </div>
  );
}
