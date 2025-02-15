"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { PiCodaLogoBold } from "react-icons/pi";
import { TbWorldWww } from "react-icons/tb";
import { MdNaturePeople } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Offer() {
  const { scrollY } = useScroll();
  const [xRange, setXRange] = useState(["-20%", "100%"]);
  const [yRange, setYRange] = useState(["0%", "20%"]);

  useEffect(() => {
    const updateRanges = () => {
      const width = window.innerWidth;

      if (width < 768) {
        // Mobile
        setXRange(["0%", "0%"]);
        setYRange(["0%", "80%"]);
      } else if (width < 1400) {
        // Tablet
        setXRange(["0%", "100%"]);
        setYRange(["0%", "20%"]);
      } else {
        // Desktop
        setXRange(["-10%", "180%"]);
        setYRange(["0%", "15%"]);
      }
    };

    updateRanges();
    window.addEventListener("resize", updateRanges);
    return () => window.removeEventListener("resize", updateRanges);
  }, []);

  const ballX = useTransform(scrollY, [0, 1000], xRange);
  const ballY = useTransform(scrollY, [200, 1000], yRange);

  return (
    <section
      id="portfolio"
      className="relative px-6 md:px-16 lg:px-20 xl:px-32 py-20 xl:py-32 text-white overflow-hidden md:overflow-visible"
    >
      {/* Gradientowa kula */}
      <motion.div
        style={{ x: ballX, y: ballY, willChange: "transform" }}
        className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-br from-[#4A4AFF] to-[#4A4AFF] rounded-full blur-[120px] opacity-40"
      />
      <div className="relative text-white flex justify-center">
        <h2 className="px-10 rounded-xl text-center text-5xl 2xl:text-6xl font-semibold">
          Oferta
        </h2>
      </div>

      <div className="relative grid grid-cols-2 xl:grid-cols-4 gap-16 mt-24 xl:mt-32 2xl:mt-44">
        <div>
          <PiCodaLogoBold className="text-6xl md:text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Logo Design</p>
        </div>
        <div>
          <MdNaturePeople className="text-6xl md:text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Identyfikacja Marki</p>
        </div>
        <div>
          <FaPeopleGroup className="text-6xl md:text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Konsultacje</p>
        </div>
        <div>
          <TbWorldWww className="text-6xl md:text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Projekt Strony</p>
        </div>
      </div>
    </section>
  );
}
