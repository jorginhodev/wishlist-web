// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Header } from "@/components/header";
import { Metadata } from "next";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Wishlist app for your favorite products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>
        <Providers>
          <Header />
          <main className="h-screen w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
