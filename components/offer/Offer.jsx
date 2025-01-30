import { PiCodaLogoBold } from "react-icons/pi";
import { TbWorldWww } from "react-icons/tb";
import { FaPencilAlt } from "react-icons/fa";
import { MdNaturePeople } from "react-icons/md";

export default function Offer() {
  return (
    <section className="px-6 pb-24 ">
      <div className="bg-blue-500 text-white p-4 flex justify-center">
        <h2 className="text-center text-5xl font-semibold">Oferta</h2>
      </div>
      <div className="grid grid-cols-2 gap-16 mt-32">
        <div className="">
          <PiCodaLogoBold className="text-7xl mx-auto" />
          <p className="text-center mt-8">Logo Design</p>
        </div>
        <div className="">
          <MdNaturePeople className="text-7xl mx-auto" />
          <p className="text-center mt-8">Identyfikacja Marki</p>
        </div>
        <div className="">
          <TbWorldWww className="text-7xl mx-auto" />
          <p className="text-center mt-8">Strony internetowe</p>
        </div>
        <div className="">
          <FaPencilAlt className="text-7xl mx-auto" />
          <p className="text-center mt-8">Nazwa firmy</p>
        </div>
      </div>
      <p className="text-center mt-24  ">A moze wszystko w jednym?</p>
    </section>
  );
}
