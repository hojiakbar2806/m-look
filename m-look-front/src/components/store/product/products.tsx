"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductBar from "./productBar";
import { AlertCircle } from "lucide-react";
import ProductsWrapper from "src/components/common/product/wrapper";
import ProductGridCard from "src/components/common/product/cardGrid";
import ProductListCard from "src/components/common/product/cardList";
import GridProductSkeleton from "src/components/common/product/skeleton/gridSkeleton";
import { ISearchParams } from "src/types/mixin";
import { notFound } from "next/navigation";
import { getProductsService } from "src/services/product.service";

type ProductProps = {
  query: ISearchParams;
  view: string;
  productType: string;
};

const Products: React.FC<ProductProps> = ({ query, view, productType }) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["products", query],
    queryFn: () => getProductsService(query, productType),
  });

  if (isError && data?.status === 404) return notFound();

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
  const viewCard = view == "list" ? "list" : "grid";
  return (
    <React.Fragment>
      <div className="w-full flex flex-col justify-enter items-center py-4 gap-4">
        <ProductBar productLength={data?.data?.length || 0} />

        <ProductsWrapper view={viewCard}>
          {[...Array(20)].map((item, i) =>
            viewCard == "grid" ? (
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
