import React from "react";
import CategoryCard from "src/components/categoryCard/categoryCard";
import Header from "src/components/header/header";
import Products from "src/components/products/products";

type CategoryPageProps = {
  params: Promise<{ productType: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { productType } = await params;

  return (
    <div className="w-full">
      <Header />
      <div className="w-full gap-4 flex md:px-16 lg:px-24">
        <CategoryCard />
        <Products productType={productType} />
      </div>
    </div>
  );
}
