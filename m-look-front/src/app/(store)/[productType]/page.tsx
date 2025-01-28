import React from "react";
import Header from "src/components/store/header/header";
import Category from "src/components/store/product/category/category";
import Products from "src/components/store/product/products";

type ProductPageProps = {
  params: Promise<{ productType: string }>;
  searchParams: Promise<Record<string, string>>;
};

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { productType } = await params;
  const query = await searchParams;
  const { view, ...restQuery } = query;

  return (
    <div className="w-full">
      <Header />
      <div className="w-full gap-4 flex md:px-16 lg:px-24">
        <Category />
        <Products
          query={{ ...restQuery }}
          productType={productType}
          view={view}
        />
      </div>
    </div>
  );
};

export default ProductPage;
