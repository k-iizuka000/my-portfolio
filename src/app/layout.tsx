import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Software Engineer",
  description: "10年以上の開発経験を持つソフトウェアエンジニアのポートフォリオサイト。Java/Spring Boot、JavaScript、Python等の技術スタックでフルスタック開発を行っています。",
  keywords: ["ソフトウェアエンジニア", "フルスタック開発", "Java", "Spring Boot", "JavaScript", "Python", "ポートフォリオ"],
  authors: [{ name: "Software Engineer" }],
  creator: "Software Engineer",
  openGraph: {
    title: "Portfolio | Software Engineer",
    description: "10年以上の開発経験を持つソフトウェアエンジニアのポートフォリオサイト",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Software Engineer",
    description: "10年以上の開発経験を持つソフトウェアエンジニアのポートフォリオサイト",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
