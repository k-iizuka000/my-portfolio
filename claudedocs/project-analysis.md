# my-portfolio プロジェクト分析レポート

**調査日**: 2025-12-10
**調査方法**: 10個のExploreエージェントによる並列調査 + Ultrathink分析

---

## 1. プロジェクト概要

| 項目 | 値 |
|------|-----|
| **プロジェクト名** | my-portfolio |
| **フレームワーク** | Next.js 15.1.6 (App Router) |
| **UIライブラリ** | React 19.0.0 |
| **言語** | TypeScript 5 |
| **スタイリング** | Tailwind CSS 3.4.1 |
| **アニメーション** | Framer Motion 12.0.1 |
| **出力形式** | 静的エクスポート (SSG) |
| **デプロイ先** | GitHub Pages |
| **総コード行数** | 約28,000行 |

---

## 2. ディレクトリ構造

```
/Users/kei/work/my-portfolio/
├── .next/                           # 開発ビルドキャッシュ (100MB) ⚙️自動生成
├── node_modules/                    # npm依存パッケージ (411MB) ⚙️自動生成
├── out/                             # 静的エクスポート出力 (1.1MB) ⚙️自動生成
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # ルートレイアウト (43行)
│   │   ├── page.tsx                 # トップページ (6行)
│   │   ├── globals.css              # グローバルスタイル (151行)
│   │   └── favicon.ico
│   │
│   ├── components/                   # ★2025-12-10更新（4ファイルに整理）
│   │   ├── PortfolioWebsite.tsx     # メインコンポーネント (492行) ★重要
│   │   ├── LoadingSpinner.tsx       # ローディング (32行) ✅流用可
│   │   ├── ErrorMessage.tsx         # エラー表示 (39行) ✅流用可
│   │   └── ScrollTopButton.tsx      # スクロールボタン ✅流用可
│   │
│   ├── hooks/
│   │   ├── usePortfolioData.ts      # データ取得 (32行) ✅流用可
│   │   └── useScroll.ts             # スクロール検知 (50行) ✅流用可
│   │
│   └── types/
│       └── index.ts                 # 型定義 (109行) ✅流用可
│
├── public/
│   ├── data/
│   │   └── portfolio.json           # ポートフォリオデータ (8KB) ✅流用可
│   └── svg/                         # SVGアセット
│
├── .github/workflows/               # GitHub Actions
│   ├── deploy.yml                   # デプロイワークフロー
│   ├── claude.yml                   # Claude統合
│   └── claude-code-review.yml       # コードレビュー
│
└── 設定ファイル
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    └── eslint.config.mjs
```

---

## 3. コンポーネント分析

### 3.1 コンポーネント一覧と状態（2025-12-10更新）

| コンポーネント | 行数 | 状態 | 再利用性 | 備考 |
|--------------|------|------|---------|------|
| **PortfolioWebsite.tsx** | 492 | ✅使用中 | 2/10 | 全機能が統合されたモノリシック構造 |
| **LoadingSpinner.tsx** | 32 | ✅使用中 | 9/10 | 汎用ローディング表示 |
| **ErrorMessage.tsx** | 39 | ✅使用中 | 9/10 | 汎用エラー表示 |
| **ScrollTopButton.tsx** | - | ✅使用中 | 8/10 | 汎用UIコンポーネント |

### 3.2 削除済みコンポーネント（2025-12-10削除）

以下の8つのコンポーネントは未使用のため**削除済み**：

| コンポーネント | 削除理由 |
|--------------|---------|
| ~~Header.tsx~~ | PortfolioWebsiteにインライン実装 |
| ~~Navigation.tsx~~ | PortfolioWebsiteにインライン実装 |
| ~~Footer.tsx~~ | PortfolioWebsiteにインライン実装 |
| ~~sections/About.tsx~~ | PortfolioWebsiteにインライン実装 |
| ~~sections/Summary.tsx~~ | PortfolioWebsiteにインライン実装 |
| ~~sections/Skills.tsx~~ | PortfolioWebsiteにインライン実装 |
| ~~sections/Projects.tsx~~ | PortfolioWebsiteにインライン実装 |
| ~~sections/InProgress.tsx~~ | PortfolioWebsiteにインライン実装 |

---

## 4. スタイリング分析

### 4.1 使用技術

| 技術 | 用途 |
|------|------|
| **Tailwind CSS** | メインスタイリング（ユーティリティファースト） |
| **Framer Motion** | アニメーション（パララックス、フェードイン等） |
| **globals.css** | カスタムスタイル定義（151行） |

### 4.2 カスタムスタイルクラス

```css
/* 流用可能なカスタムクラス */
.glass-effect     /* グラスモーフィズム効果 */
.gradient-text    /* テキストグラデーション */
.card-hover       /* カードホバーエフェクト */
.btn-primary      /* プライマリボタン */
.btn-secondary    /* セカンダリボタン */
.section-padding  /* セクションパディング */
.container-max    /* 最大幅コンテナ */
.animate-float    /* 浮遊アニメーション */
.animate-glow     /* グローアニメーション */
```

### 4.3 テーマ不整合の問題

| コンポーネント | テーマ | 背景色 |
|--------------|--------|--------|
| PortfolioWebsite.tsx | ダーク | slate-950, slate-900 |
| LoadingSpinner.tsx | ダーク | slate-950 |
| ErrorMessage.tsx | ダーク | slate-950 |
| Navigation.tsx (未使用) | ライト | white |
| About.tsx (未使用) | ライト | white, gray |
| Skills.tsx (未使用) | ライト | gray-50 |
| Projects.tsx (未使用) | ライト | white |

**結論**: 未使用のセクションコンポーネントはライトテーマで実装されており、メインコンポーネントのダークテーマと不整合。

---

## 5. データ構造

### 5.1 portfolio.json スキーマ

```typescript
interface PortfolioData {
  about: {
    name: string;
    title: string;
    description: string;  // 改行を含むテキスト
  };
  summary: {
    totalExperience: string;  // "10年以上"
    highlights: string[];
    coreTechnologies: Array<{
      name: string;
      years: number;
      level: string;  // "エキスパート" 等
    }>;
  };
  skills: {
    frontend: string[];  // ["JavaScript", "Vue.js", "React", ...]
    backend: string[];   // ["Java", "Spring Boot", "Python", ...]
    other: string[];     // ["Git", "AWS", "Docker", ...]
  };
  projects: ProjectData[];      // 9件の完了プロジェクト
  inProgress: InProgressData[]; // 3件の進行中プロジェクト
}
```

### 5.2 データファイル

| ファイル | サイズ | 用途 |
|---------|--------|------|
| `public/data/portfolio.json` | 8KB | メインデータソース |

---

## 6. 状態管理

### 6.1 使用パターン

- **外部ライブラリ**: なし（Redux/Zustand/Recoil未使用）
- **React Hooks**: useState, useEffect, useRef
- **Framer Motion**: useScroll, useTransform

### 6.2 カスタムフック

| フック | 責務 | 流用可能性 |
|--------|------|-----------|
| `usePortfolioData` | JSONデータ取得、ローディング/エラー状態管理 | ✅高い |
| `useScroll` | スクロール位置追跡、セクション可視性検出 | ✅高い |

### 6.3 主要な状態

```typescript
// PortfolioWebsite.tsx内
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });  // 背景グラデーション用
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);     // モバイルメニュー
const { scrollYProgress } = useScroll();                              // スクロール進捗
```

---

## 7. 依存関係

### 7.1 本番依存

| パッケージ | バージョン | 用途 | 状態 |
|-----------|-----------|------|------|
| next | 15.1.6 | フレームワーク | ✅使用中 |
| react | ^19.0.0 | UIライブラリ | ✅使用中 |
| react-dom | ^19.0.0 | DOM操作 | ✅使用中 |
| framer-motion | ^12.0.1 | アニメーション | ✅使用中 |
| @heroicons/react | ^2.2.0 | アイコン | ✅使用中 |
| react-intersection-observer | ^9.15.1 | 可視性検出 | ❌未使用 |

### 7.2 開発依存

| パッケージ | バージョン | 用途 |
|-----------|-----------|------|
| typescript | ^5 | 型チェック |
| tailwindcss | ^3.4.1 | スタイリング |
| eslint | ^9 | リンター |
| postcss | ^8 | CSS処理 |

---

## 8. テスト状況

| 項目 | 状態 |
|------|------|
| テストフレームワーク | ❌なし |
| ユニットテスト | ❌0件 |
| 統合テスト | ❌0件 |
| E2Eテスト | ❌0件 |
| カバレッジ | 0% |

---

## 9. UI変更のための推奨事項

### 9.1 削除済みモジュール（2025-12-10実施）

以下のファイルは削除済みです：

```
src/components/
├── Header.tsx               ✅削除済
├── Navigation.tsx           ✅削除済
├── Footer.tsx               ✅削除済
└── sections/                ✅ディレクトリごと削除済
    ├── About.tsx
    ├── Summary.tsx
    ├── Skills.tsx
    ├── Projects.tsx
    └── InProgress.tsx
```

### 9.2 削除推奨（未実施）

```
package.json:
- react-intersection-observer  # 未使用パッケージ（docker環境内でnpm uninstall必要）
```

### 9.3 流用推奨（価値あるモジュール）

| モジュール | 理由 |
|-----------|------|
| `LoadingSpinner.tsx` | 汎用的なローディング表示、Framer Motionアニメーション付き |
| `ErrorMessage.tsx` | 汎用的なエラー表示、リロード機能付き |
| `ScrollTopButton.tsx` | 汎用的なスクロールボタン |
| `usePortfolioData.ts` | データ取得パターン（環境別パス対応） |
| `useScroll.ts` | スクロール検知ロジック |
| `types/index.ts` | 型定義（拡張可能） |
| `globals.css` | カスタムスタイル定義 |
| `portfolio.json` | データ構造（拡張可能） |

### 9.4 リファクタリング推奨

1. **PortfolioWebsite.tsx の分割**
   - 492行のモノリシックコンポーネントを小さなコンポーネントに分割
   - 各セクションを独立したコンポーネントとして再実装

2. **テーマの統一**
   - ダークテーマで統一（現在のメインテーマ）
   - または新しいデザインシステムを導入

3. **アニメーションの標準化**
   - Framer Motionのアニメーションパターンを標準化
   - 再利用可能なアニメーションコンポーネント作成

---

## 10. 技術スタック評価

### 強み
- ✅ 最新のNext.js 15.1.6 + React 19
- ✅ TypeScript strict mode
- ✅ Tailwind CSSによる効率的なスタイリング
- ✅ Framer Motionによる洗練されたアニメーション
- ✅ 静的エクスポートで高速配信
- ✅ GitHub Actions CI/CD

### 弱み
- ❌ テストなし（カバレッジ0%）
- ❌ 未使用コンポーネントが多い
- ❌ モノリシックな構造（PortfolioWebsite.tsx）
- ❌ テーマの不整合
- ❌ 未使用パッケージ（react-intersection-observer）

---

## 11. ファイルサイズ統計

| カテゴリ | ファイル数 | サイズ |
|---------|-----------|--------|
| TypeScript/TSX (src/) | 17 | ~28KB |
| グローバルCSS | 1 | ~4KB |
| データJSON | 1 | 8KB |
| 設定ファイル | 7 | ~3KB |
| node_modules | 326+ | 411MB |

---

## 12. 自動生成ディレクトリ

以下のディレクトリは**自動生成**されるため、削除しても再生成可能です。

| ディレクトリ | サイズ | 用途 | 削除可否 | 再生成方法 |
|------------|--------|------|---------|-----------|
| `.next/` | 100MB | 開発時ビルドキャッシュ | ✅削除可 | `npm run dev`で自動再生成 |
| `node_modules/` | 411MB | npm依存パッケージ | ✅削除可 | `npm install`で再生成 |
| `out/` | 1.1MB | 静的エクスポート出力 | ✅削除可 | `npm run build`で再生成 |

### 特徴

- **gitignore対象**: 3つとも`.gitignore`に含まれており、バージョン管理されていない
- **ソースコードではない**: 全て自動生成されるファイル群
- **合計サイズ**: 約512MB（削除でディスク容量解放可能）

### 削除コマンド（docker環境内で実行）

```bash
# キャッシュのみ削除（推奨）
rm -rf .next out

# 全削除（再インストール必要）
rm -rf .next out node_modules
npm install  # docker環境内で実行必須
```

**注意**: `node_modules`削除後は、docker環境内で`npm install`の実行が必要です。

---

## 13. 次のステップ

UI変更を行う場合、以下の手順を推奨：

1. **不要ファイルの削除**
   - 8つの未使用コンポーネント
   - react-intersection-observerパッケージ

2. **PortfolioWebsite.tsxの分割**
   - ナビゲーション、各セクション、フッターを独立コンポーネントに

3. **新しいデザインシステムの導入**
   - CLAUDE.mdに記載のデザインスタイルから選択
   - 一貫したテーマの適用

4. **流用可能なモジュールの活用**
   - LoadingSpinner, ErrorMessage, ScrollTopButton
   - カスタムフック、型定義

---

*このレポートは10個のExploreエージェントによる並列調査とUltrathink分析に基づいて作成されました。*
