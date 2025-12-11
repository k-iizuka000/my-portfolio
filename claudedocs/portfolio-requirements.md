# エンジニアポートフォリオサイト 要件定義書

**Document Type**: 要件定義書（L2デザインドキュメント）
**Status**: Draft
**Owner**: kei
**Created**: 2025-12-11
**Last-Reviewed**: 2025-12-11

---

## 1. プロジェクト概要

### 1.1 背景・目的

エンジニアとしての技術力をアピールするポートフォリオサイトを構築する。SNSや名刺にリンクを掲載し、技術スキルと実装力を視覚的に示すことで、採用担当者や関係者に印象を与えることを目的とする。

### 1.2 ターゲットユーザー

| ユーザー層 | 主な目的 | 期待する情報 |
|-----------|---------|------------|
| 採用担当者 | スキル確認、技術レベル評価 | 技術スタック、経験年数、プロジェクト実績 |
| エンジニア | 技術的興味、協業可能性 | 使用技術、コード品質、設計思想 |
| ビジネス関係者 | 業務委託、プロジェクト相談 | 実績、専門領域、コンタクト方法 |

### 1.3 成功指標

| 指標 | 目標値 | 測定方法 |
|------|--------|---------|
| 初回表示速度（LCP） | 2.5秒以内 | Lighthouse測定 |
| アクセシビリティスコア | 90点以上 | Lighthouse測定 |
| モバイル対応率 | 100% | レスポンシブ確認 |
| GitHubリンククリック率 | 訪問者の30%以上 | アナリティクス |
| 滞在時間 | 平均2分以上 | アナリティクス |

---

## 2. 機能要件

### 2.1 必須セクション・機能

#### 2.1.1 ヒーローセクション（#hero）

| 要素 | 内容 | 優先度 |
|------|------|--------|
| 自己紹介 | 名前、役割（エンジニア種別）、キャッチコピー | P0 |
| 背景エフェクト | マウス追従グラデーション、アニメーション | P0 |
| CTA | 「プロジェクトを見る」「コンタクト」ボタン | P0 |
| スクロールインジケーター | 下へのスクロール誘導 | P1 |

**実装例**:
```
名前: kei
役割: Full Stack Engineer / Frontend Specialist
キャッチコピー: 「技術で課題を解決し、ユーザー体験を向上させる」
```

#### 2.1.2 自己紹介セクション（#about）

| 要素 | 内容 | 優先度 |
|------|------|--------|
| 簡単な経歴 | 経験年数、主な専門領域 | P0 |
| コアバリュー | 技術に対する姿勢、強み | P0 |
| プロフィール画像 | アバター、もしくはシンボル | P1 |
| SNSリンク | GitHub, Twitter, LinkedIn等 | P0 |

**データ構造**:
```json
{
  "about": {
    "name": "kei",
    "title": "Full Stack Engineer",
    "description": "10年以上のソフトウェア開発経験...",
    "socialLinks": [
      { "platform": "github", "url": "https://github.com/..." },
      { "platform": "twitter", "url": "https://twitter.com/..." }
    ]
  }
}
```

#### 2.1.3 スキルセクション（#skills）

| 要素 | 内容 | 優先度 |
|------|------|--------|
| 技術スタック一覧 | Frontend/Backend/その他に分類 | P0 |
| 経験年数表示 | 各技術の習熟度可視化 | P1 |
| ビジュアライゼーション | レーダーチャート、スキルバー | P1 |

**データ構造**:
```typescript
interface SkillData {
  frontend: string[];
  backend: string[];
  other: string[];
  core?: Array<{
    name: string;
    years: number;
    level: "初級" | "中級" | "上級" | "エキスパート";
  }>;
}
```

#### 2.1.4 プロジェクトセクション（#projects）

| 要素 | 内容 | 優先度 |
|------|------|--------|
| プロジェクト一覧 | カード形式で表示 | P0 |
| 既存アプリ統合 | BOTANICAL BREW、KEI-bot Chatbot | P0 |
| プロジェクト詳細 | 技術スタック、概要、リンク | P0 |
| フィルタリング | 技術別、カテゴリ別 | P2 |

**プロジェクトカード要素**:
- サムネイル画像
- プロジェクト名
- 簡単な説明（1-2行）
- 使用技術タグ
- デモリンク、GitHubリンク
- 3D Tiltエフェクト（ホバー時）

**既存アプリの統合方法**:

| アプリ | パス | 統合方法 |
|------|------|---------|
| BOTANICAL BREW | `/sampl_app` | カード内にiframeプレビュー、またはスクリーンショット |
| KEI-bot Chatbot | `/chatbot` | カード内にiframeプレビュー、またはスクリーンショット |

#### 2.1.5 コンタクトセクション（#contact）

| 要素 | 内容 | 優先度 |
|------|------|--------|
| コンタクトフォーム | 名前、メール、メッセージ | P1 |
| SNSリンク | GitHub, Twitter, LinkedIn | P0 |
| メールアドレス | クリップボードコピー機能 | P0 |
| レスポンス時間表記 | 「24時間以内に返信」等 | P2 |

### 2.2 あると良いセクション・機能

| セクション | 説明 | 優先度 |
|-----------|------|--------|
| ブログセクション | 技術記事へのリンク（外部ブログ連携） | P2 |
| 経歴タイムライン | 職歴、学歴の時系列表示 | P2 |
| テスティモニアル | 協業者、クライアントからの推薦 | P3 |
| ダークモード切り替え | ライト/ダークテーマ切り替えボタン | P1 |
| 多言語対応 | 英語/日本語切り替え | P3 |

### 2.3 ナビゲーション要件

| 要素 | 仕様 | 優先度 |
|------|------|--------|
| フローティングナビ | スクロール方向検知、自動表示/非表示 | P0 |
| セクションハイライト | 現在位置のセクションを強調表示 | P0 |
| スムーススクロール | セクション間のアニメーション遷移 | P0 |
| スクロール進捗バー | ページ上部に進捗表示 | P1 |
| モバイルメニュー | ハンバーガーメニュー＋フルスクリーンオーバーレイ | P0 |

---

## 3. 非機能要件

### 3.1 パフォーマンス要件

| 指標 | 目標値 | 理由 |
|------|--------|------|
| LCP（Largest Contentful Paint） | <2.5秒 | Core Web Vitals基準 |
| FID（First Input Delay） | <100ms | Core Web Vitals基準 |
| CLS（Cumulative Layout Shift） | <0.1 | Core Web Vitals基準 |
| TTFB（Time to First Byte） | <600ms | 初回表示速度確保 |
| バンドルサイズ | 初回JS <200KB | モバイル回線での高速表示 |

**実装方針**:
- 画像最適化（WebP、遅延ロード）
- コード分割（Dynamic Import）
- Framer Motionの最適化（useReducedMotion対応）
- フォント最適化（FOUT対策）

### 3.2 アクセシビリティ要件（WCAG 2.1 AA準拠）

| 項目 | 要件 | 実装方法 |
|------|------|---------|
| セマンティックHTML | 適切なHTMLタグ使用 | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` |
| キーボード操作 | すべての機能がキーボードで操作可能 | Tab順序、Enter/Space対応 |
| 色コントラスト | 4.5:1以上（通常テキスト） | ダークテーマで白/グレー配色調整 |
| スクリーンリーダー | ARIA属性、alt属性 | `aria-label`, `aria-describedby`, `role` |
| フォーカス表示 | 明確なフォーカスリング | `outline`、`:focus-visible` |
| アニメーション制御 | prefers-reduced-motion対応 | Framer Motionの条件分岐 |

**実装例**:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  // アニメーション無効化対応
  style={{
    animation: prefersReducedMotion ? 'none' : undefined
  }}
>
```

### 3.3 セキュリティ要件

| 項目 | 要件 | 実装方法 |
|------|------|---------|
| XSS対策 | ユーザー入力のサニタイズ | Reactのデフォルトエスケープ |
| HTTPS | すべての通信を暗号化 | GitHub Pages標準対応 |
| CSP | Content Security Policy設定 | next.config.jsにヘッダー設定 |
| 個人情報保護 | メールアドレスのスクレイピング対策 | クリップボードコピー方式 |

### 3.4 SEO要件

| 項目 | 要件 | 実装方法 |
|------|------|---------|
| メタタグ | title, description, OGP | `<head>`内に設定 |
| 構造化データ | JSON-LD（Person, WebSite） | script type="application/ld+json" |
| sitemap.xml | サイトマップ生成 | 静的エクスポート時に生成 |
| robots.txt | クローラー制御 | public/robots.txt |
| パンくずリスト | 階層構造の明示 | 該当なし（シングルページ） |

---

## 4. デザイン要件

### 4.1 推奨デザインスタイル（選択肢）

以下のデザインスタイルから選択可能です。エンジニアポートフォリオに適するスタイルを優先順位順に提示します。

#### スタイル1: Glassmorphism（推奨度: ★★★★★）

| 特徴 | 実装詳細 |
|------|---------|
| **コンセプト** | モダン・先進的・透明感 |
| **背景** | グラデーションメッシュ（3-5色のブラー背景） |
| **カード** | 透明度20-80%、backdrop-blur-md/lg |
| **ボーダー** | 微細な白/半透明ボーダー |
| **カラー** | 青/紫/ピンクのグラデーション + 白アクセント |

**実装例**:
```tsx
className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
```

**メリット**:
- 技術力の高さを印象付ける
- 既存のダークテーマと親和性が高い
- Framer Motionとの相性良好

#### スタイル2: Dark OLED Luxury（推奨度: ★★★★☆）

| 特徴 | 実装詳細 |
|------|---------|
| **コンセプト** | 高級感・プロフェッショナル |
| **背景** | 純粋な黒（#000000） |
| **カード** | 濃いグレー（#0a0a0a - #1a1a1a） |
| **アクセント** | ゴールド（#D4AF37）、シルバー（#C0C0C0） |
| **タイポグラフィ** | エレガントなセリフ体（見出し） |

**実装例**:
```tsx
className="bg-black text-white border-l-4 border-yellow-600"
```

**メリット**:
- OLED画面で省電力
- 高コントラストで視認性良好
- ラグジュアリーな印象

#### スタイル3: Aurora Mesh Gradient（推奨度: ★★★★☆）

| 特徴 | 実装詳細 |
|------|---------|
| **コンセプト** | 幻想的・先進的・アート性 |
| **背景** | 3-5色のメッシュグラデーション |
| **アニメーション** | 緩やかな色変化、動的背景 |
| **ブラー** | 大きなblur効果（blur-3xl） |

**実装例**:
```tsx
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 opacity-20 blur-3xl animate-pulse" />
  <div className="relative z-10">{content}</div>
</div>
```

**メリット**:
- 印象に残る独自性
- クリエイティブな技術力をアピール

#### スタイル4: Retro Futurism Cyberpunk（推奨度: ★★★☆☆）

| 特徴 | 実装詳細 |
|------|---------|
| **コンセプト** | テック・ゲーム系・エッジ |
| **カラー** | ネオンピンク（#FF006E）、シアン（#00F5FF）、パープル（#8338EC） |
| **エフェクト** | グロー、text-shadow |
| **背景** | グリッド背景、スキャンライン |

**実装例**:
```tsx
className="text-cyan-400 font-mono drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]"
```

**メリット**:
- 個性的、技術マニアックな印象
- ゲーム開発者、Web3系に適合

#### スタイル5: Swiss Minimalism（推奨度: ★★★☆☆）

| 特徴 | 実装詳細 |
|------|---------|
| **コンセプト** | プロフェッショナル・シンプル |
| **カラー** | 2-3色以内（黒/白/赤アクセント） |
| **レイアウト** | 厳格なグリッド |
| **余白** | 大きな余白、タイトな行間 |

**実装例**:
```tsx
className="font-sans text-4xl font-bold leading-none tracking-tight"
```

**メリット**:
- 洗練された印象
- 内容重視、情報設計がクリア

### 4.2 カラーパレット候補

#### パレット1: Glassmorphism向け

```
背景ベース:      #0F172A (slate-950)
グラデーション1: #6366F1 (indigo-500)
グラデーション2: #8B5CF6 (violet-500)
グラデーション3: #EC4899 (pink-500)
テキスト主:      #F8FAFC (slate-50)
テキスト副:      #CBD5E1 (slate-300)
アクセント:      #3B82F6 (blue-500)
```

#### パレット2: Dark OLED向け

```
背景:      #000000 (black)
カード:    #0A0A0A
テキスト:  #FFFFFF
アクセント: #D4AF37 (gold)
セカンダリ: #C0C0C0 (silver)
```

#### パレット3: Aurora向け

```
背景ベース:  #0A0A0F
メッシュ1:   #7C3AED (purple-600)
メッシュ2:   #EC4899 (pink-600)
メッシュ3:   #3B82F6 (blue-600)
テキスト:    #FFFFFF
```

### 4.3 タイポグラフィ候補

| 用途 | フォント候補 | 備考 |
|------|-------------|------|
| 見出し（H1-H2） | Inter Bold, Poppins Bold | 視認性重視 |
| 本文 | Inter Regular, Roboto | 可読性重視 |
| コード | JetBrains Mono, Fira Code | 技術情報表示 |
| 装飾見出し | Space Grotesk, Orbitron | 未来的な印象 |

**実装方針**:
```tsx
// tailwind.config.ts
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
  display: ['Space Grotesk', 'sans-serif']
}
```

### 4.4 アニメーション指針

| アニメーション種別 | 用途 | 実装ツール | 注意点 |
|------------------|------|-----------|--------|
| フェードイン | セクション表示 | Framer Motion | 200-300ms |
| スライドイン | カード出現 | Framer Motion | 400-500ms |
| パララックス | 背景、要素 | Framer Motion useScroll | 控えめに |
| ホバーエフェクト | カード、ボタン | Tailwind transition | 即座に反応 |
| スクロール連動 | 進捗バー、要素移動 | Framer Motion useTransform | 60fps維持 |
| タイプライター | ヒーローテキスト | カスタム実装 | 50-100ms/文字 |

**Framer Motion設定例**:
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

**prefers-reduced-motion対応**:
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
/>
```

---

## 5. 技術要件

### 5.1 技術スタック

| カテゴリ | 技術 | バージョン | 理由 |
|---------|------|-----------|------|
| フレームワーク | Next.js | 15.1.6 | App Router、SSG対応 |
| UIライブラリ | React | 19.0.0 | 最新安定版 |
| 言語 | TypeScript | 5 | 型安全性 |
| スタイリング | Tailwind CSS | 3.4.1 | ユーティリティファースト |
| アニメーション | Framer Motion | 12.0.1 | 宣言的アニメーション |
| アイコン | @heroicons/react | 2.2.0 | SVGアイコン |
| フォーム | React Hook Form | - | （必要に応じて追加） |
| バリデーション | Zod | - | （必要に応じて追加） |

### 5.2 アーキテクチャ

#### 5.2.1 全体構成

```
[ブラウザ]
    ↓
[GitHub Pages (静的HTML/JS/CSS)]
    ↑
[Next.js Static Export]
    ↑
[Docker開発環境]
```

#### 5.2.2 レンダリング戦略

- **SSG（Static Site Generation）**: すべてのページを静的生成
- **ISR（Incremental Static Regeneration）**: 不使用（GitHub Pages制約）
- **CSR（Client Side Rendering）**: アニメーション、インタラクション

### 5.3 ディレクトリ構造案

```
src/
├── app/
│   ├── layout.tsx                # ルートレイアウト
│   ├── page.tsx                  # トップページ（シングルページ）
│   ├── globals.css               # グローバルスタイル
│   ├── sampl_app/                # BOTANICAL BREW（既存）
│   └── chatbot/                  # KEI-bot Chatbot（既存）
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # ヘッダー・ナビゲーション
│   │   ├── Footer.tsx            # フッター
│   │   └── ScrollProgress.tsx   # スクロール進捗バー
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx       # ヒーローセクション
│   │   ├── AboutSection.tsx      # 自己紹介セクション
│   │   ├── SkillsSection.tsx     # スキルセクション
│   │   ├── ProjectsSection.tsx   # プロジェクトセクション
│   │   └── ContactSection.tsx    # コンタクトセクション
│   │
│   ├── ui/
│   │   ├── ProjectCard.tsx       # プロジェクトカード
│   │   ├── SkillBadge.tsx        # スキルバッジ
│   │   ├── Button.tsx            # ボタンコンポーネント
│   │   └── GlassCard.tsx         # グラスモーフィズムカード
│   │
│   ├── common/
│   │   ├── LoadingSpinner.tsx    # ローディング（既存流用）
│   │   ├── ErrorMessage.tsx      # エラー表示（既存流用）
│   │   └── ScrollTopButton.tsx   # トップへ戻るボタン（既存流用）
│   │
│   └── effects/
│       ├── BackgroundGradient.tsx # 背景グラデーションエフェクト
│       └── MouseFollowEffect.tsx  # マウス追従エフェクト
│
├── hooks/
│   ├── usePortfolioData.ts       # データ取得（既存流用）
│   ├── useScroll.ts              # スクロール検知（既存流用）
│   ├── useInView.ts              # 要素可視性検知
│   └── useTheme.ts               # テーマ切り替え（ダークモード）
│
├── types/
│   └── index.ts                  # 型定義（既存拡張）
│
├── data/
│   └── portfolio.json            # ポートフォリオデータ（既存拡張）
│
└── lib/
    ├── analytics.ts              # アナリティクス連携
    └── utils.ts                  # ユーティリティ関数
```

### 5.4 データ構造設計

#### portfolio.json拡張版

```typescript
interface PortfolioData {
  // 基本情報
  about: {
    name: string;
    title: string;
    tagline: string;              // 新規: キャッチコピー
    description: string;
    email?: string;               // 新規
    location?: string;            // 新規: "東京, 日本"
    socialLinks: Array<{          // 新規
      platform: "github" | "twitter" | "linkedin" | "qiita" | "zenn";
      url: string;
      username: string;
    }>;
  };

  // スキル
  skills: {
    frontend: string[];
    backend: string[];
    other: string[];
    core?: Array<{
      name: string;
      years: number;
      level: "初級" | "中級" | "上級" | "エキスパート";
      icon?: string;              // 新規: アイコンURL
    }>;
  };

  // プロジェクト
  projects: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;            // 新規: サムネイル画像
    tags: string[];
    technologies: string[];
    demoUrl?: string;
    githubUrl?: string;
    featured: boolean;            // 新規: 注目プロジェクト
    type: "web" | "mobile" | "cli" | "library";  // 新規
  }>;

  // 既存アプリ統合
  internalApps: Array<{           // 新規
    id: string;
    name: string;
    path: string;                 // "/sampl_app", "/chatbot"
    description: string;
    thumbnail: string;
    tags: string[];
  }>;
}
```

---

## 6. コンテンツ要件

### 6.1 必要なコンテンツ一覧

| コンテンツ | 形式 | 数量 | 準備方法 |
|-----------|------|------|---------|
| プロフィール写真 | PNG/JPG | 1枚 | ユーザー提供 or アバター生成 |
| キャッチコピー | テキスト | 1つ | ユーザー提供 |
| 自己紹介文 | テキスト | 100-200文字 | ユーザー提供 |
| スキル一覧 | JSON | - | 既存データ拡張 |
| プロジェクトサムネイル | PNG/JPG | 各プロジェクト | スクリーンショット or デザイン作成 |
| SNSリンク | URL | 3-5個 | ユーザー提供 |

### 6.2 既存アプリの統合方法

#### BOTANICAL BREW（`/sampl_app`）

| 項目 | 内容 |
|------|------|
| **プロジェクトカード** | プロジェクトセクション内に配置 |
| **サムネイル** | `/sampl_app`のスクリーンショットを撮影 |
| **説明** | "オーガニックカフェのランディングページ。ボタニカルデザインとアニメーション背景が特徴。" |
| **技術タグ** | Next.js, React, TypeScript, Framer Motion, Tailwind CSS |
| **リンク** | デモ: `/sampl_app`, GitHub: （該当リポジトリ） |

#### KEI-bot Chatbot（`/chatbot`）

| 項目 | 内容 |
|------|------|
| **プロジェクトカード** | プロジェクトセクション内に配置 |
| **サムネイル** | `/chatbot`のスクリーンショットを撮影 |
| **説明** | "ブラウザ完結型AIチャットボット。WebAssembly + WebGPUで動作し、完全オフライン対応。" |
| **技術タグ** | Next.js, React, @mlc-ai/web-llm, WebGPU, NES.css |
| **リンク** | デモ: `/chatbot`, GitHub: （該当リポジトリ） |

**統合コード例**:
```tsx
const internalApps: ProjectData[] = [
  {
    id: "botanical-brew",
    title: "BOTANICAL BREW",
    description: "オーガニックカフェのランディングページ",
    thumbnail: "/images/projects/botanical-brew.png",
    tags: ["Web Design", "Animation"],
    technologies: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    demoUrl: "/sampl_app",
    featured: true,
    type: "web"
  },
  {
    id: "kei-bot-chatbot",
    title: "KEI-bot Chatbot",
    description: "ブラウザ完結型AIチャットボット",
    thumbnail: "/images/projects/kei-bot.png",
    tags: ["AI", "WebGPU", "Offline"],
    technologies: ["Next.js", "React", "@mlc-ai/web-llm", "WebAssembly"],
    demoUrl: "/chatbot",
    featured: true,
    type: "web"
  }
];
```

### 6.3 コンテンツ作成ガイドライン

#### プロジェクト説明の書き方

| ルール | 例 |
|--------|-----|
| 1行目: 概要 | "オーガニックカフェのランディングページ" |
| 2行目: 特徴 | "ボタニカルデザインとアニメーション背景が特徴" |
| 3行目: 技術的挑戦（任意） | "Framer Motionで有機的な動きを実現" |

#### スキルの習熟度レベル定義

| レベル | 定義 | 年数目安 |
|--------|------|---------|
| 初級 | 基本的な使用が可能 | 0-1年 |
| 中級 | 実務で問題なく使用可能 | 1-3年 |
| 上級 | 設計から実装まで独力で対応可能 | 3-5年 |
| エキスパート | 技術選定、アーキテクチャ設計が可能 | 5年以上 |

---

## 7. 参考資料

### 7.1 参考サイト

#### 日本語サイト

| サイト | URL | 特徴 |
|--------|-----|------|
| 侍エンジニアブログ | https://www.sejuku.net/blog/180486 | 日本のエンジニアポートフォリオ事例 |
| DMM WEBCAMP MEDIA | https://web-camp.io/magazine/archives/124638 | 企業視点での評価ポイント |

#### グローバルサイト

| サイト | URL | 特徴 |
|--------|-----|------|
| Bruno Simon | https://bruno-simon.com/ | 3D WebGL、インタラクティブ |
| Brittany Chiang | https://brittanychiang.com/ | シンプル・モダン |
| Jordan Cruz-Correa | https://jordancruzcorrea.com/ | Windows 98風UI |
| Jesse Zhou | https://jesse-zhou.com/ | 3Dラーメン小屋 |

### 7.2 参考GitHubリポジトリ

| リポジトリ | URL | 使用技術 |
|-----------|-----|---------|
| dillionverma/portfolio | https://github.com/dillionverma/portfolio | Next.js 14, Shadcn/UI, Magic UI |
| 1hanzla100/developer-portfolio | https://github.com/1hanzla100/developer-portfolio | React, Next.js, Bootstrap |
| said7388/developer-portfolio-nextjs | https://github.com/said7388/developer-portfolio-nextjs | Next.js, Tailwind, Dark/Light mode |
| codebucks27/portfolio | https://github.com/codebucks27/Next.js-Developer-Portfolio-Starter-Code | Next.js, Tailwind, Framer Motion |

### 7.3 技術ドキュメント

| ドキュメント | URL |
|-------------|-----|
| Next.js App Router | https://nextjs.org/docs/app |
| Framer Motion | https://www.framer.com/motion/ |
| Tailwind CSS | https://tailwindcss.com/docs |
| WCAG 2.1 | https://www.w3.org/WAI/WCAG21/quickref/ |
| Core Web Vitals | https://web.dev/vitals/ |

### 7.4 デザインリソース

| リソース | URL | 用途 |
|---------|-----|------|
| Heroicons | https://heroicons.com/ | アイコン |
| Unsplash | https://unsplash.com/ | 画像素材 |
| Coolors | https://coolors.co/ | カラーパレット生成 |
| Google Fonts | https://fonts.google.com/ | Webフォント |

---

## 8. 実装優先順位

### Phase 1: MVP（最小限の機能）

| タスク | 内容 | 期間 |
|--------|------|------|
| 1. デザインスタイル決定 | Glassmorphism/Dark OLED/Auroraから選択 | 1日 |
| 2. レイアウト構築 | Header, Footer, Section構造 | 2日 |
| 3. ヒーローセクション | 自己紹介、背景エフェクト | 2日 |
| 4. プロジェクトセクション | 既存アプリ統合、カード表示 | 3日 |
| 5. スキルセクション | 技術スタック一覧 | 2日 |
| 6. コンタクトセクション | SNSリンク、メールアドレス | 1日 |
| 7. レスポンシブ対応 | モバイル最適化 | 2日 |

**合計**: 約13日

### Phase 2: 機能拡張

| タスク | 内容 | 期間 |
|--------|------|------|
| 8. アニメーション実装 | Framer Motion、パララックス | 3日 |
| 9. スキルビジュアライゼーション | レーダーチャート、プログレスバー | 2日 |
| 10. アクセシビリティ対応 | ARIA、キーボード操作 | 2日 |
| 11. パフォーマンス最適化 | 画像最適化、コード分割 | 2日 |
| 12. SEO対策 | メタタグ、構造化データ | 1日 |

**合計**: 約10日

### Phase 3: 改善・拡張（オプション）

| タスク | 内容 | 期間 |
|--------|------|------|
| 13. ダークモード切り替え | ライト/ダークテーマ | 2日 |
| 14. ブログセクション | 外部ブログ連携 | 3日 |
| 15. コンタクトフォーム | フォーム機能実装 | 2日 |
| 16. アナリティクス連携 | Google Analytics | 1日 |

**合計**: 約8日

---

## 9. 品質チェックリスト

### Critical（必須）

- [ ] すべてのセクションが表示される
- [ ] レスポンシブ対応（モバイル/タブレット/デスクトップ）
- [ ] 既存アプリ（BOTANICAL BREW、KEI-bot）へのリンクが機能する
- [ ] LCP < 2.5秒
- [ ] 色コントラスト4.5:1以上
- [ ] キーボード操作可能
- [ ] GitHubへのリンクが有効

### High（重要）

- [ ] アニメーションがスムーズ（60fps）
- [ ] prefers-reduced-motion対応
- [ ] スクリーンリーダー対応（ARIA）
- [ ] メタタグ、OGP設定
- [ ] クロスブラウザ対応（Chrome, Safari, Firefox）

### Medium（推奨）

- [ ] ダークモード切り替え
- [ ] スクロール進捗バー
- [ ] 3D Tiltエフェクト（プロジェクトカード）
- [ ] タイプライターエフェクト（ヒーロー）
- [ ] 構造化データ（JSON-LD）

---

## 10. リスク・制約事項

### 10.1 技術的制約

| 制約 | 影響 | 対策 |
|------|------|------|
| GitHub Pages制約 | サーバーサイド処理不可 | 静的エクスポートのみ使用 |
| ビルドサイズ制限 | バンドルサイズ増大リスク | コード分割、Dynamic Import |
| Framer Motionの重さ | 初回ロード時間増加 | Tree Shaking、最適化 |

### 10.2 パフォーマンスリスク

| リスク | 影響 | 対策 |
|--------|------|------|
| アニメーション過多 | フレームレート低下 | アニメーション最小化、GPU加速 |
| 画像サイズ | LCP悪化 | WebP変換、遅延ロード |
| Webフォント | FOUT/FOIT | font-display: swap |

### 10.3 デザインリスク

| リスク | 影響 | 対策 |
|--------|------|------|
| 過度な装飾 | 内容の希薄化 | 情報設計優先、装飾は控えめに |
| トレンド追従過多 | 陳腐化リスク | タイムレスなデザイン要素を併用 |
| アクセシビリティ不足 | 一部ユーザーの排除 | WCAG 2.1 AA準拠を徹底 |

---

## 11. 今後の展開

### 11.1 中長期的な拡張

| 項目 | 内容 | 時期 |
|------|------|------|
| ブログ統合 | 技術記事の執筆・表示 | 3ヶ月後 |
| 多言語対応 | 英語版の作成 | 6ヶ月後 |
| CMS連携 | HeadlessCMS導入 | 1年後 |
| カスタムドメイン | yourname.com取得 | 3ヶ月後 |

### 11.2 継続的改善

- 月次でアナリティクスレビュー
- 四半期ごとにデザインリフレッシュ
- 新しいプロジェクトを随時追加
- Core Web Vitalsの定期モニタリング

---

## 12. 補足資料

### 12.1 用語集

| 用語 | 定義 |
|------|------|
| LCP | Largest Contentful Paint、最大コンテンツの描画時間 |
| FID | First Input Delay、最初の入力遅延 |
| CLS | Cumulative Layout Shift、累積レイアウトシフト |
| WCAG | Web Content Accessibility Guidelines、Webアクセシビリティガイドライン |
| SSG | Static Site Generation、静的サイト生成 |
| OGP | Open Graph Protocol、SNSシェア用メタデータ |

### 12.2 関連ドキュメント

| ドキュメント | パス |
|-------------|------|
| プロジェクト分析 | `/Users/kei/work/my-portfolio/claudedocs/project-analysis.md` |
| 開発ルール | `/Users/kei/work/my-portfolio/.claude/rules/development-rules.md` |
| コーディング規約 | `/Users/kei/work/my-portfolio/.claude/rules/coding-guidelines.md` |

---

## 改訂履歴

| 日付 | バージョン | 変更内容 | 担当者 |
|------|-----------|---------|--------|
| 2025-12-11 | 1.0 | 初版作成 | kei |

---

*この要件定義書は、既存の調査結果（プロジェクト分析、Web調査、UI/UX設計提案）を統合して作成されました。*
