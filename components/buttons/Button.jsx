import Link from "next/link";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function Button({ link, text }) {
  return (
    <Link
      href={link}
      className="inline-block px-6 py-3 text-xl font-medium  bg-[#EFB036] 
          hover:bg-[#d89c2a] active:bg-[#bf8925] focus:ring-4 focus:ring-[#f4c86f] 
          rounded-xl shadow-md transition-all duration-300 ease-in-out transform 
          hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div>{text}</div>
        <FaArrowRightToBracket />
      </div>
    </Link>
  );
}
