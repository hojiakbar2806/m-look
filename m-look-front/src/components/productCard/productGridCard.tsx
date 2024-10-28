"use client";

import React, { useEffect, useState } from "react";
import Rating from "../rating";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "src/globalReux/feature/wishListSlice";
import { RootState } from "src/globalReux/store";
import { addToCart } from "src/globalReux/feature/cartSlice";
import { IProduct } from "src/interface/product";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

const ProductGridCard = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  const [heartColor, setHeartColor] = useState("none");
  const wishList = useSelector((state: RootState) => state.wishList);

  useEffect(() => {
    const isExist = wishList.some((item) => item.id === product.id);
    if (isExist) {
      setHeartColor("red");
    } else {
      setHeartColor("none");
    }
  }, [wishList, product.id]);

  return (
    <div className="group relative overflow-hidden border rounded-lg shadow-md flex flex-col items-center">
      <figure className="w-full relative">
        <Image
          width={500}
          height={350}
          src={product.img}
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

          <button
            className="cursor-pointer  ml-auto "
            onClick={() => dispatch(addToCart(product))}
          >
            <ShoppingCart className="text-primary size-4 sm:size-6 md:size-8" />
          </button>
        </div>
      </div>
      <button
        className="cursor-pointer hover:bg-white/20 p-2 flex justify-center items-center absolute top-1 right-1 rounded-full transition-all duration-300"
        onClick={() => dispatch(addToWishList(product))}
      >
        <Heart
          className="text-secondary size-4 sm:size-5 md:size-7"
          fill={heartColor}
        />
      </button>
    </div>
  );
};

export default ProductGridCard;
