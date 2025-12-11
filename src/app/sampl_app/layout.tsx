import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BOTANICAL BREW | 自然と共に、一杯の至福を",
  description:
    "オーガニックコーヒーと自家製スイーツ、植物に囲まれた空間で心からリラックスできるカフェ。表参道駅より徒歩5分。",
  keywords: [
    "カフェ",
    "オーガニックコーヒー",
    "表参道",
    "ボタニカル",
    "自家製スイーツ",
  ],
  openGraph: {
    title: "BOTANICAL BREW | 自然と共に、一杯の至福を",
    description:
      "オーガニックコーヒーと自家製スイーツ、植物に囲まれた空間で心からリラックスできるカフェ",
    type: "website",
    locale: "ja_JP",
  },
};

export default function CafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
