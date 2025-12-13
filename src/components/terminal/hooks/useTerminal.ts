/**
 * Terminal Hook
 * ターミナルの状態管理とコマンド実行を担当するカスタムフック
 */

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Output, CommandContext } from "../lib/types";
import { commandsMap, getSuggestions } from "../lib/commands";

export type UseTerminalOptions = {
  /** 初期実行コマンド（履歴に残さない） */
  initialCommand?: string;
};

export type UseTerminalReturn = {
  /** 現在の入力文字列 */
  input: string;
  /** 入力文字列を更新 */
  setInput: (value: string) => void;
  /** 出力履歴 */
  outputs: Output[];
  /** オートコンプリート候補 */
  suggestions: string[];
  /** アクティブな候補のインデックス */
  activeSuggestionIndex: number;
  /** コマンドを実行 */
  executeRaw: (
    raw: string,
    opts?: { pushHistory?: boolean }
  ) => Promise<void>;
  /** キーボードイベントハンドラ */
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

/**
 * ターミナル機能を提供するカスタムフック
 */
export function useTerminal(
  options: UseTerminalOptions = {}
): UseTerminalReturn {
  const { initialCommand } = options;

  // 状態管理
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  // 初期化済みフラグ
  const initializedRef = useRef(false);

  /**
   * 出力をクリアする
   */
  const clearOutputs = useCallback(() => {
    setOutputs([]);
  }, []);

  /**
   * コマンドコンテキストを生成
   */
  const createContext = useCallback(
    (): CommandContext => ({
      history,
      clearOutputs,
    }),
    [history, clearOutputs]
  );

  /**
   * コマンドを実行する
   */
  const executeRaw = useCallback(
    async (raw: string, opts: { pushHistory?: boolean } = {}) => {
      const { pushHistory = true } = opts;
      const trimmed = raw.trim();

      // 空入力は無視
      if (!trimmed) return;

      // コマンドエコーを追加
      setOutputs((prev) => [...prev, { type: "command", text: trimmed }]);

      // コマンド名と引数を分離
      const [commandName, ...args] = trimmed.split(/\s+/);
      const command = commandsMap.get(commandName.toLowerCase());

      // コマンドが見つからない場合
      if (!command) {
        setOutputs((prev) => [
          ...prev,
          { type: "error", text: `command not found: ${commandName}` },
        ]);
      } else {
        // コマンド実行
        try {
          const result = await command.execute(args, createContext());

          if (result.kind === "outputs") {
            setOutputs((prev) => [...prev, ...result.outputs]);
          } else if (result.kind === "clear") {
            clearOutputs();
          }
        } catch (error) {
          setOutputs((prev) => [
            ...prev,
            {
              type: "error",
              text: `Error executing ${commandName}: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ]);
        }
      }

      // 履歴に追加（オプション指定時のみ）
      if (pushHistory) {
        setHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
      }

      // 入力をクリア
      setInput("");
      setSuggestions([]);
      setActiveSuggestionIndex(0);
    },
    [createContext, clearOutputs]
  );

  /**
   * キーボードイベントハンドラ
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Enter: コマンド実行
      if (e.key === "Enter") {
        e.preventDefault();
        void executeRaw(input);
        return;
      }

      // Tab: オートコンプリート
      if (e.key === "Tab") {
        e.preventDefault();
        if (suggestions.length > 0) {
          setInput(suggestions[activeSuggestionIndex]);
          setSuggestions([]);
          setActiveSuggestionIndex(0);
        }
        return;
      }

      // ArrowUp: オートコンプリート候補選択 or 履歴を遡る
      if (e.key === "ArrowUp") {
        e.preventDefault();

        // オートコンプリート候補がある場合は候補を選択
        if (suggestions.length > 0) {
          const newIndex = activeSuggestionIndex > 0
            ? activeSuggestionIndex - 1
            : suggestions.length - 1;
          setActiveSuggestionIndex(newIndex);
          return;
        }

        // 候補がない場合は履歴を遡る
        if (history.length === 0) return;
        const newIndex =
          historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
        return;
      }

      // ArrowDown: オートコンプリート候補選択 or 履歴を進む
      if (e.key === "ArrowDown") {
        e.preventDefault();

        // オートコンプリート候補がある場合は候補を選択
        if (suggestions.length > 0) {
          const newIndex = (activeSuggestionIndex + 1) % suggestions.length;
          setActiveSuggestionIndex(newIndex);
          return;
        }

        // 候補がない場合は履歴を進む
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
        return;
      }
    },
    [input, history, historyIndex, suggestions, activeSuggestionIndex, executeRaw]
  );

  /**
   * 入力変更時にオートコンプリート候補を更新
   */
  useEffect(() => {
    const newSuggestions = getSuggestions(input);
    setSuggestions(newSuggestions);
    setActiveSuggestionIndex(0);
  }, [input]);

  /**
   * 初期コマンド実行（マウント時のみ）
   */
  useEffect(() => {
    if (!initializedRef.current && initialCommand) {
      initializedRef.current = true;
      void executeRaw(initialCommand, { pushHistory: false });
    }
  }, [initialCommand, executeRaw]);

  return {
    input,
    setInput,
    outputs,
    suggestions,
    activeSuggestionIndex,
    executeRaw,
    handleKeyDown,
  };
}
