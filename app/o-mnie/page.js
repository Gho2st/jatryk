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
            Nie mam swojego konkretnego stylu, tylko zawsze jestem elastyczny i
            dopasowuje styl do projektu, który zleca mi klient.
          </p>
          <p className="mt-10">
            To dołożę do tego ponad 5 letnie doświadczenie oraz fakt, że
            projektowałem dla wielu różnych branży, począwszy od IT, poprzez
            suplementy aż po rolniczą! Nie mam swojego konkretnego stylu, tylko
            zawsze jestem elastyczny i dopasowuje styl do projektu, który zleca
            mi klient.
          </p>
        </div>
        <div className="w-11/12 mx-auto md:w-1/2 xl:mt-0 grid grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <Image
              src="/logo3.png"
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/logo3.png"
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/logo3.png"
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/logo3.png"
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
              className="mx-auto md:w-4/5 xl:w-2/3  border-[#4A4AFF] shadow-xl border-solid border-4 rounded-2xl"
            >
              <source src="/tiktok.mp4" type="video/mp4" />
              Twój przeglądarka nie obsługuje wideo.
            </video>
          </div>
          <div className="md:w-1/2 text-white">
            <h2 className="text-3xl xl:text-5xl pb-10 xl:pb-12 xl:leading-snug uppercase">
              Zaobserwuj mnie na Tiktoku!
            </h2>
            <p>
              Aktywnie prowadzę profil na TikToku, gdzie publikuje kontent
              skierowany do innych projektantów. Ten portal pozwala mi pokazywać
              realizacje w ciekawy sposób, budząc we mnie duszę młodego
              reżysera.
            </p>
            <p className="mt-10 mb-10">
              Swoje początki w wideo stawiałem natomiast na innej platformie,
              tej bardziej znanej. Chodzi mianowicie o YouTube'a. Kanał na ten
              moment zebrał niespełna 35k wyświetleń.
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
