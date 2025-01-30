import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" px-6 bg-blue-500 ">
      <h2 className="uppercase text-3xl leading-snug py-10 text-white">
        Skontaktuj się ze mną juz teraz
      </h2>
      <div className="flex flex-col gap-6 my-10 py-20 text-xl text-white">
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
      <div className="mt-20">
        <div className="px-6">
          <Image src="/logo.png" width={100} height={100} alt="logo grafika Jatryk" layout="responsive" />
        </div>
        <p className="py-12 text-center text-white ">
          @ 2024 Jatryk Projekt i realizacja Domiweb
        </p>
      </div>
    </footer>
  );
}
