"use client";

import React, { useEffect, useState } from "react";
import Rating from "../rating";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "src/app/globalReux/feature/wishListSlice";
import { RootState } from "src/app/globalReux/store";
import { addToCart } from "src/app/globalReux/feature/cartSlice";
import { IProduct } from "src/app/interface/product";
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
    <div className="group relative overflow-hidden border rounded-lg shadow-md flex gap-4 flex-col items-center">
      <Image width={500} height={350} src={product.img} alt="Mahsulot rasmi" />
      <div className="w-full justify-center items-center flex flex-col gap-4 p-4">
        <h1 className="text-center capitalize text-lg text-responsive font-semibold">
          {product.title}
        </h1>
        <Rating value={product.rating || 0} isReadOnly={true} />

        <div className="w-full flex gap-4">
          <h1 className=" text-skyblue font-bold text-responsive text-lg">
            ${product.price}
          </h1>
          <h1 className=" text-red-500 text-responsive text-lg line-through">
            ${product.oldPrice}
          </h1>
          <h1 className="  text-responsive">{product.discount}%</h1>
          <button
            className="cursor-pointer ml-auto "
            onClick={() => dispatch(addToCart(product))}
          >
            <ShoppingCart strokeWidth={3} className="text-skyblue" />
          </button>
        </div>
      </div>
      <button
        className="cursor-pointer absolute top-0 right-0 grid place-items-center  p-3  rounded-full"
        onClick={() => dispatch(addToWishList(product))}
      >
        <Heart strokeWidth={2.75} stroke="red" fill={heartColor} />
      </button>
    </div>
  );
};

export default ProductGridCard;
