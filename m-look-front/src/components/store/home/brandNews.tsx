import React from "react";
import Image from "next/image";

const BrandNews = () => {
  return (
    <div className="app-container flex justify-center bg-primary md:flex-row items-center flex-col-reverse py-6 md:py-12 mt-20">
      <div className="text-white flex-1 flex flex-col items-start gap-6">
        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Adidas Men Running Sneakers
        </h1>
        <p className="text-white text-responsive">
          Performance and design. Taken right to the edge.
        </p>
        <button className="text-white border-b-2 py-2 border-white text-responsive mt-10">
          SHOP NOW
        </button>
      </div>
      <Image
        className="md:w-1/2 -translate-y-32"
        src={"/shoes.png"}
        alt="brand news"
        width={600}
        height={600}
        priority
      />
    </div>
  );
};

export default BrandNews;
