"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { PiCodaLogoBold } from "react-icons/pi";
import { TbWorldWww } from "react-icons/tb";
import { FaPencilAlt } from "react-icons/fa";
import { MdNaturePeople } from "react-icons/md";

export default function Offer() {
  const { scrollY } = useScroll();

  // Ruch kuli w pionie i poziomie
  const ballX = useTransform(scrollY, [0, 1500], ["-20%", "100%"]);
  const ballY = useTransform(scrollY, [200, 1000], ["-20%", "30%"]);

  return (
    <section className="relative px-6 md:px-16 lg:px-20 xl:px-32 py-20 xl:py-24 2xl:py-60 bg-gradient-to-tr from-[#4a4aff10] to-[#0D0D0D] text-white overflow-hidden">
      {/* Gradientowa kula */}
      <motion.div
        style={{ x: ballX, y: ballY, willChange: "transform" }}
        className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-[#4A4AFF] to-[#4A4AFF] rounded-full blur-[120px] opacity-40"
      />

      <div className="relative text-white flex justify-center">
        <h2 className="px-10 rounded-xl text-center text-5xl xl:text-6xl font-semibold">
          Oferta
        </h2>
      </div>

      <div className="relative grid grid-cols-2 xl:grid-cols-4 gap-16 mt-24 xl:mt-32">
        <div>
          <PiCodaLogoBold className="text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Logo Design</p>
        </div>
        <div>
          <MdNaturePeople className="text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Identyfikacja Marki</p>
        </div>
        <div>
          <TbWorldWww className="text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Strony Internetowe</p>
        </div>
        <div>
          <FaPencilAlt className="text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Nazwa Firmy</p>
        </div>
      </div>

      <p className="text-center mt-24 xl:text-lg">A może wszystko w jednym?</p>
    </section>
  );
}
