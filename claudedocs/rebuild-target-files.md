# ポートフォリオサイト 作り替え対象ファイル一覧

**作成日**: 2025-12-11
**目的**: 新デザインでの完全作り替え

---

## 修正禁止ディレクトリ

以下は**絶対に触らない**：

| ディレクトリ | 理由 |
|-------------|------|
| `src/app/chatbot/` | 別機能（チャットボット） |
| `src/app/sampl_app/` | 別機能（サンプルアプリ） |

---

## 1. 削除対象（ポートフォリオ関連は全削除）

**方針**: クリーンな状態から新規作成する。流用ファイルなし。

### 1.1 メインコンポーネント

| ファイル | 行数 | 削除理由 |
|---------|------|---------|
| `src/components/PortfolioWebsite.tsx` | 492行 | モノリシック、過剰な機能 |

**削除対象の過剰機能**：
- マウス追従グラデーション背景
- 20個の浮遊エレメントアニメーション
- パララックス効果
- スクロール進捗バー
- 各セクションのフェードインアニメーション（多数）

### 1.2 ユーティリティコンポーネント（全削除）

| ファイル | 行数 | 削除理由 |
|---------|------|---------|
| `src/components/LoadingSpinner.tsx` | 32行 | ポートフォリオ関連のため削除 |
| `src/components/ErrorMessage.tsx` | 39行 | ポートフォリオ関連のため削除 |
| `src/components/ScrollTopButton.tsx` | - | ポートフォリオ関連のため削除 |

### 1.3 カスタムフック（全削除）

| ファイル | 行数 | 削除理由 |
|---------|------|---------|
| `src/hooks/usePortfolioData.ts` | 32行 | ポートフォリオデータ取得フック |
| `src/hooks/useScroll.ts` | 50行 | スクロール検知フック |

### 1.4 型定義（全削除）

| ファイル | 行数 | 削除理由 |
|---------|------|---------|
| `src/types/index.ts` | 109行 | ポートフォリオ型定義のため削除 |

### 1.5 スタイル

| ファイル | 行数 | 対応 |
|---------|------|------|
| `src/app/globals.css` | 153行 | **完全書き換え** |

**書き換え内容**：
- nes.cssインポート削除
- ダークテーマ固定のbase設定削除 or 新テーマに切り替え
- 過剰なカスタムアニメーション削除（float, glow）
- 複雑なグラデーション背景クラス削除
- 新デザインに必要な最小限のスタイルのみ定義

---

## 2. 変更対象

### 2.1 エントリーポイント

| ファイル | 行数 | 内容 | 対応 |
|---------|------|------|------|
| `src/app/page.tsx` | 6行 | PortfolioWebsiteを呼び出し | **新コンポーネントに差し替え** |

```tsx
// 現在
import PortfolioWebsite from '../components/PortfolioWebsite';
export default function Home() {
  return <PortfolioWebsite />;
}
```

### 2.2 レイアウト

| ファイル | 行数 | 内容 | 対応 |
|---------|------|------|------|
| `src/app/layout.tsx` | 44行 | メタデータ、フォント、テーマ | **テーマ設定を見直し** |

**変更点**：
- `bg-slate-950` → 新テーマの背景色
- メタデータは維持可能

---

## 3. データファイル

| ファイル | サイズ | 内容 | 対応 |
|---------|--------|------|------|
| `public/data/portfolio.json` | 8KB | ポートフォリオデータ | **維持 or 直接埋め込み** |

**データ構造**：
```typescript
{
  about: { title, description }
  skills: { frontend[], backend[], other[] }
  summary: { totalExperience, highlights[], coreTechnologies[] }
  projects: ProjectData[]      // 9件
  inProgress: InProgressData[] // 3件
}
```

**選択肢**：
- A. JSON維持 → fetch で取得（現状）
- B. 直接埋め込み → ビルド時に静的化（シンプル）

---

## 4. 設定ファイル（変更不要）

| ファイル | 対応 |
|---------|------|
| `next.config.js` | 変更不要 |
| `tailwind.config.ts` | テーマ拡張時のみ変更 |
| `tsconfig.json` | 変更不要 |
| `package.json` | 不要パッケージ削除のみ |

---

## 5. 削除候補パッケージ

```bash
# 未使用パッケージ
docker compose exec app npm uninstall react-intersection-observer

# Framer Motion（新デザイン次第）
# シンプルにするなら削除検討
docker compose exec app npm uninstall framer-motion
```

---

## 6. 作り替え後の想定構成

**方針**: ポートフォリオ関連ファイルは全削除。新規作成時は流用ファイルなし。

```
src/
├── app/
│   ├── page.tsx          # 新コンポーネント呼び出し
│   ├── layout.tsx        # テーマ設定更新
│   ├── globals.css       # 新デザイン用スタイル（最小限）
│   ├── chatbot/          # 修正禁止
│   └── sampl_app/        # 修正禁止
│
├── components/
│   └── Portfolio.tsx     # 新メインコンポーネント（新規作成）
│
└── hooks/                # ポートフォリオ関連は削除
    # 必要に応じて新規作成
```

---

## 7. 次のステップ

1. **デザイン決定** → design-specialistスキルで相談
2. **データ方式決定** → JSON維持 or 直接埋め込み
3. **実装** → ゼロから新規作成（流用ファイルなし）

---

## ファイル一覧サマリ

| 対応 | ファイル数 | ファイル |
|------|-----------|---------|
| **削除** | 7 | PortfolioWebsite.tsx, LoadingSpinner.tsx, ErrorMessage.tsx, ScrollTopButton.tsx, usePortfolioData.ts, useScroll.ts, types/index.ts |
| **書き換え** | 1 | globals.css |
| **変更** | 2 | page.tsx, layout.tsx |
| **維持/検討** | 1 | portfolio.json |
| **修正禁止** | 7 | chatbot/*, sampl_app/* |

---

## 削除ファイルの実行手順

```bash
# Docker環境でファイル削除
docker compose exec app rm -f src/components/PortfolioWebsite.tsx
docker compose exec app rm -f src/components/LoadingSpinner.tsx
docker compose exec app rm -f src/components/ErrorMessage.tsx
docker compose exec app rm -f src/components/ScrollTopButton.tsx
docker compose exec app rm -f src/hooks/usePortfolioData.ts
docker compose exec app rm -f src/hooks/useScroll.ts
docker compose exec app rm -f src/types/index.ts

# ディレクトリ削除（空になった場合）
docker compose exec app rmdir src/hooks src/types 2>/dev/null || true
```
