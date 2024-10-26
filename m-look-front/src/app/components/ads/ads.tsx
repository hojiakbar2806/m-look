import React from "react";
import AdsBanner from "./adsBanner";
import AdsProduct from "./adsProduct";

export default function Ads() {
  const ads = {
    title: "Super Flash Sale",
    discount: "50%",
    titl_color: "text-white",
    img: "https://images.pexels.com/photos/9252069/pexels-photo-9252069.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

    product: [
      {
        id: 1,
        img: "https://wallpapers.com/images/featured/nike-air-force-png-mzhx7k7yqlbr1eh6.jpg",
        title: "FS -  QUILTED QUILTED QUILTED MAXI CROSS BAG",
        price: "$100",
        oldPrice: "$200",
      },
      {
        id: 2,
        img: "https://wallpapers.com/images/featured/nike-air-force-png-mzhx7k7yqlbr1eh6.jpg",
        title: "FS - Nike Air Max 270 React...",
        price: "$100",
        oldPrice: "$200",
      },
      {
        id: 2,
        img: "https://wallpapers.com/images/featured/nike-air-force-png-mzhx7k7yqlbr1eh6.jpg",
        title: "FS - Nike Air Max 270 React...",
        price: "$100",
        oldPrice: "$200",
      },
    ],
  };
  return (
    <div className="w-full flex flex-col">
      <AdsBanner ads={ads} />
      <AdsProduct ads={ads} />
    </div>
  );
}
