"use client";

import { useEffect } from "react";
import { useTypewriter } from "./hooks/useTypewriter";
import type { Output } from "./lib/types";

interface OutputBlockProps {
  output: Output;
  index: number;
  canStart?: boolean;
  onComplete?: () => void;
}

export default function OutputBlock({ output, index, canStart = true, onComplete }: OutputBlockProps) {
  // text型のときのみタイプライターを実行
  // canStart=falseのときは空文字を渡してタイプライターを停止させる
  const { displayed, isDone } = useTypewriter({
    text: output.type === "text" && canStart ? output.text : "",
    speedMs: output.type === "text" ? output.speedMs : undefined,
    enabled: output.type === "text" && canStart, // canStartがfalseならタイプライター無効化
    startDelayMs: index === 0 ? 0 : 100,
  });

  // タイプライター完了時に親に通知（実際にテキストが表示されたときのみ）
  useEffect(() => {
    // 早期リターンで型を絞る（型ガード）
    if (output.type !== "text") return;

    if (isDone && canStart && output.text.length > 0 && onComplete) {
      onComplete();
    }
  }, [isDone, output, canStart, onComplete]);

  // コマンドエコー
  if (output.type === "command") {
    return (
      <div className="mb-2">
        <span className="text-phosphorDim">$ </span>
        <span className="text-phosphor">{output.text}</span>
      </div>
    );
  }

  // エラー
  if (output.type === "error") {
    return (
      <div className="mb-2 text-red-400">
        {output.text}
      </div>
    );
  }

  // テキスト（タイプライター）
  if (output.type === "text") {
    return (
      <div className="mb-2 text-phosphor whitespace-pre-wrap">
        {displayed}
      </div>
    );
  }

  // リスト
  if (output.type === "list") {
    return (
      <div className="mb-4">
        {output.title && (
          <div className="text-phosphor font-semibold mb-2">{output.title}</div>
        )}
        <div className="space-y-1">
          {output.items.map((item, i) => (
            <div key={i} className="text-phosphorDim">
              • {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // リンク
  if (output.type === "links") {
    return (
      <div className="mb-4">
        {output.title && (
          <div className="text-phosphor font-semibold mb-2">{output.title}</div>
        )}
        <div className="space-y-1">
          {output.items.map((link, i) => (
            <div key={i}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
                {link.external && " ↗"}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
