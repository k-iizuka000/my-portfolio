/**
 * Terminal Portfolio Command Definitions
 * ターミナルコマンド定義とデータ
 */

import type { Command } from "./types";

/**
 * 利用可能なコマンド一覧
 */
export const commands: Command[] = [
  {
    id: "whoami",
    summary: "プロフィールを表示",
    execute: async () => ({
      kind: "outputs",
      outputs: [
        {
          type: "text",
          text: "10年以上のベテラン勢",
        },
        {
          type: "text",
          text: "仕様検討、要件定義、設計、開発、テスト、各チームとの調整、ジュニアエンジニアへの教育などを一貫して担当可能なフルスタックエンジニア",
        },
        {
          type: "text",
          text: "趣味は自転車と開発",
        },
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
          type: "skills",
          title: "Technical Skills",
          legend: { bar: "Legend: █=proficiency (1..5)" },
          groups: [
            {
              category: "Frontend",
              items: [
                {
                  name: "JavaScript",
                  level: 5 as const,
                  levelLabel: "EXPERT",
                  years: 10,
                  keywords: ["ES6+"],
                  note: "設計〜実装まで主戦場",
                },
                {
                  name: "TypeScript",
                  level: 4 as const,
                  levelLabel: "ADVANCED",
                },
                {
                  name: "Vue.js",
                  level: 4 as const,
                  levelLabel: "ADVANCED",
                  keywords: ["Composition API", "Pinia"],
                },
                {
                  name: "React",
                  level: 3 as const,
                  levelLabel: "INTERMEDIATE",
                  keywords: ["Hooks", "Next.js"],
                },
                {
                  name: "HTML/CSS",
                  level: 4 as const,
                  levelLabel: "ADVANCED",
                },
              ],
            },
            {
              category: "Backend",
              items: [
                {
                  name: "Java",
                  level: 5 as const,
                  levelLabel: "EXPERT",
                  years: 10,
                  keywords: ["Spring", "Struts"],
                },
                {
                  name: "Kotlin",
                  level: 3 as const,
                  levelLabel: "INTERMEDIATE",
                },
                {
                  name: "Spring Boot",
                  level: 4 as const,
                  levelLabel: "ADVANCED",
                },
                {
                  name: "Python",
                  level: 3 as const,
                  levelLabel: "INTERMEDIATE",
                },
                {
                  name: "Node.js",
                  level: 3 as const,
                  levelLabel: "INTERMEDIATE",
                },
                {
                  name: "SQL",
                  level: 4 as const,
                  levelLabel: "ADVANCED",
                },
              ],
            },
            {
              category: "Infra / Tools",
              items: [
                {
                  name: "AWS",
                  level: 3 as const,
                  levelLabel: "INTERMEDIATE",
                },
                {
                  name: "Docker",
                  level: 3 as const,
                  levelLabel: "INTERMEDIATE",
                },
                {
                  name: "Git",
                  level: 4 as const,
                  levelLabel: "ADVANCED",
                },
                {
                  name: "CI/CD",
                  level: 3 as const,
                  levelLabel: "INTERMEDIATE",
                },
              ],
            },
            {
              category: "Testing",
              items: [
                {
                  name: "JUnit",
                  level: 3 as const,
                  levelLabel: "INTERMEDIATE",
                },
                {
                  name: "E2E Testing",
                  level: 2 as const,
                  levelLabel: "BASIC",
                  keywords: ["Playwright"],
                },
              ],
            },
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
        { type: "text", text: "Project Experience" },
        {
          type: "project",
          project: {
            title: "某通信会社 マイページ機能開発",
            period: "約2年",
            domain: "BtoC",
            role: "Tech Lead / Dev Lead",
            stack: ["Java", "Spring", "Struts", "JavaScript", "AWS"],
            highlights: ["設計〜リード", "品質改善", "チーム調整"],
            scope: [
              "仕様検討",
              "要件定義",
              "基本/詳細設計",
              "実装",
              "レビュー",
              "テスト戦略",
            ],
            achievements: [
              "レビュー観点の標準化により手戻りを削減",
              "共通化により改修コストを抑制",
            ],
          },
        },
        {
          type: "project",
          project: {
            title: "某ゲーム会社 バックエンド開発",
            period: "約2年",
            domain: "BtoC",
            role: "Developer",
            stack: ["Java", "Spring", "AWS"],
            scope: ["設計", "実装", "不具合解析"],
            achievements: [
              "運用課題の一次切り分けを定常化し、対応速度を改善",
            ],
          },
        },
        {
          type: "project",
          project: {
            title: "モビリティ業界 フロント機能開発",
            domain: "BtoC",
            role: "Project Lead",
            stack: ["Astro", "TypeScript", "Java", "AI"],
            highlights: ["AI活用（Claude Code, Codex）"],
            scope: ["要件整理", "設計", "実装", "進行管理", "関係者調整"],
            achievements: [
              "AI支援を前提にした開発フローを整備し、実装速度を底上げ",
              "フロント機能を一括担当",
            ],
          },
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
          type: "demo",
          title: "Demo Sites & Projects(タイトルクリックで画面遷移する)",
          items: [
            {
              label: "/chatbot",
              href: "/chatbot",
              description: "チャットUIデモ（会話/ストリーミング表示）",
              tech: ["Next.js", "TypeScript","gemma-2-2b-it-q4f16_1-MLC"],
            },
            {
              label: "/sampl_app",
              href: "/sampl_app",
              description: "カフェサイト（BOTANICAL BREW）のサンプル",
              tech: ["Next.js", "React", "Tailwind CSS"],
            },
            {
              label: "game-block-blast",
              href: "https://game-block-blast.vercel.app/",
              external: true,
              description: "ブロックパズルゲーム(ランキング１位のゲーム)",
              tech: ["JavaScript"],
            },
            {
              label: "daifugo-five",
              href: "https://daifugo-five.vercel.app/",
              external: true,
              description: "大富豪ゲーム(CPUとの対戦機能)",
              tech: ["TypeScript"],
            },
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
          items: commands.map((c) => `${c.id} - ${c.summary}`),
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

/**
 * コマンドIDとコマンドオブジェクトのマップ
 */
export const commandsMap = new Map<string, Command>(
  commands.flatMap((cmd) => {
    const entries: [string, Command][] = [[cmd.id, cmd]];
    if (cmd.aliases) {
      cmd.aliases.forEach((alias) => entries.push([alias, cmd]));
    }
    return entries;
  })
);

/**
 * オートコンプリート用の候補リストを生成
 * @param input - 現在の入力文字列
 * @returns 前方一致する候補の配列
 */
export function getSuggestions(input: string): string[] {
  const trimmedInput = input.trim().toLowerCase();
  if (!trimmedInput) return [];

  // 入力の最初の単語を取得（コマンド名のみ補完対象）
  const firstWord = trimmedInput.split(" ")[0];

  // 全コマンドID+エイリアスから前方一致するものを抽出
  const allCommandNames = commands.flatMap((cmd) => [
    cmd.id,
    ...(cmd.aliases ?? []),
  ]);

  return allCommandNames
    .filter((name) => name.startsWith(firstWord))
    .sort();
}
