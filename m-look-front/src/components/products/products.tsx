"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "src/apiServices/product.service";
import GridProductSkeleton from "../productCard/skeleton/gridProductSkeleton";

const Products = ({ productType }: { productType: string }) => {
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", searchParams.toString(), productType],
    queryFn: () => fetchProducts({ searchParams, productType }),
  });

  if (isLoading) return <GridProductSkeleton size={8} />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <React.Fragment>
      {/* {data &&
        data.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))} */}
    </React.Fragment>
  );
};

export default Products;
