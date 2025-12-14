'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Lora, Noto_Sans_JP } from 'next/font/google';
import { withBasePath } from '@/lib/basePath';

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

// ドリンクメニュー
const drinkMenu = [
  { name: 'オーガニックエスプレッソ', price: 420, emoji: '☕', description: '深煎り豆を使用した濃厚な味わい' },
  { name: 'ボタニカルラテ', price: 520, emoji: '🌿', description: 'ハーブとミルクの調和' },
  { name: 'カプチーノ', price: 480, emoji: '☕', description: 'クリーミーなフォームミルク' },
  { name: 'アイスドリップコーヒー', price: 550, emoji: '🧊', description: '12時間かけて抽出' },
  { name: 'カモミールティー', price: 450, emoji: '🌼', description: 'リラックス効果抜群' },
  { name: 'ルイボスティー', price: 450, emoji: '🍂', description: 'カフェインフリー' },
  { name: 'フレッシュレモネード', price: 500, emoji: '🍋', description: '自家製シロップ使用' },
  { name: 'ジンジャーハニー', price: 520, emoji: '🍯', description: '体を温める優しい味' },
];

// フードメニュー
const foodMenu = [
  { name: 'バスクチーズケーキ', price: 620, emoji: '🍰', description: 'しっとり濃厚な食感' },
  { name: 'アップルタルト', price: 650, emoji: '🍎', description: '季節のリンゴを使用' },
  { name: 'ベイクドチョコレート', price: 600, emoji: '🍫', description: 'ビターな大人の味' },
  { name: 'キャロットケーキ', price: 580, emoji: '🥕', description: 'スパイス香る素朴な味' },
  { name: 'クロックムッシュ', price: 780, emoji: '🥪', description: '自家製ベシャメルソース' },
  { name: 'グリーンサラダプレート', price: 850, emoji: '🥗', description: 'オーガニック野菜たっぷり' },
  { name: 'キッシュ', price: 820, emoji: '🥧', description: '季節野菜とチーズ' },
];

// アニメーション設定
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function MenuPage() {
  return (
    <div className={`${lora.variable} ${notoSansJP.variable} min-h-screen font-sans`} style={{ backgroundColor: '#FDF8F3' }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(253, 248, 243, 0.9)', borderColor: '#D4C4B0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={withBasePath('/sampl_app')} className="flex items-center gap-2 text-lg font-medium transition-all duration-300 hover:scale-105" style={{ color: '#2D5A45' }}>
            <span>←</span>
            <span>TOP</span>
          </Link>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl sm:text-3xl font-bold tracking-wider"
            style={{ color: '#2D5A45' }}
          >
            MENU
          </motion.h1>
          <div className="w-16" /> {/* スペーサー */}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* ドリンクセクション */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#2D5A45' }}>
              Drinks
            </h2>
            <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#E07A5F' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {drinkMenu.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid #D4C4B0',
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{item.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold" style={{ color: '#2D5A45' }}>
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold whitespace-nowrap ml-2" style={{ color: '#E07A5F' }}>
                        ¥{item.price}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: '#8B7355' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* フードセクション */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#2D5A45' }}>
              Food
            </h2>
            <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#E07A5F' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {foodMenu.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid #D4C4B0',
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{item.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold" style={{ color: '#2D5A45' }}>
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold whitespace-nowrap ml-2" style={{ color: '#E07A5F' }}>
                        ¥{item.price}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: '#8B7355' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 装飾的な要素 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-8 rounded-full" style={{ backgroundColor: 'rgba(212, 196, 176, 0.3)' }}>
            <p className="text-2xl sm:text-3xl" style={{ color: '#2D5A45' }}>
              🌿 ☕ 🍃
            </p>
          </div>
        </motion.div>
      </main>

      {/* フッター */}
      <footer className="border-t py-12" style={{ borderColor: '#D4C4B0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={withBasePath('/sampl_app')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-md"
              style={{
                backgroundColor: '#2D5A45',
                color: '#FDF8F3',
              }}
            >
              <span>←</span>
              <span>TOP へ戻る</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 text-sm"
            style={{ color: '#8B7355' }}
          >
            <p>BOTANICAL BREW</p>
            <p className="mt-1">© 2024 All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
