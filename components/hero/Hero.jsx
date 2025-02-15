"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../buttons/Button";
import Image from "next/image";

export default function Hero() {
  const text = "Cześć! Jestem Patryk";
  const [displayText, setDisplayText] = useState("");
  const [animationFinished, setAnimationFinished] = useState(false); // Nowy stan

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
        setAnimationFinished(true); // Animacja zakończona
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Przewijanie po zakończeniu animacji
  useEffect(() => {
    if (
      animationFinished &&
      typeof window !== "undefined" &&
      window.location.hash
    ) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Dodatkowe opóźnienie dla pewności
    }
  }, [animationFinished]);

  return (
    <section className="px-6 pb-16 md:pb-24 xl:pb-44 xl:pt-20 pt-10 md:px-16 lg:px-20 xl:px-32 flex justify-between flex-col md:flex-row gap-10 xl:gap-20 2xl:pb-62 2xl:pt-32">
      <div className="xl:w-1/2 text-center md:text-left">
        <p className="mb-6 uppercase font-bold text-xl">Brand Designer</p>
        <motion.h1
          className="text-4xl h-20 md:h-auto xl:text-5xl 2xl:text-6xl font-extrabold leading-snug xl:leading-snug text-[#4A4AFF]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {displayText}
        </motion.h1>
        <motion.p
          className="mt-10 mb-10 xl:mb-14 2xl:mb-24 text-xl font-semibold 2xl:text-2xl lg:w-1/2 xl:w-full text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Od 3 lat pomagam firmom budować silne marki projektując dla nich
          komunikację wizualną.
        </motion.p>
        <div>
          <Button text="Porozmawiajmy" link="/kontakt" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        className="flex items-start justify-center relative mx-auto w-2/3 md:w-1/3 2xl:w-1/3"
      >
        <Image
          src={"/patryk.jpg"}
          width={100}
          height={100}
          layout="responsive"
          className="rounded-3xl shadow-lg"
          alt="Patryk Jędrzejek"
        />
      </motion.div>
    </section>
  );
}
