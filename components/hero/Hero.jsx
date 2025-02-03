"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../buttons/Button";
import { HiMiniSparkles } from "react-icons/hi2";
import Image from "next/image";

export default function Hero() {
  const text = "Hej! Jestem Patryk";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 pb-16 xl:pb-44 pt-10 lg:px-20 xl:px-32 flex justify-between flex-col xl:flex-row  gap-10 ">
      <div className="xl:w-1/2 text-center md:text-left">
        <motion.h1
          className="text-4xl xl:text-5xl 2xl:text-6xl font-extrabold leading-snug xl:leading-snug bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {displayText}
        </motion.h1>
        <motion.p
          className="mt-10 mb-10 xl:mb-14 2xl:mb-16 text-2xl 2xl:text-4xl lg:w-1/2 xl:w-full text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Potrzebujesz kreatywnego grafika z pasją do tworzenia wizualnych
          opowieści?
        </motion.p>
        <div>
          <Button text="Porozmawiajmy" link="/kontakt" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.05, y: -5 }} // Powiększenie i lekkie uniesienie
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative"
      >
        <Image
          src={"/patryk2.png"}
          width={400}
          height={400}
          layout="intrinsic"
          className="rounded-full shadow-lg shadow-yellow-500/30 border-4 border-gray-700"
          alt="Patryk Jędrzejek"
        />
      </motion.div>
    </section>
  );
}
