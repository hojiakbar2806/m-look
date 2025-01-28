import React from "react";
import AdsBanner from "./banner";

export default function Ads() {
  const ads = {
    title: "Super Flash Sale",
    discount: "50%",
    title_color: "text-white",
    img: "https://images.pexels.com/photos/9252069/pexels-photo-9252069.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

    products: [
      {
        id: 1,
        img: "https://wallpapers.com/images/featured/nike-air-force-png-mzhx7k7yqlbr1eh6.jpg",
        title: "FS -  QUILTED QUILTED QUILTED MAXI CROSS BAG",
        price: 100,
        oldPrice: 200,
        rating: 3.5,
        ratingCount: 100,
        category: "category",
        description: "product description",
        brand: "brand",
        discount: 10,
      },
      {
        id: 1,
        img: "https://wallpapers.com/images/featured/nike-air-force-png-mzhx7k7yqlbr1eh6.jpg",
        title: "FS -  QUILTED QUILTED QUILTED MAXI CROSS BAG",
        price: 100,
        oldPrice: 200,
        rating: 3.5,
        ratingCount: 100,
        category: "category",
        description: "product description",
        brand: "brand",
        discount: 10,
      },
      {
        id: 1,
        img: "https://wallpapers.com/images/featured/nike-air-force-png-mzhx7k7yqlbr1eh6.jpg",
        title: "FS -  QUILTED QUILTED QUILTED MAXI CROSS BAG",
        price: 100,
        oldPrice: 200,
        rating: 3.5,
        ratingCount: 100,
        category: "category",
        description: "product description",
        brand: "brand",
        discount: 10,
      },
    ],
  };

  return (
    <div className="w-full flex flex-col">
      <AdsBanner ads={ads} />
      {/* <AdsProduct ads={ads} /> */}
    </div>
  );
}
