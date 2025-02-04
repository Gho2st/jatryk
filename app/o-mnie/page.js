import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import Button from "@/components/buttons/Button";
import AboutHero from "./AboutHero";
import Image from "next/image";

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
      {/* cooperate section */}
      <section className="px-6 md:px-16 lg:px-20 xl:px-32 py-20 xl:py-24 bg-gradient-to-tl from-blue-400 to-blue-800 text-white">
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
                Następnie przejdę do zaprojektowania moodboardu, który pomoże
                nam określić kierunek wizualny.
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
      {/* loga */}
      <section className="px-6 md:px-16 lg:px-20 xl:px-32 flex flex-col md:flex-row gap-20 md:gap-24 py-20 xl:py-24 bg-white text-black">
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
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/logo3.png"
              width={100}
              height={100}
              layout="responsive"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/logo3.png"
              width={100}
              height={100}
              layout="responsive"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/logo3.png"
              width={100}
              height={100}
              layout="responsive"
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
              className="mx-auto md:w-4/5 xl:w-2/3  border-[#EFB036] shadow-xl border-solid border-8 rounded-2xl"
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
