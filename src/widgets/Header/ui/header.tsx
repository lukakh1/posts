import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex">
      <div className="w-full max-w-7xl flex justify-between items-center mx-auto px-4">
        <div className="flex gap-x-3">
          <Link href={"/"} className="text-xl font-bold">
            Home
          </Link>
          <Link href={"/pages-query"} className="text-xl font-bold">
            PostsPQ
          </Link>
        </div>

        <Link href={"/add-post"} className="text-xl font-bold">
          Add Post
        </Link>
      </div>
    </div>
  );
}
