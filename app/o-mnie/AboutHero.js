"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/buttons/Button";

export default function AboutHero() {
  return (
    <section className="px-6 md:px-16 lg:px-20 xl:px-32 pb-20 xl:pb-44 2xl:pb-96 2xl:pt-32">
      <div className="flex flex-col md:flex-row gap-20 justify-between md:gap-24">
        <div className="md:w-2/3 xl:w-1/2">
          <h1 className="text-4xl leading-snug xl:text-5xl xl:leading-snug mt-10 mb-10 2xl:mt-0 font-semibold text-[#4A4AFF]">
            Trochę więcej o sobie
          </h1>
          <div className="2xl:text-2xl">
            <p>
              Patryk Jędrzejek – ekspert w kreowaniu wyróżniających się marek!
              Jako absolwent 5-letniej szkoły graficznej łączę kreatywność z
              precyzją, tworząc spójne i efektowne identyfikacje wizualne.
              Specjalizuję się w budowaniu unikalnych wizerunków firm, pomagając
              markom przyciągać uwagę i skutecznie komunikować się z odbiorcami.
            </p>
            <p className="my-10 2xl:mb-16">
              Jeśli szukasz profesjonalnego podejścia do designu, które
              podkreśli charakter Twojego biznesu – dobrze trafiłeś!
            </p>
          </div>
          <Button text="Zróbmy to razem!" link="/kontakt" />
        </div>
        <div className="md:w-1/3 xl:w-1/4 flex justify-center items-center">
          <motion.div
            animate={{
              rotate: [0, 15, -10, 20, -5, 0], // Nieregularne kąty
              scale: [1, 1.05, 1], // Subtelne powiększanie
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
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
