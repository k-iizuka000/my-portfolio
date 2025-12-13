"use client";

import { useRef, useEffect } from "react";
import Cursor from "./Cursor";

interface PromptProps {
  input: string;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Prompt({ input, onInputChange, onKeyDown }: PromptProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // フォーカス管理
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex items-center gap-2 sticky bottom-0 bg-terminalBg px-4 py-2"
      onClick={handleContainerClick}
    >
      <span className="text-phosphor">$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 bg-transparent outline-none text-phosphor caret-transparent"
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
      />
      <Cursor />
    </div>
  );
}
