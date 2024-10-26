import Image from "next/image";
import Wrapper from "../wrapper";
import { IAdsContent } from "src/app/interface/product";
import classNames from "classnames";

const AdsProduct = ({ ads }: { ads: IAdsContent }) => {
  return (
    <Wrapper className="-translate-y-10 border-b sm:border-none sm:-translate-y-20 md:-translate-y-30 xl:-translate-y-40 flex-wrap gap-4">
      {ads.product.map((item, i) => {
        const isLastProduct = i === ads.product.length - 1;
        const isSecondLastProduct = i === ads.product.length - 2;

        return (
          <div
            className={classNames(
              "w-full sm:w-1/2 md:w-[40%] xl:w-1/4 p-4 flex flex-col justify-between sm:shadow-lg rounded-[30%] sm:rounded-md items-center gap-6 bg-white",
              {
                "hidden xl:flex": isLastProduct,
                "hidden md:flex": isSecondLastProduct,
              }
            )}
            key={i}
          >
            <h1 className="w-2/3 text-center lg:text-2xl capitalize">
              {item.title.charAt(0).toUpperCase() +
                item.title.slice(1).toLowerCase()}
            </h1>

            <Image
              src={item.img}
              className="w-[200px] sm:w-auto"
              alt="product image"
              width={300}
              height={300}
            />

            <div className="w-full flex flex-row justify-between gap-2">
              <h1 className="xl:text-2xl flex items-center gap-2">
                <span className="line-through text-red-500">
                  {item.oldPrice}
                </span>
                <span>{ads.discount}</span>
              </h1>

              <h1 className="text-skyblue font-bold xl:text-2xl">
                {item.price}
              </h1>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default AdsProduct;
