import { LocaleSwitcher } from "@/app/features";
import { Link } from "@/pkg/libraries/locale";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <div className="w-full h-16 bg-gray-800 text-white flex">
      <div className="w-full max-w-7xl flex justify-between items-center mx-auto px-4">
        <div className="flex gap-x-3">
          <Link href={"/my-site"} className="text-xl font-bold">
            {t("home")}
          </Link>
          <Link href={"/my-site/pages-query"} className="text-xl font-bold">
            {t("pq")}
          </Link>
          <Link href={"/my-site/infinite-query"} className="text-xl font-bold">
            {t("iq")}
          </Link>
          <Link href={"/my-site/blogs"} className="text-xl font-bold">
            {t("blogs")}
          </Link>
        </div>

        <div className="flex gap-x-3 items-center">
          <LocaleSwitcher />
          <Link href={"/my-site/add-post"} className="text-xl font-bold">
            {t("add-post")}
          </Link>
          <Link href={"/my-site/add-blog"} className="text-xl font-bold">
            {t("add-blog")}
          </Link>
        </div>
      </div>
    </div>
  );
}
