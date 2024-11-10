"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Rating } from "src/components/common/_";
import { Product } from "src/types/product";
import useCartStore from "src/store/cartStore";
import useWishListStore from "src/store/wishListStore";

type ProductCardProps = {
  product: Product;
};

const ProductGridCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();

  const router = useRouter();

  return (
    <div
      className="group relative overflow-hidden border rounded-lg shadow-md flex flex-col items-center"
      onClick={() => router.push(`product/${product.id}`)}
    >
      <figure className="w-full relative cursor-pointer">
        <Image
          onError={(e) => {
            console.error("Error loading image:", e);
          }}
          src={product.img}
          width={500}
          height={350}
          alt="Mahsulot rasmi"
        />
        <span className="absolute right-0 bottom-0 bg-secondary text-white px-2 text-xs md:text-lg">
          {product.discount}%
        </span>
      </figure>
      <div className="w-full justify-center items-center flex flex-col gap-2 p-2 sm:p-4 lg:p-6">
        <h1 className="text-center text-dark capitalize text-xs sm:text-base md:text-lg xl:text-2xl font-semibold">
          {product.title}
        </h1>
        <Rating value={product.rating || 0} isReadOnly={true} />

        <div className="w-full flex items-center gap-2 text-xs sm:text-base md:text-lg">
          <h1 className=" text-primary font-bold">${product.price}</h1>
          <h1 className=" text-secondary line-through">${product.oldPrice}</h1>
          <HeartButton product={product} />
          <button
            className="cursor-pointer ml-auto p-2 hover:bg-primary/20 rounded-full transition-colors duration-300"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              addItem(product);
            }}
          >
            <ShoppingCart className="text-primary size-4 sm:size-6 md:size-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard;

//          #   CLIENT

const HeartButton = ({ product }: ProductCardProps) => {
  const { toggleItem, hasInWishList } = useWishListStore();
  const hasInList = hasInWishList(product.id);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <button
      className="cursor-pointer hover:bg-white/20 p-2 flex justify-center items-center absolute top-1 right-1 rounded-full transition-all duration-300"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleItem(product);
      }}
    >
      <Heart
        className={`${
          hasInList
            ? "stroke-secondary fill-secondary"
            : "stroke-white/60 fill-transparent"
        }  size-4 sm:size-5 md:size-7  active:scale-125 transition-all duration-300`}
      />
    </button>
  );
};
