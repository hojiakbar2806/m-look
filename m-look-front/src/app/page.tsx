import ServiceCard from "src/components/serviceCard/serviceCard";
import Ads from "../components/ads/ads";
import BestSeller from "../components/bestSeller/bestSeller";
import BrandNews from "../components/brandNews/brandNews";
import Header from "../components/header/header";

export default function Home() {

  return (
    <div className="w-full flex flex-col">
      <Header />
      <Ads />
      <BestSeller />
      <BrandNews />
      <ServiceCard />
    </div>
  );
}
