import { useLocale, useTranslations } from "next-intl";
import { routing } from "../routing";
import LocaleSwitcherSelect from "./locale-switcher-select";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <option className="font-bold" key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
