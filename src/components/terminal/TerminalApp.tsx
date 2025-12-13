"use client";

import { useEffect, useRef } from "react";
import TerminalWindow from "./TerminalWindow";
import OutputList from "./OutputList";
import Prompt, { type PromptHandle } from "./Prompt";
import AutoCompleteList from "./AutoCompleteList";
import { useTerminal } from "./hooks/useTerminal";

export default function TerminalApp() {
  const {
    input,
    setInput,
    outputs,
    suggestions,
    activeSuggestionIndex,
    executeRaw,
    handleKeyDown,
  } = useTerminal();

  const initializedRef = useRef(false);
  const promptRef = useRef<PromptHandle>(null);

  // 初回マウント時のみhelpを自動実行(React StrictModeで二重実行を防止)
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      executeRaw("help", { pushHistory: false });
    }
  }, [executeRaw]);

  // 画面全体クリックで入力にフォーカス
  // テキスト選択を阻害しないよう onClick を使用(onMouseDown は不可)
  const handleRootClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // ガード: テキスト選択中はフォーカスしない（isCollapsed: ブラウザ互換性向上）
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) {
      return;
    }

    // ガード: e.targetがElement以外の場合は処理しない
    if (!(e.target instanceof Element)) {
      return;
    }
    const target = e.target;

    // ガード: リンク・ボタン等の操作要素をクリックした場合はフォーカスしない
    if (
      target.closest(
        "a,button,input,textarea,select,[data-no-terminal-focus]"
      )
    ) {
      return;
    }

    // 入力欄の末尾にフォーカス
    promptRef.current?.focusToEnd();
  };

  return (
    <TerminalWindow onRootClick={handleRootClick}>
      <OutputList outputs={outputs} />
      <AutoCompleteList
        suggestions={suggestions}
        activeIndex={activeSuggestionIndex}
      />
      <Prompt
        ref={promptRef}
        input={input}
        onInputChange={setInput}
        onKeyDown={handleKeyDown}
      />
    </TerminalWindow>
  );
}
