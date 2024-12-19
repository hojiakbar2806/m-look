import Image from "next/image";
import { IAdsContent } from "src/types/product";
import { cn } from "src/utils/utils";

const AdsProduct = ({ ads }: { ads: IAdsContent }) => {
  return (
    <div className="w-full flex justify-center -translate-y-10 border-b sm:border-none sm:-translate-y-20 md:-translate-y-30 xl:-translate-y-40 flex-wrap gap-4">
      {ads.products.map((item, i) => {
        const isLastProduct = i === ads.products.length - 1;
        const isSecondLastProduct = i === ads.products.length - 2;

        return (
          <div
            className={cn(
              "w-full sm:w-1/2 md:w-[40%] xl:w-1/4 p-4 flex flex-col justify-between sm:shadow-lg rounded-[30%] sm:rounded-md items-center gap-6 bg-white",
              {
                "hidden xl:flex": isLastProduct,
                "hidden md:flex": isSecondLastProduct,
              }
            )}
            key={i}
          >
            <h1 className="w-2/3 text-center text-dark  lg:text-xl capitalize">
              {item.title.charAt(0).toUpperCase() +
                item.title.slice(1).toLowerCase()}
            </h1>

            <Image
              src={item.img}
              className="w-[200px] sm:w-auto"
              alt="product image"
              width={200}
              height={300}
            />

            <div className="w-full flex flex-row justify-center md:justify-start gap-4">
              <h1 className="xl:text-2xl flex line-through text-secondary items-center gap-2">
                ${item.oldPrice}
              </h1>

              <h1 className="text-primary font-bold xl:text-2xl">
                ${item.price}
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdsProduct;
