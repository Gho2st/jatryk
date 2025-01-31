import { PiCodaLogoBold } from "react-icons/pi";
import { TbWorldWww } from "react-icons/tb";
import { FaPencilAlt } from "react-icons/fa";
import { MdNaturePeople } from "react-icons/md";

export default function Offer() {
  return (
    <section className="px-6 pb-24 bg-gradient-to-tl from-blue-400 to-blue-800 text-white">
      <div className="text-white flex justify-center">
        <h2 className="p-4 px-10 mt-20 rounded-xl text-center text-5xl xl:text-6xl font-semibold">
          Oferta
        </h2>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-16 mt-24 xl:mt-32">
        <div className="">
          <PiCodaLogoBold className="text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Logo Design</p>
        </div>
        <div className="">
          <MdNaturePeople className="text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Identyfikaja Marki</p>
        </div>
        <div className="">
          <TbWorldWww className="text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Strony Internetowe</p>
        </div>
        <div className="">
          <FaPencilAlt className="text-7xl mx-auto" />
          <p className="text-center mt-8 xl:text-xl">Nazwa Firmy</p>
        </div>
      </div>
      <p className="text-center mt-24 xl:text-lg ">A moze wszystko w jednym?</p>
    </section>
  );
}
