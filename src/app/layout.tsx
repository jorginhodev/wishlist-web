import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Wishlist de produtos",
};

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.className} antialiased`}>{children}</body>
    </html>
  );
}
