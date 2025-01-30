import Link from "next/link";

export default function Button(props) {
  return (
    <div className="px-6 py-3 bg-[#EFB036] hover:bg-gray-300  inline-block rounded-xl">
      <Link className="text-xl font-medium" href={props.link}>
        {props.text}
      </Link>
    </div>
  );
}
