"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/buttons/Button";

export default function AboutHero() {
  const [rotation, setRotation] = useState({ x: 15, y: 15 }); // Większy początkowy obrót

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rotateX = -(clientY / window.innerHeight - 0.5) * 50; // Zwiększony efekt obrotu
    const rotateY = -(clientX / window.innerWidth - 0.5) * 50;
    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <section className="px-6 md:px-16 lg:px-20 xl:px-32 pb-20 xl:pb-44 2xl:pb-96 2xl:pt-32 ">
      <div className="flex flex-col md:flex-row gap-16 justify-between md:gap-24">
        <div className="md:w-2/3 xl:w-1/2">
          <h1 className="text-4xl leading-snug xl:text-5xl xl:leading-snug mt-10 mb-10 2xl:mt-0 font-semibold text-[#4A4AFF] ">
            Trochę więcej o sobie
          </h1>
          <div className="2xl:text-2xl">
            <p>
              Nazywam się Patryk Jędrzejek, od ponad 5 lat zajmuję się
              projektowaniem komunikacji wizualnej, której zadaniem jest
              nawiązanie relacji pomiędzy marką a jej klientem. Dowiedz się, jak
              mogę Tobie pomóc w sukcesywnym budowaniu dobrej komunikacji
              wizualnej.
            </p>
            <p className="my-10 2xl:mb-16">
              Do każdej współpracy z klientem podchodzę indywidualnie, co
              finalnie skutkuje unikalnym projektem logo, strony internetowej,
              czy innego projektu, który został mi zlecony.
            </p>
          </div>
          <Button text="Zróbmy to razem!" link="/kontakt" />
        </div>
        <div
          className="md:w-1/3 flex justify-center items-center"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            animate={{
              rotateX: rotation.x,
              rotateY: rotation.y,
            }}
            initial={{ rotateX: 20, rotateY: 20 }} // Mocniejszy początkowy obrót
            whileHover={{ scale: 1.01, rotateX: 0, rotateY: 0 }} // Po najechaniu mocniejszy powrót
            transition={{ type: "spring", stiffness: 120, damping: 8 }} // Szybsza i bardziej dynamiczna animacja
            className="cursor-pointer"
          >
            <Image
              src="/logo4.png"
              width={100}
              height={100}
              layout="responsive"
              alt="Logo"
              className="rounded-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
