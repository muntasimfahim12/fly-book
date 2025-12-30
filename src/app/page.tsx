import FAQSection from "../components/Faq/Faq";
import Page from "../components/shared/hero/hero";
import Iata from "../components/Iata/Iata";
import TravelStats from "../components/TravelStats/TravelStats";
import TravelCard from "../components/TravelPackages/TravelCard";
// import PopularDestinations from "../components/Destinations/Destionations";
import PopularPackages from "../components/PopularPackages/PopularPackages";


export default function Home() {
  return (
    <div>
      <Page></Page>
      <PopularPackages></PopularPackages>
      {/* <PopularDestinations></PopularDestinations> */}
      <TravelCard></TravelCard>
      <TravelStats></TravelStats>
      <FAQSection></FAQSection>
      <Iata></Iata>
    </div>
  );
}


