import { routing } from "@/features/i18n";
import {
  HeroProvider,
  LikeStoreProvider,
  QueryProvider,
} from "@/shared/providers";
import { Header } from "@/widgets/Header";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

export async function generateMetadata() {
  const t = await getTranslations("HomePage");

  return {
    title: t("title"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
  postmodal,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
  postmodal: React.ReactNode;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen`}>
        <NextIntlClientProvider>
          <QueryProvider>
            <LikeStoreProvider>
              <HeroProvider>
                {postmodal}
                <Header />
                <div className="max-w-7xl mx-auto w-full h-full">
                  {children}
                </div>
              </HeroProvider>
            </LikeStoreProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
