"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../buttons/Button";
import { HiMiniSparkles } from "react-icons/hi2";
import Image from "next/image";

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
    <section className="px-6 pb-24 xl:pb-32 pt-14  xl:pt-24 lg:px-20 xl:px-32 grid lg:grid-cols-2 gap-20 xl:gap-12 ">
      <div>
        <motion.h1
          className="text-4xl xl:text-6xl 2xl:text-7xl h-20 xl:h-28 font-extrabold leading-snug 2xl:h-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {displayText}
        </motion.h1>
        <p className="mt-10 mb-10 xl:mt-14 2xl:mt-20 xl:mb-14 2xl:mb-16 text-2xl 2xl:text-4xl lg:w-1/2 xl:w-full">
          Potrzebujesz kreatywnego grafika z pasją do tworzenia wizualnych
          opowieści?
        </p>
        <Button text="Porozmawiajmy" link="/kontakt" />
      </div>
      <div className="flex justify-center items-center">
        {/* <HiMiniSparkles className="text-9xl text-blue-500" /> */}
        <div className="w-2/3">
          <Image
            src={"/grafik.png"}
            width={100}
            height={100}
            layout="responsive"
            alt="grafika przedstawiajaca Jatryka pracujacego nad grafika"
          />
        </div>
      </div>
    </section>
  );
}
