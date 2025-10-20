import { LikeStoreProvider } from "@/app/shared/providers";
import { envServer } from "@/config/env";
import "@/config/styles/global.css";
import { routing } from "@/pkg/libraries/locale";
import { getQueryClient, RestApiProvider } from "@/pkg/libraries/rest-api";
import { ScanComponent } from "@/pkg/libraries/scan";
import { UiProvider } from "@/pkg/libraries/ui";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import { getLangDir } from "rtl-detect";

interface IProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
  postmodal?: ReactNode;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations("HomePage");

  return {
    title: t("title"),
  };
}

const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params, postmodal } = props;

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const direction = getLangDir(locale);

  const clientQuery = getQueryClient();
  // await clientQuery.prefetchQuery(layoutQueryOptions({ locale }));
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      {envServer.NODE_ENV !== "production" && <ScanComponent />}

      <body className={`antialiased min-h-screen`}>
        <NextIntlClientProvider>
          <UiProvider>
            <RestApiProvider>
              <HydrationBoundary state={dehydrate(clientQuery)}>
                <LikeStoreProvider>
                  {postmodal && postmodal}
                  {children}
                </LikeStoreProvider>
              </HydrationBoundary>
            </RestApiProvider>
          </UiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
