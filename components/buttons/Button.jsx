import Image from "next/image";
import Link from "next/link";

export default function Button({ link, text }) {
  return (
    <Link
      href={link}
      className="inline-block pr-6  text-xl font-medium bg-customBlue
          rounded-r-3xl shadow-md transition-all duration-300 ease-in-out transform 
          hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div>
          <Image src="/button_logo.png" width={35} height={35}  alt="przycisk" />
        </div>
        <div>{text}</div>
      </div>
    </Link>
  );
}
