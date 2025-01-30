import Image from "next/image";
import Link from "next/link";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function PortfolioItem() {
  return (
    <div>
      <Image
        src={"/portfolio/pekario.png"}
        width={100}
        height={100}
        layout="responsive"
        alt=""
      />
      <div className="px-6 my-10">
        <h3 className="text-3xl font-semibold">Pekario</h3>
        <p className="my-6">
          Jeżeli twoja firma potrzebuje pomocy gdyż boryka się z obniżaną
          jakością jej postrzegania przez złą identyfikację marki to napisz do
          mnie!!
        </p>
        <div className="flex gap-2 items-center">
          <Link href="">Zobacz więcej</Link>
          <FaArrowRightToBracket />
        </div>
      </div>
    </div>
  );
}
