"use client";

import { ReactNode } from "react";

interface TerminalWindowProps {
  children: ReactNode;
  onRootClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function TerminalWindow({
  children,
  onRootClick,
}: TerminalWindowProps) {
  return (
    <div
      className="w-screen min-h-[100svh] flex items-stretch justify-center p-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
      onClick={onRootClick}
    >
      <div className="w-full h-full bg-terminalBg rounded-lg border border-phosphor/30 overflow-hidden terminal-glow crt-glow scanlines animate-flicker crt flex flex-col">
        {/* ウィンドウタイトルバー */}
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-phosphor/20">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-phosphorDim text-sm font-mono">
            terminal@portfolio
          </span>
        </div>

        {/* ターミナルコンテンツ */}
        <div className="flex-1 font-mono text-sm md:text-base flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
