/**
 * Terminal Portfolio Type Definitions
 * ターミナル風ポートフォリオの型定義
 */

/**
 * 利用可能なコマンドID
 */
export type CommandId =
  | "whoami"
  | "skills"
  | "projects"
  | "demo"
  | "help"
  | "clear";

/**
 * コマンド実行時のコンテキスト
 */
export type CommandContext = {
  /** 直近の実行履歴（文字列の配列） */
  history: string[];
  /** clearの実行など、外部アクション用 */
  clearOutputs: () => void;
};

/**
 * コマンド定義
 */
export type Command = {
  /** コマンドID */
  id: CommandId;
  /** helpに表示する短い説明 */
  summary: string;
  /** コマンドの省略形/別名 */
  aliases?: string[];
  /** コマンド実行関数 */
  execute: (args: string[], ctx: CommandContext) => Promise<CommandResult>;
};

/**
 * コマンド実行結果
 */
export type CommandResult =
  | { kind: "outputs"; outputs: Output[] }
  | { kind: "clear" };

/**
 * ターミナル出力の型
 */
export type Output =
  | { type: "command"; text: string } // 実行コマンドのエコー
  | { type: "text"; text: string; speedMs?: number } // タイプライター対象テキスト
  | { type: "list"; title?: string; items: string[] } // 箇条書きリスト
  | {
      type: "links";
      title?: string;
      items: { label: string; href: string; external?: boolean }[];
    } // リンクリスト
  | { type: "error"; text: string }; // エラーメッセージ
