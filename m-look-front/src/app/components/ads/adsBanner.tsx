import Image from "next/image";
import { IAdsContent } from "src/app/interface/product";

const AdsBanner = ({ ads }: { ads: IAdsContent }) => {
  return (
    <div className="w-full flex flex-col overflow-hidden relative">
      <div className="absolute left-14 bottom-1/3 z-10">
        <h1
          className={
            "text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold " +
            ads.titl_color
          }
        >
          {ads.title}
        </h1>
        <h1
          className={
            "text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl  " +
            ads.titl_color
          }
        >
          {ads.discount} OFF
        </h1>
      </div>
      <Image
        width={1000}
        height={1000}
        className="w-full -z-10 left-0 top-0 object-cover"
        src={ads.img}
        alt="Ads"
      />
    </div>
  );
};

export default AdsBanner;
