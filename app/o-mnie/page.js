import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import Button from "@/components/buttons/Button";
import AboutHero from "./AboutHero";
import Image from "next/image";
import Work from "./Work";

export const metadata = {
  title: "O mnie – Jatryk | Patryk Jędrzejek",
  alternates: {
    canonical: "/o-mnie",
  },

  description:
    "Jestem Patryk Jędrzejek – pasjonat grafiki i projektowania wizualnego. Tworzę unikalne logo, identyfikację wizualną i branding, pomagając markom wyróżnić się na rynku.",
};

export default function About() {
  return (
    <>
      <Nav />
      <AboutHero />
      <Work />
      {/* loga */}
      <section className="px-6 md:px-16 lg:px-20 xl:px-32 flex flex-col md:flex-row gap-20 md:gap-24 py-20 xl:py-24">
        <div className="md:w-2/3 xl:w-1/2">
          <h2 className="text-4xl xl:text-5xl uppercase mb-12">Widzę to tak</h2>
          <p>
            Mam ponad 5 lat doświadczenia w projektowaniu dla różnych branż – od
            IT, przez suplementy, aż po rolnictwo. Zamiast trzymać się jednego,
            określonego stylu, zawsze dopasowuję swoją estetykę do specyfiki
            danego projektu i oczekiwań klienta, co pozwala mi tworzyć spójne i
            skuteczne rozwiązania wizualne
          </p>
          <p className="mt-10">
            Dzięki temu moje projekty są różnorodne, unikalne i idealnie wpisują
            się w potrzeby każdej branży.
          </p>
        </div>
        <div className="w-11/12 mx-auto md:w-1/2 xl:mt-0 grid grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <Image
              src="/loga/Wavekomunikacja.jpg"
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/loga/familnet.jpg"
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/loga/nexona.png"
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/loga/ravex.png"
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </div>
        </div>
      </section>
      {/* tiktok */}
      <section className="px-6 md:px-16 lg:px-20 xl:px-32 py-20 xl:py-24">
        <div className="flex flex-col-reverse md:flex-row gap-16">
          <div className="md:w-1/2 text-white flex justify-center items-center">
            <video
              controls
              playsInline
              className="mx-auto md:w-4/5 xl:w-2/3  border-[#0055F8] shadow-xl border-solid border-4 rounded-2xl"
            >
              <source src="/tiktok.mp4" type="video/mp4" />
              Twój przeglądarka nie obsługuje wideo.
            </video>
          </div>
          <div className="md:w-1/2 text-white">
            <h2 className="text-3xl xl:text-5xl pb-10 xl:pb-12 xl:leading-snug uppercase">
              Śledź mnie na TikToku! 🎥
            </h2>
            <p>
              Aktywnie prowadzę profil, gdzie tworzę treści dla innych
              projektantów, dzieląc się wiedzą i realizacjami w kreatywny
              sposób. TikTok to dla mnie nie tylko przestrzeń do prezentowania
              projektów, ale też okazja, by odkryć w sobie duszę reżysera.
            </p>
            <p className="mt-10 mb-10">
              Poza TikTokiem swoją wiedzę i doświadczenie chętnie dzielę także
              na innych platformach, gdzie pokazuję kulisy pracy, inspiracje i
              przydatne wskazówki dla projektantów. Sprawdź i daj znać, co
              sądzisz! 🚀
            </p>
            <Button
              text="Zaobserwuj!"
              link="https://www.tiktok.com/@jatryk.designer?is_from_webapp=1&sender_device=pc"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
