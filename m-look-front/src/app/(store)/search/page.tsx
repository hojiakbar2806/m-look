import React, { Fragment } from "react";
import ProductsWrapper from "src/components/common/product/wrapper";
import Header from "src/components/store/header/header";
import Products from "src/components/store/search/products";

type SearchParams = {
  searchParams: Promise<string>;
};

export default async function SearchPage({ searchParams }: SearchParams) {
  const query = await searchParams;

  return (
    <Fragment>
      <Header />
      <div className="app-container ">
        <ProductsWrapper view={"grid"} className="">
          <Products query={query} />
        </ProductsWrapper>
      </div>
    </Fragment>
  );
}
