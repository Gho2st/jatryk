import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import Button from "@/components/buttons/Button";

export default function About() {
  return (
    <>
      <Nav />
      <section className="px-6 xl:px-32 mb-32">
        <div className="flex">
          <div className="w-1/2">
            <h1 className="text-4xl my-16">Trochę więcej o sobie</h1>
            <p className="text-xl">
              Nazywam się Dominik Grocholski, od ponad 5 lat zajmuję się
              projektowaniem komunikacji wizualnej, której zadaniem jest
              nawiązanie relacji pomiędzy marką a jej klientem. Dowiedz się, jak
              mogę Tobie pomóc w sukcesywnym budowaniu dobrej komunikacji
              wizualnej.
            </p>
            <p className="text-xl my-10">
              Do każdej współpracy z klientem podchodzę indywidualnie, co
              finalnie skutkuje unikalnym projektem logo, strony internetowej,
              czy innego projektu, który został mi zlecony.
            </p>
            <Button text="Zróbmy to razem!" link="/kontakt" />
          </div>
          <div></div>
        </div>
      </section>
      <section className="px-6 xl:px-32 pb-32 bg-gradient-to-tl from-blue-400 to-blue-800 text-white">
        <div>
          <h2 className="text-5xl uppercase text-center pt-24">
            Jak przebiega współpraca?
          </h2>
          {/* items */}
          <div className="grid grid-cols-4 gap-10 mt-32">
            <div className="border-white p-10 border-solid border-2 rounded-xl">
              <p className="text-5xl">1</p>
              <p className="mt-8">
                Umówimy się na spotkanie, na którym wspólnie uzupełnimy brief
                zawierający kluczowe informacje o marce.
              </p>
            </div>
            <div className="border-white p-10 border-solid border-2 rounded-xl">
              <p className="text-5xl">2</p>
              <p className="mt-8">
                Następnie przejdę do zaprojektowania moodboardu, który pomoże
                nam określić kierunek wizualny.
              </p>
            </div>
            <div className="border-white p-10 border-solid border-2 rounded-xl">
              <p className="text-5xl">3</p>
              <p className="mt-8">
                Po akceptacji propozycji estetyki. Przechodzę do stworzenia
                docelowego projektu logo / identyfikacji / strony www.
              </p>
            </div>
            <div className="border-white p-10 border-solid border-2 rounded-xl">
              <p className="text-5xl">4</p>
              <p className="mt-8">
                W momencie gdy padnie akceptacja, przechodzę do finalizacji
                współpracy. Przekazuje pliki oraz prawa do projektu.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black">
        MOJ TIKTOK
      </section>
      <Footer />
    </>
  );
}
