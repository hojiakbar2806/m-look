import Ads from "./components/ads/ads";
import BestSeller from "./components/bestSeller/bestSeller";
import BrandNews from "./components/brandNews/brandNews";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Ads />
      <BestSeller />
      <BrandNews />
    </div>
  );
}
