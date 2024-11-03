"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "src/services/product.service";
import GridProductSkeleton from "../productCard/skeleton/gridProductSkeleton";
import ProductBar from "../productBar/productBar";
import { AlertCircle } from "lucide-react";
import ProductGridCard from "../productCard/productGridCard";
import ProductsWrapper from "../productCard/ProductWrapper";
import ProductListCard from "../productCard/productListCard";

const Products = ({ productType, q }: { productType: string; q?: string }) => {
  const searchParams = useSearchParams();

  console.log(q);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", searchParams.toString(), productType],
    queryFn: () => fetchProducts(searchParams),
  });

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

  const view = searchParams.get("view") === "list" ? "list" : "grid";

  return (
    <React.Fragment>
      <div className="w-full flex flex-col justify-enter items-center py-4 gap-4">
        <ProductBar productLength={data?.length || 0} />

        <ProductsWrapper view={view}>
          {[...Array(20)].map((item, i) =>
            view ? (
              <ProductGridCard key={i} product={product} />
            ) : (
              <ProductListCard key={i} product={product} />
            )
          )}
          {isLoading && <GridProductSkeleton size={8} />}
          {error && error.message && (
            <div className="flex items-center p-4 bg-red-100 border border-red-300 rounded-md">
              <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
              <span className="text-red-800">
                Error: {error.message || "Something went wrong!"}
              </span>
            </div>
          )}
        </ProductsWrapper>
      </div>
    </React.Fragment>
  );
};

export default Products;
