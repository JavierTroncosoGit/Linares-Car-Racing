import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Steps from "@/components/sections/Steps";
import BrandsGrid from "@/components/sections/BrandsGrid";
import VehicleBrandsGrid from "@/components/sections/VehicleBrandsGrid";
import Faq from "@/components/sections/Faq";
import CtaBanner from "@/components/sections/CtaBanner";
import MapEmbed from "@/components/sections/MapEmbed";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />
      <FeaturedProducts />
      <Steps />
      <BrandsGrid />
      <VehicleBrandsGrid />
      <Faq />
      <CtaBanner />
      <MapEmbed />
    </>
  );
}
