import { Logo } from "@/app/shared";
import { useTranslations } from "next-intl";
import { AuthButtons } from "./components";

export default function IqTestHeader() {
  const t = useTranslations("Header");

  return (
    <div className="w-full bg-slate-100 backdrop-blur-lg backdrop-saturate-150 border-b-1 shadow-small  fixed z-50">
      <div className="w-full h-16 max-w-7xl flex justify-between items-center mx-auto px-5 md:px-3 xl:px-0">
        <Logo />
        <AuthButtons />
      </div>
    </div>
  );
}
