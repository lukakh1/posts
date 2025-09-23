import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex">
      <div className="w-full max-w-7xl flex justify-between items-center mx-auto px-4">
        <Link href={"/"} className="text-xl font-bold">
          Header
        </Link>
      </div>
    </div>
  );
}
