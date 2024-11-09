import ServiceCard from "src/components/store/home/serviceCard";
import Ads from "../components/store/home/advert/advert";
import BestSeller from "../components/store/home/bestSeller/bestSeller";
import BrandNews from "../components/store/home/brandNews";
import Header from "../components/store/home/header/header";

export default async function Home() {
  // await new Promise((resolve) => setTimeout(() => 10000));

  return (
    <div className="w-full">
      <Header />
      <Ads />
      <BestSeller />
      <BrandNews />
      <ServiceCard />
    </div>
  );
}
