import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "포켓몬 도감",
  description: "포켓몬을 검색하세요!!!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
