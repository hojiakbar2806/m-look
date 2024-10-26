"use client";

import React, { useEffect, useState } from "react"; // useEffect va useState qo'shildi
import Rating from "../rating";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "src/app/globalReux/feature/wishListSlice";
import { RootState } from "src/app/globalReux/store";
import { addToCart } from "src/app/globalReux/feature/cartSlice";
import { IProduct } from "src/app/interface/product";
import Image from "next/image";

const ProductGridCard = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  const [isInWishList, setIsInWishList] = useState(false);

  const wishList = useSelector((state: RootState) => state.wishList.wishList);

  useEffect(() => {
    const checkWishList = () => {
      const isExist = wishList.some((item) => item.id === product.id);
      setIsInWishList(isExist);
    };

    checkWishList();
  }, [product.id, wishList]);

  return (
    <div className="group relative overflow-hidden border rounded-lg shadow-md flex gap-4 flex-col items-center">
      <Image
        width={500}
        height={350}
        src="https://picsum.photos/500/350"
        alt="Mahsulot rasmi"
      />
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
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.7627 12.7209C15.2768 12.7202 15.7747 12.5412 16.1715 12.2144C16.5683 11.8876 16.8395 11.4333 16.9388 10.929L18.0538 5.35596C18.1183 5.03298 18.1105 4.69967 18.0309 4.38007C17.9513 4.06046 17.8018 3.7625 17.5933 3.50757C17.3847 3.25263 17.1222 3.04707 16.8248 2.9057C16.5273 2.76433 16.2021 2.69064 15.8728 2.68994H4.77276V1.57495C4.77249 1.2801 4.65547 0.997347 4.44726 0.788574C4.23904 0.579802 3.95661 0.461995 3.66176 0.460938H1.44677C1.15696 0.469619 0.881935 0.590827 0.680013 0.798889C0.47809 1.00695 0.365163 1.2855 0.365163 1.57544C0.365163 1.86537 0.47809 2.14393 0.680013 2.35199C0.881935 2.56005 1.15696 2.68126 1.44677 2.68994H2.56176V13.835C2.12048 13.833 1.68854 13.962 1.32067 14.2057C0.952798 14.4495 0.665562 14.7969 0.49532 15.204C0.325078 15.6111 0.279495 16.0596 0.364369 16.4926C0.449243 16.9257 0.660736 17.3238 0.972066 17.6365C1.2834 17.9493 1.68056 18.1625 2.11321 18.2493C2.54586 18.3361 2.99455 18.2926 3.40242 18.1242C3.8103 17.9558 4.15904 17.6701 4.40441 17.3033C4.64978 16.9366 4.78075 16.5052 4.78075 16.064H12.5468C12.5486 16.5027 12.6802 16.931 12.9253 17.2949C13.1703 17.6588 13.5176 17.9419 13.9234 18.1085C14.3292 18.2752 14.7753 18.3179 15.2053 18.2312C15.6354 18.1445 16.0301 17.9323 16.3397 17.6215C16.6493 17.3107 16.8598 16.9151 16.9448 16.4847C17.0297 16.0544 16.9852 15.6084 16.8169 15.2033C16.6486 14.7982 16.3641 14.452 15.9992 14.2084C15.6343 13.9649 15.2055 13.835 14.7668 13.835H4.77977V12.7209H14.7627ZM15.8778 4.92096L14.7627 10.494H4.77575V4.92096H15.8758H15.8778Z"
                fill="#33A0FF"
              />
            </svg>
          </button>
        </div>
      </div>
      <button
        className="cursor-pointer absolute top-0 right-0 grid place-items-center  p-3  rounded-full"
        onClick={() => dispatch(addToWishList(product))}
      >
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 19 17"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={isInWishList ? "fill-red-500" : "fill-skyblue"}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.1451 2.80421C13.789 2.80487 14.4189 2.99135 14.9593 3.34132C15.4998 3.69128 15.9276 4.18982 16.1916 4.77705C16.4556 5.36427 16.5445 6.01525 16.4476 6.65174C16.3506 7.28824 16.072 7.88318 15.6451 8.36518C15.0321 9.05618 9.80517 13.9492 9.80517 13.9492C9.80517 13.9492 4.56715 9.0562 3.95415 8.3542C3.41296 7.74673 3.11524 6.96079 3.11815 6.14723C3.13332 5.27049 3.49223 4.43473 4.1176 3.82008C4.74298 3.20542 5.58479 2.86103 6.46166 2.86103C7.33853 2.86103 8.18028 3.20542 8.80565 3.82008C9.43103 4.43473 9.79 5.27049 9.80517 6.14723C9.80517 5.70809 9.89163 5.27321 10.0597 4.8675C10.2277 4.46179 10.4741 4.09318 10.7846 3.78266C11.0951 3.47214 11.4637 3.2258 11.8694 3.05775C12.2751 2.8897 12.71 2.80323 13.1492 2.80323L13.1451 2.80421ZM13.1492 0.574227C11.9429 0.572122 10.7688 0.963582 9.80517 1.68922C8.70121 0.869834 7.3333 0.487409 5.96447 0.615487C4.59563 0.743565 3.32243 1.37311 2.38964 2.38307C1.45685 3.39302 0.930292 4.71212 0.911183 6.0868C0.892075 7.46148 1.38176 8.79471 2.28612 9.83021C2.91212 10.5482 7.03512 14.4082 8.28612 15.5742C8.69904 15.9604 9.24329 16.1752 9.80864 16.1752C10.374 16.1752 10.9182 15.9604 11.3311 15.5742C12.5751 14.4092 16.6811 10.5592 17.3151 9.84223C18.0264 9.0387 18.4907 8.04687 18.652 6.98591C18.8133 5.92495 18.6648 4.83997 18.2245 3.86134C17.7841 2.8827 17.0705 2.05199 16.1695 1.46906C15.2685 0.886136 14.2183 0.575753 13.1451 0.575204L13.1492 0.574227Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProductGridCard;
