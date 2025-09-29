import {
  HeroProvider,
  LikeStoreProvider,
  QueryProvider,
} from "@/shared/providers";
import { Header } from "@/widgets/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "posts",
};

export default function RootLayout({
  children,
  postmodal,
}: Readonly<{
  children: React.ReactNode;
  postmodal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen`}>
        <QueryProvider>
          <LikeStoreProvider>
            <HeroProvider>
              {postmodal}
              <Header />
              <div className="max-w-7xl mx-auto w-full h-full">{children}</div>
            </HeroProvider>
          </LikeStoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
