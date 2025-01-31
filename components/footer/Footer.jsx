import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 xl:px-32 bg-blue-500 ">
      <h2 className="uppercase text-3xl xl:text-5xl leading-snug py-10 xl:py-24 text-white">
        Masz pomysł? Zamieńmy go w rzeczywistość!
      </h2>
      <div className="xl:flex xl:flex-row-reverse xl:justify-between xl:mt-32">
        <div className="flex flex-col xl:flex-row xl:items-center gap-6 my-10 xl:my-0 py-16 xl:py-0 text-xl text-white">
          <Link className="mx-auto" href="/">
            Strona Główna
          </Link>
          <Link className="mx-auto" href="/portfolio">
            Portfolio
          </Link>
          <Link className="mx-auto" href="/kontakt">
            Kontakt
          </Link>
          <Link className="mx-auto" href="/o-mnie">
            O Mnie
          </Link>
        </div>
        <div className="px-6 xl:w-1/3">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="logo grafika Jatryk"
            layout="responsive"
          />
        </div>
      </div>
      <p className="py-12 text-center text-white ">
        @ 2024 Jatryk Projekt i realizacja{" "}
        <Link
          className="text-green-200 font-bold"
          href="https://www.domiweb.pl/"
        >
          Domiweb
        </Link>
      </p>
    </footer>
  );
}
