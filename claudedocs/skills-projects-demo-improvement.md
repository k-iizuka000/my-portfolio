# skills / projects / demo コマンド出力 改善設計（ターミナル風ポートフォリオ）

対象: `src/components/terminal/lib/types.ts` / `src/components/terminal/OutputBlock.tsx` / `src/components/terminal/lib/commands.ts`  
目的: CRTターミナル美学（phosphor green / scanline / glow / flicker / JetBrains Mono / `•` と `↗`）を維持したまま、情報を「構造化して読みやすく」する。

---

## 1. 現状課題（要約）

- `skills`: 26個がフラット配列で羅列され、カテゴリ・習熟度・強みが伝わらない
- `projects`: 1行に詰め込み、役割/成果/インパクトが読み取れない
- `demo`: ラベルがパス名中心で、何が見られるのか（目的/技術/見どころ）が分からない

---

## 2. 改善方針（UI/UX）

### 2.1 表示ルール（ターミナル感の維持）

- 箇条書きは `•` を基本にする（既存UI踏襲）
- 外部リンクは末尾に `↗`（既存UI踏襲）
- 情報の階層は「インデント」「区切り線」「ラベル（角括弧）」で表現
- “表”のように見せたい場合も、グリッドではなく等幅フォントの整形で対応（CRT/ターミナル感優先）

### 2.2 情報量のコントロール

- 1画面に詰め込みすぎない（プロジェクトは「1プロジェクト=1ブロック」で縦に積む）
- 重要情報（役割/成果/主要技術）を先頭に置き、補足は後ろに下げる

---

## 3. 新しい Output 型の提案（後方互換あり）

既存の `list` / `links` は汎用として残しつつ、**表示意図が明確な構造型**を追加する。

- `type: "skills"`: カテゴリ別 + 習熟度 + 任意の補足（年数/キーワード）
- `type: "project"`: プロジェクト1件を構造化表示（役割/期間/成果/インパクト/スタック）
- `type: "demo"`: 説明付きリンク（目的/技術/内部/外部）

期待効果:
- commands 側は「見せたい情報」をデータとして保持し、UI側は安定したレンダリング規約に従う
- テキスト詰め込みをやめ、読みやすい“端末出力”として整形できる

---

## 4. TypeScript 定義案（`types.ts`）

### 4.1 skills

```ts
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type SkillItem = {
  name: string;                 // 例: "Vue.js"
  level: SkillLevel;            // 1..5
  levelLabel?: "BASIC" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  years?: number;               // 任意: おおよその経験年数
  keywords?: string[];          // 任意: "Composition API", "Pinia" など
  note?: string;                // 任意: 一言（強み/用途）
};

export type SkillGroup = {
  category: string;             // 例: "Frontend"
  items: SkillItem[];
};

export type OutputSkills = {
  type: "skills";
  title?: string;               // 例: "Technical Skills"
  groups: SkillGroup[];
  legend?: {                    // 任意: 表示ルールの説明
    bar?: string;               // 例: "█=proficiency (1..5)"
  };
};
```

### 4.2 project

```ts
export type ProjectImpact = {
  summary?: string;             // 例: "CVR改善 / 問い合わせ削減"
  metrics?: { label: string; value: string }[]; // 例: {label:"CVR", value:"+12%"}
};

export type Project = {
  title: string;                // 例: "某通信会社 マイページ機能開発"
  period?: string;              // 例: "2022-04 〜 2024-03"
  domain?: "BtoC" | "BtoB" | "Internal" | string;
  role?: string;                // 例: "Tech Lead / Dev Lead"
  team?: string;                // 例: "5-8名（FE2/BE4/QA2）"
  stack?: string[];             // 例: ["Java", "Spring", "Struts", "JavaScript"]
  scope?: string[];             // 例: ["要件定義", "設計", "実装", "レビュー", "運用改善"]
  achievements?: string[];      // 例: ["共通コンポーネント化で改修工数を削減"]
  impact?: ProjectImpact;       // 任意: 数値/影響
  highlights?: string[];        // 任意: 端的な強み（先頭で見せる）
};

export type OutputProject = {
  type: "project";
  project: Project;
};
```

### 4.3 demo

```ts
export type DemoItem = {
  label: string;                // 例: "/chatbot" または "game-block-blast"
  href: string;                 // internal route or external url
  external?: boolean;           // 外部ならtrue（↗ 表示 + target="_blank"）
  description?: string;         // 例: "会話UIデモ（ストリーミング表示）"
  tech?: string[];              // 例: ["Next.js", "OpenAI API", "Tailwind"]
  note?: string;                // 任意: "PC推奨" など
};

export type OutputDemo = {
  type: "demo";
  title?: string;               // 例: "Demo Sites & Projects"
  items: DemoItem[];
};
```

### 4.4 Output の union への追加案

```ts
export type Output =
  | { type: "command"; text: string }
  | { type: "text"; text: string; speedMs?: number }
  | { type: "list"; title?: string; items: string[] }
  | { type: "links"; title?: string; items: { label: string; href: string; external?: boolean }[] }
  | OutputSkills
  | OutputProject
  | OutputDemo
  | { type: "error"; text: string };
```

---

## 5. `OutputBlock.tsx` 描画方法（Tailwind クラス含む）

ここでは「追加分の分岐」を示す。既存の `command/text/list/links/error` は現状維持。

### 5.1 共通: バー表示（skills用）

- 5段階を `█`（充填）と `░`（空）で表現する  
- 充填: `text-phosphor` / 空: `text-phosphorDim`

```tsx
function renderLevelBar(level: 1 | 2 | 3 | 4 | 5) {
  const full = "█".repeat(level);
  const empty = "░".repeat(5 - level);
  return { full, empty };
}
```

### 5.2 `type: "skills"`（カテゴリ別 + バー + 補足）

```tsx
if (output.type === "skills") {
  return (
    <div className="mb-4">
      {output.title && (
        <div className="text-phosphor font-semibold mb-2">{output.title}</div>
      )}

      <div className="space-y-3">
        {output.groups.map((g) => (
          <div key={g.category}>
            <div className="text-phosphor mb-1">[{g.category}]</div>
            <div className="space-y-1 pl-2">
              {g.items.map((s) => {
                const bar = renderLevelBar(s.level);
                return (
                  <div key={s.name} className="text-phosphorDim">
                    <span className="text-phosphorDim">• </span>
                    <span className="text-phosphor">{s.name}</span>
                    <span className="text-phosphorDim">{"  "}</span>
                    <span className="text-phosphorDim">[{s.levelLabel ?? `L${s.level}`}]</span>
                    <span className="text-phosphorDim">{" "}</span>
                    <span className="text-phosphor">{bar.full}</span>
                    <span className="text-phosphorDim">{bar.empty}</span>
                    {typeof s.years === "number" && (
                      <span className="text-phosphorDim">{`  (${s.years}y)`}</span>
                    )}
                    {s.keywords?.length ? (
                      <span className="text-phosphorDim">{`  ${s.keywords.map((k) => `[${k}]`).join(" ")}`}</span>
                    ) : null}
                    {s.note ? <span className="text-phosphorDim">{`  - ${s.note}`}</span> : null}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {output.legend?.bar && (
        <div className="mt-2 text-phosphorDim text-xs">{output.legend.bar}</div>
      )}
    </div>
  );
}
```

意図:
- `[` `]` でカテゴリ/タグを表現し、ターミナルのステータス表示っぽさを出す
- バーは視線誘導（「強み」を一瞬で理解できる）

### 5.3 `type: "project"`（1件を “カード” ではなく “ログ” 風に）

```tsx
if (output.type === "project") {
  const p = output.project;
  return (
    <div className="mb-5">
      <div className="text-phosphor">
        ── {p.title}
        {p.period ? <span className="text-phosphorDim">{`  (${p.period})`}</span> : null}
      </div>

      <div className="mt-1 space-y-1 pl-2 text-phosphorDim">
        {(p.role || p.domain || p.team) && (
          <div>
            •{" "}
            <span className="text-phosphorDim">
              {p.role ? `[Role: ${p.role}] ` : ""}
              {p.domain ? `[Domain: ${p.domain}] ` : ""}
              {p.team ? `[Team: ${p.team}]` : ""}
            </span>
          </div>
        )}

        {p.highlights?.length ? (
          <div>• Highlights: {p.highlights.map((h) => `[${h}]`).join(" ")}</div>
        ) : null}

        {p.stack?.length ? (
          <div>• Stack: {p.stack.map((t) => `[${t}]`).join(" ")}</div>
        ) : null}

        {p.scope?.length ? (
          <div>
            • Scope:
            <div className="pl-4 space-y-1">
              {p.scope.map((s, i) => (
                <div key={i}>• {s}</div>
              ))}
            </div>
          </div>
        ) : null}

        {p.achievements?.length ? (
          <div>
            • Achievements:
            <div className="pl-4 space-y-1">
              {p.achievements.map((a, i) => (
                <div key={i}>• {a}</div>
              ))}
            </div>
          </div>
        ) : null}

        {p.impact?.summary || p.impact?.metrics?.length ? (
          <div>
            • Impact:
            <div className="pl-4 space-y-1">
              {p.impact.summary ? <div>• {p.impact.summary}</div> : null}
              {p.impact.metrics?.map((m) => (
                <div key={m.label}>• {m.label}: {m.value}</div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
```

意図:
- “区切り線 + 重要情報 → 詳細” の順にして、パッと見で理解できる
- `Scope/Achievements/Impact` は「折り畳み」ではなく、ネスト箇条書きでログ風に

### 5.4 `type: "demo"`（説明 + 技術タグ）

```tsx
if (output.type === "demo") {
  return (
    <div className="mb-4">
      {output.title && (
        <div className="text-phosphor font-semibold mb-2">{output.title}</div>
      )}

      <div className="space-y-2">
        {output.items.map((d) => (
          <div key={d.href} className="text-phosphorDim">
            <div>
              <span className="text-phosphorDim">• </span>
              <a
                href={d.href}
                target={d.external ? "_blank" : undefined}
                rel={d.external ? "noopener noreferrer" : undefined}
                className="text-phosphor hover:underline"
              >
                {d.label}
                {d.external && " ↗"}
              </a>
              {d.note ? <span className="text-phosphorDim">{`  [${d.note}]`}</span> : null}
            </div>

            {(d.description || d.tech?.length) && (
              <div className="pl-4">
                {d.description ? <div>• {d.description}</div> : null}
                {d.tech?.length ? <div>• Tech: {d.tech.map((t) => `[${t}]`).join(" ")}</div> : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

意図:
- 「リンク名」だけで終わらせず、1段下げて “何のデモか” を必ず表示できる
- Techタグで、見たい人が一瞬で判断できる

---

## 6. `commands.ts` のデータ構造（設計案）

### 6.1 skills（データと出力の分離）

```ts
const skillsData = {
  title: "Technical Skills",
  legend: { bar: "Legend: █=proficiency (1..5)" },
  groups: [
    {
      category: "Frontend",
      items: [
        { name: "JavaScript", level: 5, levelLabel: "EXPERT", years: 10, keywords: ["ES6+", "DOM"], note: "設計〜実装まで主戦場" },
        { name: "Vue.js", level: 4, levelLabel: "ADVANCED", keywords: ["Composition API", "Pinia"] },
        { name: "React", level: 3, levelLabel: "INTERMEDIATE", keywords: ["Hooks"] },
        { name: "HTML/CSS", level: 4, levelLabel: "ADVANCED" },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Java", level: 5, levelLabel: "EXPERT", keywords: ["Spring", "Struts"] },
        { name: "Kotlin", level: 3, levelLabel: "INTERMEDIATE" },
        { name: "Spring Boot", level: 4, levelLabel: "ADVANCED" },
        { name: "SQL", level: 4, levelLabel: "ADVANCED" },
      ],
    },
    {
      category: "Infra / Tools / Testing",
      items: [
        { name: "AWS", level: 3, levelLabel: "INTERMEDIATE" },
        { name: "Docker", level: 3, levelLabel: "INTERMEDIATE" },
        { name: "Git", level: 4, levelLabel: "ADVANCED" },
        { name: "JUnit", level: 3, levelLabel: "INTERMEDIATE" },
        { name: "e2e", level: 2, levelLabel: "BASIC" },
      ],
    },
  ],
} satisfies OutputSkills;
```

skills コマンドの `outputs`:

```ts
outputs: [{ type: "skills", ...skillsData }]
```

### 6.2 projects（「文字列1行」をやめて structured data に）

```ts
const projectsData: Project[] = [
  {
    title: "某通信会社 マイページ機能開発",
    period: "約2年",
    domain: "BtoC",
    role: "Tech Lead / Dev Lead",
    stack: ["Java", "Spring", "Struts", "JavaScript"],
    highlights: ["設計〜リード", "品質改善", "チーム調整"],
    scope: ["仕様検討", "要件定義", "基本/詳細設計", "実装", "レビュー", "テスト戦略", "運用改善"],
    achievements: [
      "レビュー観点の標準化により手戻りを削減",
      "共通化により改修コストを抑制",
    ],
    impact: {
      summary: "リリース安定化 / 問い合わせ削減（可能なら数値を後追いで追記）",
      metrics: [
        // { label: "障害", value: "-30%" },
      ],
    },
  },
  {
    title: "某ゲーム会社 マイページ機能開発",
    period: "約2年",
    domain: "BtoC",
    role: "Developer",
    stack: ["Java", "Spring"],
    scope: ["実装", "保守", "不具合解析"],
    achievements: ["運用課題の一次切り分けを定常化し、対応速度を改善"],
  },
  {
    title: "モビリティ業界 フロント機能開発",
    period: "—",
    domain: "BtoC",
    role: "Project Lead",
    stack: ["Astro", "TypeScript", "Java"],
    highlights: ["AI活用（開発効率）"],
    scope: ["要件整理", "設計", "実装", "進行管理", "関係者調整"],
    achievements: ["AI支援を前提にした開発フローを整備し、実装速度を底上げ"],
  },
];
```

projects コマンドの `outputs`:

```ts
outputs: [
  { type: "text", text: "Project Experience" },
  ...projectsData.map((p) => ({ type: "project", project: p } as const)),
]
```

### 6.3 demo（説明付きリンクへ）

```ts
const demoData = {
  title: "Demo Sites & Projects",
  items: [
    { label: "/chatbot", href: "/chatbot", description: "チャットUIデモ（会話/ストリーミング表示）", tech: ["Next.js", "TypeScript"] },
    { label: "/sampl_app", href: "/sampl_app", description: "サンプルアプリ（UI/状態管理の実装例）", tech: ["Next.js", "Tailwind"] },
    { label: "game-block-blast", href: "https://game-block-blast.vercel.app/", external: true, description: "ミニゲーム（スコア/演出）", tech: ["Next.js"] },
    { label: "daifugo-five", href: "https://daifugo-five.vercel.app/", external: true, description: "大富豪ゲーム（ルール/対戦）", tech: ["Next.js"] },
  ],
} satisfies OutputDemo;
```

demo コマンドの `outputs`:

```ts
outputs: [{ type: "demo", ...demoData }]
```

---

## 7. ターミナルUIに合った表示例（ASCII）

### 7.1 `skills`

```
$ skills
Technical Skills
[Frontend]
  • JavaScript  [EXPERT] █████  (10y)  [ES6+] [DOM]  - 設計〜実装まで主戦場
  • Vue.js      [ADV]    ████░          [Composition API] [Pinia]
  • React       [INT]    ███░░          [Hooks]
  • HTML/CSS    [ADV]    ████░

[Backend]
  • Java        [EXPERT] █████          [Spring] [Struts]
  • Spring Boot [ADV]    ████░
  • SQL         [ADV]    ████░

Legend: █=proficiency (1..5)
```

### 7.2 `projects`

```
$ projects
Project Experience
── 某通信会社 マイページ機能開発 (約2年)
  • [Role: Tech Lead / Dev Lead] [Domain: BtoC] [Team: 5-8名]
  • Highlights: [設計〜リード] [品質改善] [チーム調整]
  • Stack: [Java] [Spring] [Struts] [JavaScript]
  • Scope:
    • 仕様検討
    • 要件定義
    • 設計 / 実装 / レビュー
  • Achievements:
    • 共通化により改修コストを抑制
    • レビュー観点の標準化で手戻りを削減
  • Impact:
    • リリース安定化 / 問い合わせ削減（数値追記予定）

── モビリティ業界 フロント機能開発
  • [Role: Project Lead] [Domain: BtoC]
  • Stack: [Astro] [TypeScript] [Java]
  • Achievements:
    • AI支援を前提にした開発フローを整備し、実装速度を底上げ
```

### 7.3 `demo`

```
$ demo
Demo Sites & Projects
• /chatbot
  • チャットUIデモ（会話/ストリーミング表示）
  • Tech: [Next.js] [TypeScript]

• game-block-blast ↗
  • ミニゲーム（スコア/演出）
  • Tech: [Next.js]
```

---

## 8. 実装メモ（最小変更で進める）

- `Output` の union に追加しても、既存レンダリング分岐に影響しない（追加分岐だけ実装）
- `commands.ts` は「表示用文字列」ではなく「構造化データ」をまず定義し、`execute()` ではそれを `Output*` に変換するだけにする
- skills の “レベル” は主観が入るため、初期はざっくりで良い（あとから調整しやすい形にするのが目的）

