import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/widgets/Header";
import QueryProvider from "@/shared/providers/query-provider";

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
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
