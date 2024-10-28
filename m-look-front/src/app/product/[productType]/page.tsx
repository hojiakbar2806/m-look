import React from "react";
import ProductBar from "src/components/productBar/productBar";
import Products from "src/components/products/products";

const CategoryPage = async ({
  params,
}: {
  params: { productType: string };
}) => {
  const { productType } = await params;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <ProductBar productLength={10} />
      <Products productType={productType} />
    </div>
  );
};

export default CategoryPage;
