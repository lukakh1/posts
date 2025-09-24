import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/widgets/Header";
import {
  HeroProvider,
  LikeStoreProvider,
  QueryProvider,
} from "@/shared/providers";

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
      <body className={`antialiased`}>
        <QueryProvider>
          <LikeStoreProvider>
            <HeroProvider>
              {postmodal}
              <Header />
              {children}
            </HeroProvider>
          </LikeStoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
