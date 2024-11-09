"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchProduct } from "src/services/product.service";
import ProductGridCard from "src/components/common/product/cardGrid";
import GridProductSkeleton from "src/components/common/product/skeleton/gridSkeleton";

type Query = {
  query: string | "";
};

const Products: React.FC<Query> = ({ query }) => {
  const { isLoading, isError } = useQuery({
    queryKey: ["searchProduct", query],
    queryFn: () => SearchProduct(query || ""),
    enabled: !!query,
  });

  if (isError) {
  }

  const product = {
    id: 1,
    img: "https://picsum.photos/500/350",
    title: "Nike Airmax 270 React",
    price: 100,
    oldPrice: 200,
    rating: 3.5,
    ratingCount: 100,
    category: "category",
    description:
      "Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lectus lorem nunc leifend laorevtr istique et congue. Vivamus adipiscin vulputate g nisl ut dolor ...",
    brand: "brand",
    discount: 10,
  };

  const arr = [...Array(20)];

  return (
    <React.Fragment>
      {!isLoading &&
        arr.map((_, i) => <ProductGridCard key={i} product={product} />)}
      {isLoading && <GridProductSkeleton size={8} />}
    </React.Fragment>
  );
};

export default Products;
