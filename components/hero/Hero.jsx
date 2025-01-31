"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../buttons/Button";
import { HiMiniSparkles } from "react-icons/hi2";

export default function Hero() {
  const text = "Hej! Jestem Patryk Jędrzejek";
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
    <section className="px-6 lg:px-20 xl:px-32 mt-8 min-h-[84vh] xl:mt-16  grid lg:grid-cols-2 ">
      <div>
        <motion.h1
          className="text-4xl xl:text-7xl font-extrabold leading-snug h-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {displayText}
        </motion.h1>
        <p className="mt-10 mb-10 xl:mt-20 xl:mb-16 text-2xl xl:text-4xl lg:w-1/2 xl:w-full">
          Potrzebujesz kreatywnego grafika z pasją do tworzenia wizualnych
          opowieści?
        </p>
        <Button text="Porozmawiajmy" link="/kontakt" />
      </div>
      <div className="flex justify-end">
        <HiMiniSparkles className="text-9xl text-blue-500" />
      </div>
    </section>
  );
}
