"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Work() {
  const { scrollY } = useScroll();

  // Ruch kuli w pionie i poziomie
  const ballX = useTransform(scrollY, [0, 1500], ["-20%", "100%"]);
  const ballY = useTransform(scrollY, [200, 1000], ["-20%", "30%"]);
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
              Umówimy się na spotkanie, na którym wspólnie uzupełnimy brief
              zawierający kluczowe informacje o marce.
            </p>
          </div>
          <div className="border-white p-6 2xl:p-10 border-solid border-2 rounded-xl">
            <p className="text-5xl">2</p>
            <p className="mt-8">
              Następnie przejdę do zaprojektowania moodboardu, który pomoże nam
              określić kierunek wizualny.
            </p>
          </div>
          <div className="border-white p-6 2xl:p-10 border-solid border-2 rounded-xl">
            <p className="text-5xl">3</p>
            <p className="mt-8">
              Po akceptacji propozycji estetyki. Przechodzę do stworzenia
              docelowego projektu logo / identyfikacji / strony www.
            </p>
          </div>
          <div className="border-white p-6 2xl:p-10 border-solid border-2 rounded-xl">
            <p className="text-5xl">4</p>
            <p className="mt-8">
              W momencie gdy padnie akceptacja, przechodzę do finalizacji
              współpracy. Przekazuje pliki oraz prawa do projektu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
