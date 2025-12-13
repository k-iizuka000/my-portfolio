# ターミナル風ポートフォリオサイト 設計書  
対象: Next.js 15 (App Router) + TypeScript + Tailwind CSS  

目的: CRTターミナル風UIで、コマンド入力によりプロフィール/スキル/実績/デモリンクを閲覧できるポートフォリオを提供する。  

前提/方針:
- ルート(`/`)にターミナルを配置する（現状 `src/app/page.tsx` が無いため新規追加想定）。
- インタラクティブ機能は `use client` コンポーネントに閉じる。
- 初期表示時に `help` を自動実行する。`whoami` の初期自動表示は行わない。
- スマホファーストで、全画面(安全領域含む)に自動フィットするレイアウトとする。

---

## 1. コンポーネント設計

### ファイル構成（提案）
```
src/
  app/
    page.tsx
  components/
    terminal/
      TerminalApp.tsx
      TerminalWindow.tsx
      OutputList.tsx
      OutputBlock.tsx
      Prompt.tsx
      AutoCompleteList.tsx
      Cursor.tsx
      hooks/
        useTerminal.ts
        useTypewriter.ts
      lib/
        commands.ts
        types.ts
```

### 各コンポーネントの責務

- `src/app/page.tsx`
  - ルートページ。
  - `TerminalApp` を描画するだけのサーバーコンポーネント（SEO/metadataはここで定義）。

- `src/components/terminal/TerminalApp.tsx`（client）
  - ターミナル体験のルート。
  - `useTerminal` を利用して入出力・履歴・補完を統合。
  - 初期マウント時に `help` を自動実行（履歴に残さない方針）。
  - 新しい出力が追加されたらスクロールを最下部へ追従。
  - モバイルでのキーボード表示時のレイアウト崩れを避ける（`min-h-[100svh]`、入力欄は画面下に固定）。

- `src/components/terminal/TerminalWindow.tsx`
  - ターミナル「ウィンドウ」の外枠（角丸/枠線/3つのドット）。
  - CRT表現（グロー、スキャンライン、ノイズ、軽いフリッカー）をラップして提供。
  - フォント( JetBrains Mono )とテーマ色（#4ade80）を適用するベースクラスを付与。

- `src/components/terminal/OutputList.tsx`
  - 実行済みコマンドとその出力の履歴を縦方向に並べるスクロール領域。
  - `OutputBlock` を `outputs` 配列からレンダリング。

- `src/components/terminal/OutputBlock.tsx`
  - 1つの出力ブロック（コマンドエコー/テキスト/リスト/リンク/エラー）を描画。
  - `type: "text"` の場合は `useTypewriter` を適用しタイプライター表示。

- `src/components/terminal/Prompt.tsx`（client）
  - プロンプト表示＋入力行。
  - キー操作を受け取り `useTerminal` のハンドラへ委譲。
    - `Enter`: コマンド実行
    - `ArrowUp/Down`: 履歴遡り
    - `Tab`: オートコンプリート
  - 入力フォーカス管理（クリック/タップで常にフォーカス）。

- `src/components/terminal/AutoCompleteList.tsx`
  - 候補一覧（入力行の上または右側に表示）。
  - `suggestions` と `activeIndex` を受け取り、UI上のハイライトを行う。

- `src/components/terminal/Cursor.tsx`
  - 文字入力中の点滅カーソル（ブロック/アンダースコア）。
  - Tailwindの `animate-cursor` を使って制御。

---

## 2. 型定義設計

### Command型
`src/components/terminal/lib/types.ts`
```ts
export type CommandId =
  | "whoami"
  | "skills"
  | "projects"
  | "demo"
  | "help"
  | "clear";

export type CommandContext = {
  /** 直近の実行履歴（文字列の配列） */
  history: string[];
  /** clearの実行など、外部アクション用 */
  clearOutputs: () => void;
};

export type Command = {
  id: CommandId;
  summary: string;     // helpに出す短い説明
  aliases?: string[];  // 省略/別名
  execute: (args: string[], ctx: CommandContext) => Promise<CommandResult>;
};

export type CommandResult =
  | { kind: "outputs"; outputs: Output[] }
  | { kind: "clear" };
```

### Output型
`src/components/terminal/lib/types.ts`
```ts
export type Output =
  | { type: "command"; text: string } // 実行コマンドのエコー
  | { type: "text"; text: string; speedMs?: number }
  | { type: "list"; title?: string; items: string[] }
  | {
      type: "links";
      title?: string;
      items: { label: string; href: string; external?: boolean }[];
    }
  | { type: "error"; text: string };
```

描画側は `type` で分岐し、`text` はタイプライター対象、`list/links` は即時表示とする。

---

## 3. カスタムフック設計

### useTerminal（コマンド実行、履歴管理）
`src/components/terminal/hooks/useTerminal.ts`

責務:
- 入力文字列の管理 (`input`, `setInput`)
- コマンドパース（`commandName`, `args`）
- 実行結果の `outputs` への追加（コマンドエコー → 結果の順）
- 履歴管理（`history`, `historyIndex`）
- オートコンプリート候補生成（前方一致で `CommandId/aliases` を候補に）
- キー操作ハンドリング（Enter/Up/Down/Tab）

想定API:
```ts
type UseTerminalReturn = {
  input: string;
  setInput: (v: string) => void;
  outputs: Output[];
  suggestions: string[];
  activeSuggestionIndex: number;
  executeRaw: (raw: string, opts?: { pushHistory?: boolean }) => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
```

内部仕様:
- `executeRaw(raw, { pushHistory })`
  1. `raw` をtrimし空なら何もしない
  2. `outputs` に `{type:"command", text: raw}` をpush
  3. `commandsMap` から `commandName` を探索（alias含む）
  4. 未定義なら `{type:"error", text:"command not found: ..."}` をpush
  5. 定義済みなら `execute(args, ctx)` を呼び、`CommandResult` を反映
     - `kind:"outputs"` → outputsを追加
     - `kind:"clear"` → outputsを空配列にリセット
  6. `pushHistory !== false` の場合のみ `history` に `raw` を追加し、`historyIndex` を末尾へ
- 初期 `help` 自動実行時は `pushHistory:false` とする。

### useTypewriter（タイプライターアニメーション）
`src/components/terminal/hooks/useTypewriter.ts`

責務:
- テキストを1文字ずつ表示するアニメーション制御
- 出力速度/開始遅延/完了通知を提供

想定API:
```ts
type UseTypewriterOptions = {
  text: string;
  speedMs?: number;     // default 18-24ms程度
  startDelayMs?: number;
  enabled?: boolean;    // list/linksはfalse
  onDone?: () => void;
};

type UseTypewriterReturn = {
  displayed: string;
  isDone: boolean;
};
```

実装ポイント:
- `enabled=false` の場合は即時 `displayed=text`。
- `text` 変更時にリセットし再生。
- 連続出力での体感を良くするため、前ブロック完了後に次ブロックが再生開始する設計（`OutputBlock` 側で順次制御）。

---

## 4. スタイリング設計

### Tailwind拡張設定
`tailwind.config.ts` の `theme.extend` を拡張する。

追加案:
```ts
extend: {
  colors: {
    terminalBg: "var(--terminal-bg)",
    phosphor: "var(--phosphor-green)",
    phosphorDim: "var(--phosphor-green-dim)",
  },
  fontFamily: {
    mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular"],
  },
  keyframes: {
    scanline: {
      "0%": { backgroundPosition: "0 0" },
      "100%": { backgroundPosition: "0 100%" },
    },
    flicker: {
      "0%, 100%": { opacity: "0.9" },
      "50%": { opacity: "1" },
    },
    cursor: {
      "0%, 49%": { opacity: "1" },
      "50%, 100%": { opacity: "0" },
    },
  },
  animation: {
    scanline: "scanline 6s linear infinite",
    flicker: "flicker 2.5s ease-in-out infinite",
    cursor: "cursor 1s steps(1) infinite",
  },
}
```

### CSS変数・カスタムスタイル
`src/app/globals.css` にターミナル用の変数とCRT効果を追加する。

追加案（抜粋）:
```css
:root {
  --terminal-bg: #020617;
  --phosphor-green: #4ade80;
  --phosphor-green-dim: rgba(74, 222, 128, 0.65);
  --crt-glow: 0 0 12px rgba(74, 222, 128, 0.45);
}

body {
  background: radial-gradient(ellipse at center, #02110a 0%, #000 65%);
}

.crt {
  color: var(--phosphor-green);
  text-shadow: var(--crt-glow);
}

.scanlines::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.03),
    rgba(0,0,0,0.03) 2px,
    rgba(0,0,0,0.06) 4px
  );
  mix-blend-mode: overlay;
  animation: scanline 6s linear infinite;
}
```

レイアウト指針:
- `TerminalApp` の外枠は `w-screen min-h-[100svh]`。  
- 出力領域は `flex-1 overflow-y-auto`、入力行は `sticky bottom-0`。
- iPhone等の安全領域対応で `px-[env(safe-area-inset-left)]` などを利用。

---

## 5. データ設計

### コマンドデータ構造
`src/components/terminal/lib/commands.ts`

基本方針:
- `CommandId` をキーとした `commandsMap` を用意し、`help` 生成に `commands` 配列も持つ。
- `whoami/skills/projects/demo` は静的データを `Output[]` として定義し、そのまま返す。
- `clear` は `kind:"clear"` を返すだけの特殊コマンド。

例:
```ts
export const commands: Command[] = [
  {
    id: "whoami",
    summary: "プロフィールを表示",
    execute: async () => ({
      kind: "outputs",
      outputs: [
        { type: "text", text: "10年以上のベテラン勢" },
        {
          type: "text",
          text:
            "仕様検討、要件定義、設計、開発、テスト、各チームとの調整、ジュニアエンジニアへの教育などを一貫して担当可能なフルスタックエンジニア",
        },
        { type: "text", text: "趣味は自転車と開発" },
      ],
    }),
  },
  {
    id: "skills",
    summary: "スキル一覧を表示",
    execute: async () => ({
      kind: "outputs",
      outputs: [
        {
          type: "list",
          items: [
            "JavaScript","Vue.js","React","HTML","CSS","JSP","Java","Kotlin",
            "Spring Boot","Python","SQL","Node.js","COBOL","Ruby","PHP","Git",
            "AWS","Docker","Gradle","JUnit","Maven","SVN","e2e"
          ],
        },
      ],
    }),
  },
  {
    id: "projects",
    summary: "プロジェクト実績を表示",
    execute: async () => ({
      kind: "outputs",
      outputs: [
        {
          type: "list",
          items: [
            "某通信会社のマイページ機能開発(約2年) - BtoC, Java(Spring,Struts), js, テックリード/devリーダー",
            "某ゲーム会社のマイページ機能開発(約2年) - BtoC, Java(Spring), dev",
            "モビリティ業界のフロント機能開発 - BtoC, Astro, TS, Java, AI(claude code, codex), プロジェクトリーダー",
          ],
        },
      ],
    }),
  },
  {
    id: "demo",
    summary: "デモ/リンクを表示",
    execute: async () => ({
      kind: "outputs",
      outputs: [
        {
          type: "links",
          items: [
            { label: "/chatbot", href: "/chatbot" },
            { label: "/sampl_app", href: "/sampl_app" },
            { label: "game-block-blast", href: "https://game-block-blast.vercel.app/", external: true },
            { label: "daifugo-five", href: "https://daifugo-five.vercel.app/", external: true },
          ],
        },
      ],
    }),
  },
  {
    id: "help",
    summary: "コマンド一覧を表示",
    execute: async () => ({
      kind: "outputs",
      outputs: [
        {
          type: "list",
          title: "Available commands",
          items: commands.map(c => `${c.id} - ${c.summary}`),
        },
      ],
    }),
  },
  {
    id: "clear",
    summary: "画面をクリア",
    execute: async () => ({ kind: "clear" }),
  },
];
```

オートコンプリート:
- `commands.flatMap(c => [c.id, ...(c.aliases ?? [])])` を候補辞書とし、入力の先頭単語に前方一致する候補を返す。

---

## 6. 実装グループ分け

### Group A: 基盤（型定義、データ、フック）
- `src/components/terminal/lib/types.ts`
- `src/components/terminal/lib/commands.ts`
- `src/components/terminal/hooks/useTerminal.ts`
- `src/components/terminal/hooks/useTypewriter.ts`

担当範囲:
- Command/Outputの型設計と実装
- コマンド実行エンジン、履歴、補完
- タイプライター制御

### Group B: UI（コンポーネント）
- `src/app/page.tsx`
- `src/components/terminal/TerminalApp.tsx`
- `src/components/terminal/TerminalWindow.tsx`
- `src/components/terminal/OutputList.tsx`
- `src/components/terminal/OutputBlock.tsx`
- `src/components/terminal/Prompt.tsx`
- `src/components/terminal/AutoCompleteList.tsx`
- `src/components/terminal/Cursor.tsx`

担当範囲:
- 画面レイアウトと構造
- コマンド入力UI/補完UI/履歴UI
- 出力レンダリングとスクロール制御

### Group C: スタイリング（Tailwind設定、CSS）
- `tailwind.config.ts` 拡張
- `src/app/globals.css` ターミナルテーマ/CRT効果追加

担当範囲:
- Phosphorグリーンテーマ、CRTスキャンライン/グロー/フリッカー
- JetBrains Mono適用
- レスポンシブ＆全画面・安全領域対応

