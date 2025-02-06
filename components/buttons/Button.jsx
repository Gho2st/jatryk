import Image from "next/image";
import Link from "next/link";

export default function Button({ link, text }) {
  return (
    <Link
      href={link}
      className="inline-block pr-6  text-xl font-medium bg-[#4A4AFF]
          rounded-r-3xl shadow-md transition-all duration-300 ease-in-out transform 
          hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div>
          <Image src="/logo5.png" width={50} height={100} alt="przycisk" />
        </div>
        <div>{text}</div>
      </div>
    </Link>
  );
}
