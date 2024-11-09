import React from "react";
import ProductNotFound from "./not-found";

type ProductDetailParams = {
  params: Promise<{ productSlug: string }>;
};

export default async function ProductDetail({ params }: ProductDetailParams) {
  const { productSlug } = await params;

  if (productSlug == "salom") return <ProductNotFound />;
  return <div>{productSlug}</div>;
}
