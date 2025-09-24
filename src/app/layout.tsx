import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/widgets/Header";
import { LikeStoreProvider, QueryProvider } from "@/shared/providers";

export const metadata: Metadata = {
  title: "posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <QueryProvider>
          <LikeStoreProvider>
            <Header />
            {children}
          </LikeStoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
