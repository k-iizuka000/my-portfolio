'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lora, Noto_Sans_JP } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export default function BotanicalBrewTop() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const features = [
    {
      icon: '🌿',
      title: 'オーガニックコーヒー',
      description: '厳選された有機栽培豆を使用し、一杯ずつ丁寧に淹れるこだわりのコーヒー'
    },
    {
      icon: '🍰',
      title: '自家製スイーツ',
      description: '季節のフルーツと自然素材を使った、身体に優しい手作りスイーツ'
    },
    {
      icon: '🪴',
      title: '癒しの空間',
      description: '植物に囲まれた穏やかな時間が流れる、心安らぐプライベート空間'
    }
  ];

  return (
    <div className={`${lora.variable} ${notoSansJP.variable} min-h-screen bg-[#FDF8F3] text-[#2D5A45] font-sans`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Organic Blob Background */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 0,400 C 0,400 0,200 0,200 C 114.5,233.5 229,267 354,267 C 479,267 614.5,233.5 737,233 C 859.5,232.5 969,265 1097,265 C 1225,265 1371.5,232.5 1440,200 L 1440,800 L 0,800 Z"
            fill="#D4C4B0"
            fillOpacity="0.3"
            initial={{ d: "M 0,400 C 0,400 0,200 0,200 C 114.5,233.5 229,267 354,267 C 479,267 614.5,233.5 737,233 C 859.5,232.5 969,265 1097,265 C 1225,265 1371.5,232.5 1440,200 L 1440,800 L 0,800 Z" }}
            animate={{ d: "M 0,400 C 0,400 0,250 0,250 C 130,280 260,310 380,305 C 500,300 610,260 740,250 C 870,240 1010,260 1140,270 C 1270,280 1400,280 1440,250 L 1440,800 L 0,800 Z" }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" as const }}
          />
          <motion.path
            d="M 0,600 C 0,600 0,400 0,400 C 120,430 240,460 370,450 C 500,440 640,390 770,380 C 900,370 1020,400 1150,410 C 1280,420 1420,410 1440,400 L 1440,800 L 0,800 Z"
            fill="#8B7355"
            fillOpacity="0.2"
            initial={{ d: "M 0,600 C 0,600 0,400 0,400 C 120,430 240,460 370,450 C 500,440 640,390 770,380 C 900,370 1020,400 1150,410 C 1280,420 1420,410 1440,400 L 1440,800 L 0,800 Z" }}
            animate={{ d: "M 0,600 C 0,600 0,450 0,450 C 140,470 280,490 400,485 C 520,480 620,450 750,445 C 880,440 1000,460 1130,465 C 1260,470 1400,460 1440,450 L 1440,800 L 0,800 Z" }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" as const }}
          />
        </svg>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" as const }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-[#2D5A45]">
              BOTANICAL
              <br />
              BREW
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-[#8B7355] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            自然と共に、一杯の至福を
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/sampl_app/menu">
              <motion.button
                className="bg-[#2D5A45] text-[#FDF8F3] px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:bg-[#E07A5F] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                メニューを見る
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Concept Section */}
      <section className="py-24 px-4 bg-white/50">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          {...fadeInUp}
        >
          <div className="inline-block mb-6">
            <span className="text-6xl">🌱</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#2D5A45]">
            私たちのこだわり
          </h2>
          <p className="text-lg md:text-xl text-[#8B7355] leading-relaxed max-w-3xl mx-auto">
            BOTANICAL BREWは、自然の恵みを大切にしたカフェです。
            <br />
            オーガニックコーヒーと自家製スイーツ、そして植物に囲まれた空間で、
            <br />
            都会の喧騒を忘れ、心からリラックスできるひとときをお届けします。
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#2D5A45]"
            {...fadeInUp}
          >
            3つの特徴
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                {/* Decorative Blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4C4B0] opacity-20 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-[#2D5A45]">
                    {feature.title}
                  </h3>
                  <p className="text-[#8B7355] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Access Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FDF8F3] to-[#D4C4B0]/20">
        <motion.div
          className="max-w-4xl mx-auto"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#2D5A45]">
            アクセス
          </h2>

          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <div className="space-y-6 text-[#8B7355]">
              <div>
                <h3 className="text-xl font-bold text-[#2D5A45] mb-2">住所</h3>
                <p className="text-lg">〒150-0001 東京都渋谷区神宮前 5-10-15</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#2D5A45] mb-2">営業時間</h3>
                <p className="text-lg">10:00 - 20:00（ラストオーダー 19:30）</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#2D5A45] mb-2">定休日</h3>
                <p className="text-lg">水曜日</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#2D5A45] mb-2">アクセス</h3>
                <p className="text-lg">表参道駅より徒歩5分</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#2D5A45] text-[#FDF8F3]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">BOTANICAL BREW</h3>
              <p className="text-[#D4C4B0]">自然と共に、一杯の至福を</p>
            </div>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-3xl hover:text-[#E07A5F] transition-colors"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="#"
                className="text-3xl hover:text-[#E07A5F] transition-colors"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-3xl hover:text-[#E07A5F] transition-colors"
                aria-label="Facebook"
              >
                👍
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#D4C4B0]/30 text-center text-sm text-[#D4C4B0]">
            © 2025 BOTANICAL BREW. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
