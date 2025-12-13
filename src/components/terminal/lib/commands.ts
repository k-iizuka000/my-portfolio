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
          type: "list",
          title: "Technical Skills",
          items: [
            "JavaScript",
            "Vue.js",
            "React",
            "HTML",
            "CSS",
            "JSP",
            "Java",
            "Kotlin",
            "Spring Boot",
            "Python",
            "SQL",
            "Node.js",
            "COBOL",
            "Ruby",
            "PHP",
            "Git",
            "AWS",
            "Docker",
            "Gradle",
            "JUnit",
            "Maven",
            "SVN",
            "e2e",
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
          title: "Project Experience",
          items: [
            "某通信会社のマイページ機能開発(2年程) - BtoC, Java(Spring,Struts), js, テックリード/devリーダー",
            "某ゲーム会社のマイページ機能開発(2年程) - BtoC, Java(Spring), dev",
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
          title: "Demo Sites & Projects",
          items: [
            { label: "/chatbot", href: "/chatbot" },
            { label: "/sampl_app", href: "/sampl_app" },
            {
              label: "game-block-blast",
              href: "https://game-block-blast.vercel.app/",
              external: true,
            },
            {
              label: "daifugo-five",
              href: "https://daifugo-five.vercel.app/",
              external: true,
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
