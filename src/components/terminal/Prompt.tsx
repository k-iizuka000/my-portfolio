"use client";

import { useRef, useEffect, useCallback } from "react";
import Cursor from "./Cursor";

interface PromptProps {
  input: string;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Prompt({ input, onInputChange, onKeyDown }: PromptProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // カーソルを末尾に固定する関数
  const forceCaretToEnd = useCallback(() => {
    const el = inputRef.current;
    if (el && !el.getAttribute("data-composing")) {
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  }, []);

  // フォーカス管理（初期マウント時）
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 入力変更時にカーソルを末尾に固定
  useEffect(() => {
    forceCaretToEnd();
  }, [input, forceCaretToEnd]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
    forceCaretToEnd();
  };

  const handleFocus = () => {
    forceCaretToEnd();
  };

  // マウスドラッグ選択を防止（クリック位置へのキャレット移動自体を抑止）
  const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    // 常にデフォルト動作を防止（クリック位置へのキャレット移動を抑止）
    e.preventDefault();
    inputRef.current?.focus();
    forceCaretToEnd();
  };

  // IME入力の開始/終了を追跡
  const handleCompositionStart = () => {
    inputRef.current?.setAttribute("data-composing", "true");
  };

  const handleCompositionEnd = () => {
    inputRef.current?.removeAttribute("data-composing");
    forceCaretToEnd();
  };

  // キー操作でカーソル移動を防止
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // IME変換中は何もブロックしない（変換候補の選択/確定に必要）
    if (e.nativeEvent.isComposing) {
      return;
    }
    // カーソル移動系のキーを無効化
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      return;
    }
    // 元のonKeyDownを呼び出し
    onKeyDown(e);
  };

  return (
    <div
      className="flex-shrink-0 relative sticky bottom-0 bg-terminalBg px-4 pt-3 border-t border-[#1f3a2a] z-10"
      onClick={handleContainerClick}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-300 font-semibold">$</span>
        {/* 入力とカーソルは相対配置で重ねる */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onMouseDown={handleMouseDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder="コマンドを入力... (help でコマンド一覧)"
            className="w-full bg-transparent outline-none text-phosphor caret-transparent"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
          <span
            className="pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{ left: `${input.length}ch` }}
          >
            <Cursor />
          </span>
        </div>
      </div>

      <div>
        <span className="hint-text">
          💡 試してみるコマンド: whoami, skills, projects, github, help
        </span>
      </div>
    </div>
  );
}
