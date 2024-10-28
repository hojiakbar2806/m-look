"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "src/services/product.service";
import GridProductSkeleton from "../productCard/skeleton/gridProductSkeleton";
import ProductBar from "../productBar/productBar";
import { AlertCircle } from "lucide-react"; 

const Products = ({ productType }: { productType: string }) => {
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", searchParams.toString(), productType],
    queryFn: () => fetchProducts(searchParams),
  });

  return (
    <div className="w-full h-10 flex flex-col gap-4">
      <ProductBar productLength={data?.length || 0} />
      <div className="w-full">
        {isLoading && <GridProductSkeleton size={8} />}
        {error && error.message && (
          <div className="flex items-center p-4 bg-red-100 border border-red-300 rounded-md">
            <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
            <span className="text-red-800">
              Error: {error.message || "Something went wrong!"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
