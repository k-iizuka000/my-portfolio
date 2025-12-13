/**
 * Typewriter Hook
 * テキストを1文字ずつ表示するタイプライター効果を提供するカスタムフック
 */

"use client";

import { useState, useEffect, useRef } from "react";

export type UseTypewriterOptions = {
  /** 表示するテキスト */
  text: string;
  /** 1文字あたりの表示速度（ミリ秒）デフォルト: 20ms */
  speedMs?: number;
  /** 開始前の遅延（ミリ秒）デフォルト: 0ms */
  startDelayMs?: number;
  /** タイプライター効果を有効にするか デフォルト: true */
  enabled?: boolean;
  /** 完了時のコールバック */
  onDone?: () => void;
};

export type UseTypewriterReturn = {
  /** 現在表示されているテキスト */
  displayed: string;
  /** タイプライター効果が完了したか */
  isDone: boolean;
};

/**
 * タイプライター効果を提供するカスタムフック
 */
export function useTypewriter(
  options: UseTypewriterOptions
): UseTypewriterReturn {
  const {
    text,
    speedMs = 20,
    startDelayMs = 0,
    enabled = true,
    onDone,
  } = options;

  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const doneCalledRef = useRef(false);

  useEffect(() => {
    // テキスト変更時やenabled変更時にdoneCalledRefをリセット
    doneCalledRef.current = false;

    // タイプライター効果が無効の場合は即座に全テキストを表示
    if (!enabled) {
      setDisplayed(text);
      setIsDone(true);
      if (onDone && !doneCalledRef.current) {
        doneCalledRef.current = true;
        onDone();
      }
      return;
    }

    // テキスト変更時にリセット
    setDisplayed("");
    setIsDone(false);

    // 開始遅延
    if (startDelayMs > 0) {
      timeoutRef.current = setTimeout(() => {
        startTypewriting();
      }, startDelayMs);
    } else {
      startTypewriting();
    }

    function startTypewriting() {
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayed(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutRef.current = setTimeout(typeNextChar, speedMs);
        } else {
          // 完了
          setIsDone(true);
          if (onDone && !doneCalledRef.current) {
            doneCalledRef.current = true;
            onDone();
          }
        }
      };

      typeNextChar();
    }

    // クリーンアップ
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speedMs, startDelayMs, enabled, onDone]);

  return {
    displayed,
    isDone,
  };
}
