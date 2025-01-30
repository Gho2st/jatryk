import { IoStar } from "react-icons/io5";

export default function ReviewItem() {
  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="flex justify-between gap-3">
        <div>
          <h3 className="font-bold text-lg">Anna Kowalska</h3>
        </div>
        <div className="flex">
          <IoStar className="text-2xl text-[#EFB036]" />
          <IoStar className="text-2xl text-[#EFB036]" />
          <IoStar className="text-2xl text-[#EFB036]" />
          <IoStar className="text-2xl text-[#EFB036]" />
          <IoStar className="text-2xl text-[#EFB036]" />
        </div>
      </div>
      <p className="mt-8">
        Współpraca z Patrykiem to czysta przyjemność. Stworzył dla mnie logo,
        które idealnie oddaje charakter mojej marki. Zdecydowanie polecam!
      </p>
    </div>
  );
}
