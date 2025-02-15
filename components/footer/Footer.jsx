import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-16 lg:px-20 xl:px-32 py-20 xl:py-24 ">
      <h2 className="uppercase text-3xl xl:text-5xl leading-snug text-white xl:leading-snug">
        Masz pomysł? Zamieńmy go w rzeczywistość!
      </h2>
      <div className="md:flex md:flex-row-reverse md:justify-between md:mt-32">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 md:my-0 py-16 md:py-0 text-xl text-white">
          <Link className="mx-auto" href="/">
            Strona Główna
          </Link>
          <Link className="mx-auto" href="/#portfolio">
            Portfolio
          </Link>
          <Link className="mx-auto" href="/kontakt">
            Kontakt
          </Link>
          <Link className="mx-auto" href="/o-mnie">
            O Mnie
          </Link>
          <Link
            className="mx-auto"
            href="/polityka_prywatnosci_jatryk.pdf"
            target="_blank"
          >
            Polityka Prywatności
          </Link>
        </div>
        <div className="px-6 md:w-1/3">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="logo grafika Jatryk"
            layout="responsive"
          />
        </div>
      </div>
      <p className="mt-24 text-center text-white ">
        @ {currentYear} Jatryk Projekt i realizacja{" "}
        <Link
          className="text-[#4A4AFF] font-bold"
          href="https://www.domiweb.pl/"
        >
          Domiweb
        </Link>
      </p>
    </footer>
  );
}
