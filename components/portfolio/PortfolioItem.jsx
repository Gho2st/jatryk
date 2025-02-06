import Image from "next/image";
import Link from "next/link";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function PortfolioItem(props) {
  console.log(props);
  const link = "/portfolio/" + props.title;
  return (
    <div
      className={`mt-10 md:mt-24 xl:mt-32  md:flex md:gap-24 md:justify-center ${
        props.order % 2 === 0 ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Image Section */}
      <div className="md:w-1/3 ">
        <Image
          src={props.imageURL}
          width={100}
          height={100}
          layout="responsive"
          alt={props.title}
        />
      </div>

      {/* Text Section */}
      <div className="md:w-2/5">
        <h3 className="text-3xl xl:text-4xl font-semibold mt-12 xl:mt-0 2xl:text-5xl">
          {props.title}
        </h3>
        <p className="my-6">{props.description}</p>
        <div className="flex gap-2 items-center hover:text-[#4A4AFF] transition-all ease-linear">
          <Link href={link}>Zobacz więcej</Link>
          <FaArrowRightToBracket />
        </div>
      </div>
    </div>
  );
}
