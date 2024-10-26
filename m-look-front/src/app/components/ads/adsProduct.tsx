import Image from "next/image";
import { IAds } from "./type";
import Wrapper from "../wrapper";

const AdsProduct = ({ ads }: { ads: IAds }) => {
  return (
    <Wrapper className="-translate-y-24 gap-2">
      {ads.product.map((item, i) => (
        <div
          className="w-full p-4 flex flex-col justify-between shadow-lg rounded-md items-center gap-4 bg-white"
          key={i}
        >
          <h1 className="text-md md:text-xl lg:text-2xl">{item.title}</h1>

          <Image src={item.img} alt="product image" width={300} height={300} />

          <div className="w-full flex flex-row justify-between  gap-2">
            <h1 className="text-sm md:text-md lg:text-lg xl:text-2xl flex items-center gap-2">
              <span className="line-through text-red-500">{item.oldPrice}</span>
              <span className="">{ads.discount}</span>
            </h1>

            <h1 className="text-sm text-skyblue font-bold md:text-md lg:text-lg xl:text-2xl">
              {item.price}
            </h1>
          </div>
        </div>
      ))}
    </Wrapper>
  );
};

export default AdsProduct;
