import Image from "next/image";
import { IAdsContent } from "src/types/product";

const AdsBanner = ({ ads }: { ads: IAdsContent }) => {
  return (
    <div className="w-full flex flex-col overflow-hidden relative">
      <div className="absolute left-[10%] bottom-1/2 z-10">
        <h1
          className={
            "text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold " +
            ads.title_color
          }
        >
          {ads.title}
        </h1>
        <h1
          className={
            "text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl  " +
            ads.title_color
          }
        >
          {ads.discount} OFF
        </h1>
      </div>
      <Image
        width={2000}
        height={1500}
        className="-z-10 left-0 top-0 object-cover"
        src={ads.img}
        alt="Ads"
        priority
      />
    </div>
  );
};

export default AdsBanner;
