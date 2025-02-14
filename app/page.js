import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Nav from "@/components/nav/Nav";
import Offer from "@/components/offer/Offer";
import Portfolio from "@/components/portfolio/Portfolio";
import Reviews from "@/components/reviews/Reviews";
import Gallery from "@/components/slider/slider";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Offer />
      <Gallery />
      <Portfolio />
      <Reviews />
      <Footer />
    </>
  );
}
