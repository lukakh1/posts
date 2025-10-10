"use client";

import { usePathname, useRouter } from "@/pkg/libraries/locale";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (locale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">{t("label")}:</label>
      <select
        value={pathname.split("/")[1] || "en"}
        onChange={(e) => handleLocaleChange(e.target.value)}
        disabled={isPending}
        className="px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm"
      >
        <option value="en">🇺🇸 English</option>
        <option value="ru">🇷🇺 Russian</option>
      </select>
    </div>
  );
}

