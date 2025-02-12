"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Work() {
  const { scrollY } = useScroll();
  const [xRange, setXRange] = useState(["-20%", "100%"]);
  const [yRange, setYRange] = useState(["0%", "20%"]);

  useEffect(() => {
    const updateRanges = () => {
      const width = window.innerWidth;

      if (width < 768) {
        // Mobile
        setXRange(["0%", "0%"]);
        setYRange(["-80%", "70%"]);
      } else if (width < 1400) {
        // Tablet
        setXRange(["-10%", "90%"]);
        setYRange(["0%", "20%"]);
      } else {
        // Desktop
        setXRange(["-10%", "100%"]);
        setYRange(["0%", "15%"]);
      }
    };

    updateRanges();
    window.addEventListener("resize", updateRanges);
    return () => window.removeEventListener("resize", updateRanges);
  }, []);

  const ballX = useTransform(scrollY, [0, 1500], xRange);
  const ballY = useTransform(scrollY, [0, 1000], yRange);
  return (
    <section className="px-6 md:px-16 lg:px-20 xl:px-32 py-20 xl:py-24 text-white relative overflow-hidden md:overflow-visible">
      {/* Gradientowa kula */}
      <motion.div
        style={{ x: ballX, y: ballY, willChange: "transform" }}
        className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-[#4A4AFF] to-[#4A4AFF] rounded-full blur-[120px] opacity-40"
      />
      <div>
        <h2 className="text-4xl xl:text-5xl leading-snug uppercase text-center">
          Jak przebiega współpraca?
        </h2>
        {/* items */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10 mt-20 xl:mt-32">
          <div className="border-white p-6 2xl:p-10 border-solid border-2 rounded-xl">
            <p className="text-5xl">1</p>
            <p className="mt-8">
              Spotkanie i brief – Umawiamy się na rozmowę, podczas której
              wspólnie wypełniamy brief, określając kluczowe informacje o marce.
            </p>
          </div>
          <div className="border-white p-6 2xl:p-10 border-solid border-2 rounded-xl">
            <p className="text-5xl">2</p>
            <p className="mt-8">
              Moodboard i kierunek wizualny – Tworzę moodboard, który pomoże
              ustalić spójną estetykę i kierunek projektu.
            </p>
          </div>
          <div className="border-white p-6 2xl:p-10 border-solid border-2 rounded-xl">
            <p className="text-5xl">3</p>
            <p className="mt-8">
              Po akceptacji stylu przechodzę do właściwego etapu – projektuję
              logo, identyfikację wizualną lub stronę internetową.
            </p>
          </div>
          <div className="border-white p-6 2xl:p-10 border-solid border-2 rounded-xl">
            <p className="text-5xl">4</p>
            <p className="mt-8">
              Po ostatecznej akceptacji przekazuję gotowe pliki oraz pełne prawa
              do projektu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
