"use client";

import { HeartIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Product } from "src/types/product";
import Rating from "../rating";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

const ProductListCard: React.FC<ProductCardProps> = ({ product }) => {
  const [heartColor] = useState("none");

  // useEffect(() => {
  //   const isExist = wishList.some((item) => item.id === product.id);
  //   setHeartColor(isExist ? "#33A0FF" : "none");
  // }, [wishList, product.id]);

  return (
    <div className="group relative flex w-full flex-col  min-[600px]:flex-row gap-3 md:gap-4 rounded-lg border bg-white p-2 sm:p-3 md:p-4 hover:border-blue-200 transition-colors duration-300">
      <div className="relative aspect-[4/3] w-full sm:w-[200px] md:w-[250px] lg:w-[300px] overflow-hidden rounded-md">
        <Image src={product.img} width={500} height={350} alt="Product image" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="line-clamp-1 text-sm sm:text-base md:text-lg font-semibold text-dark capitalize">
            {product.title}
          </h1>
          <p className="line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm text-dark">
            {product.description}
          </p>
        </div>

        <Rating isReadOnly value={product.rating} />

        <div className="flex items-center gap-2 mt-auto">
          <span className="text-lg sm:text-xl font-bold text-primary">
            ${product.price}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs sm:text-sm text-primary hover:bg-primary hover:text-white transition-colors duration-300">
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Add to cart</span>
          </button>
          <button className="group flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-primary hover:bg-primary transition-colors duration-300">
            <HeartIcon
              className="h-4 w-4 sm:h-5 sm:w-5"
              stroke="#33A0FF"
              fill={heartColor}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
