"use client";

import TypewriterText from "./TypewriterText";

interface MessageBoxProps {
  role: "user" | "assistant";
  content: string;
  isLatest?: boolean;
}

export default function MessageBox({ role, content, isLatest }: MessageBoxProps) {
  const isBot = role === "assistant";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div className={`max-w-[80%] ${isBot ? "order-2" : "order-1"}`}>
        <div className={`flex items-center gap-2 mb-1 ${isBot ? "" : "justify-end"}`}>
          {isBot && <span className="text-2xl">🤖</span>}
          <span className="text-white text-sm font-bold">
            {isBot ? "KEI-bot" : "あなた"}
          </span>
        </div>
        <div
          className={`p-3 border-4 border-black ${
            isBot
              ? "bg-slate-800 text-white"
              : "bg-blue-900 text-white"
          }`}
          style={{
            boxShadow: "4px 4px 0px rgba(0,0,0,0.5)",
            imageRendering: "pixelated",
          }}
        >
          {isBot && isLatest ? (
            <TypewriterText text={content} speed={30} />
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
