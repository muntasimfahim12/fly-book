import FAQSection from "../components/PackageCard/Faq/Faq";
import Page from "../components/shared/hero/hero";
import Iata from "../components/PackageCard/Iata/Iata";
import TravelStats from "../components/PackageCard/TravelStats/TravelStats";
import TravelCard from "../components/PackageCard/TravelPackages/TravelCard";
import PopularDestinations from "../components/PackageCard/Destinations/Destionations";
import PopularPackages from "../components/PackageCard/PopularPackages/PopularPackages";


export default function Home() {
  return (
    <div>
      <Page></Page>
      <PopularPackages></PopularPackages>
      <PopularDestinations></PopularDestinations>
      <TravelCard></TravelCard>
      <TravelStats></TravelStats>
      <FAQSection></FAQSection>
      <Iata></Iata>
    </div>
  );
}


