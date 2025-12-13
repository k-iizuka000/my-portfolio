"use client";

import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import Cursor from "./Cursor";

interface PromptProps {
  input: string;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface PromptHandle {
  focus: () => void;
  focusToEnd: () => void;
}

const Prompt = forwardRef<PromptHandle, PromptProps>(
  ({ input, onInputChange, onKeyDown }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    // マウス起点でのフォーカスかどうかを判定するフラグ
    const isMouseFocusRef = useRef(false);

    // カーソルを末尾に固定する関数
    const forceCaretToEnd = useCallback(() => {
      const el = inputRef.current;
      if (el && !el.getAttribute("data-composing")) {
        const len = el.value.length;
        el.setSelectionRange(len, len);
      }
    }, []);

    // 親から呼べるメソッドを公開
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      focusToEnd: () => {
        inputRef.current?.focus();
        forceCaretToEnd();
      },
    }));

    // フォーカス管理（初期マウント時）
    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    // 入力変更時にカーソルを末尾に固定
    useEffect(() => {
      forceCaretToEnd();
    }, [input, forceCaretToEnd]);

    // PointerDown: マウス起点フラグを立てる（選択開始を邪魔しない）
    const handlePointerDown = () => {
      isMouseFocusRef.current = true;
    };

    // Focus: マウス起点の場合は末尾固定しない（選択開始を優先）
    const handleFocus = () => {
      if (!isMouseFocusRef.current) {
        forceCaretToEnd();
      }
      // フラグはリセット
      isMouseFocusRef.current = false;
    };

    // MouseUp: 選択がない場合のみ末尾固定（通常クリック時の挙動）
    const handleMouseUp = () => {
      const el = inputRef.current;
      if (!el || el.getAttribute("data-composing")) return;

      // 選択がない場合のみ末尾固定
      if (el.selectionStart === el.selectionEnd) {
        forceCaretToEnd();
      }
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
      <div className="flex-shrink-0 relative sticky bottom-0 bg-terminalBg px-4 pt-3 border-t border-[#1f3a2a] z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-green-300 font-semibold text-glow">$</span>
          {/* 入力とカーソルは相対配置で重ねる */}
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onPointerDown={handlePointerDown}
              onMouseUp={handleMouseUp}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder="コマンドを入力... (help でコマンド一覧)"
              className="w-full bg-transparent outline-none text-phosphor caret-transparent"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="コマンド入力"
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
            試してみるコマンド: whoami, skills, projects, github, help
          </span>
        </div>
      </div>
    );
  }
);

Prompt.displayName = "Prompt";

export default Prompt;
