import { Fragment } from "react";
import ServiceCard from "src/components/store/home/serviceCard";
import Ads from "../components/store/home/advert/advert";
import BestSeller from "../components/store/home/bestSeller/bestSeller";
import BrandNews from "../components/store/home/brandNews";
import Header from "../components/store/header/header";

export default async function Home() {
  return (
    <Fragment>
      <Header />
      <Ads />
      <BestSeller />
      <BrandNews />
      <ServiceCard />
    </Fragment>
  );
}
