"use client";

import { useEffect, useRef } from "react";
import TerminalWindow from "./TerminalWindow";
import OutputList from "./OutputList";
import Prompt from "./Prompt";
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

  // 初回マウント時のみhelpを自動実行（React StrictModeで二重実行を防止）
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      executeRaw("help", { pushHistory: false });
    }
  }, [executeRaw]);

  return (
    <TerminalWindow>
      <OutputList outputs={outputs} />
      <AutoCompleteList
        suggestions={suggestions}
        activeIndex={activeSuggestionIndex}
      />
      <Prompt
        input={input}
        onInputChange={setInput}
        onKeyDown={handleKeyDown}
      />
    </TerminalWindow>
  );
}
