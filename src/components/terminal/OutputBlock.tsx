"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTypewriter } from "./hooks/useTypewriter";
import type { Output, SkillLevel } from "./lib/types";

interface OutputBlockProps {
  output: Output;
  index: number;
  canStart?: boolean;
  onComplete?: () => void;
}

function renderLevelBar(level: SkillLevel) {
  const full = "█".repeat(level);
  const empty = "░".repeat(5 - level);
  return { full, empty };
}

export default function OutputBlock({ output, index, canStart = true, onComplete }: OutputBlockProps) {
  const onCompleteRef = useRef<OutputBlockProps["onComplete"]>(onComplete);
  onCompleteRef.current = onComplete;
  const outputText = output.type === "text" ? output.text : "";

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

    if (isDone && canStart && outputText.length > 0 && onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, [isDone, output.type, outputText, canStart]);

  // コマンドエコー
  if (output.type === "command") {
    return (
      <div className="mb-2">
        <span className="text-phosphorDim text-glow">$ </span>
        <span className="text-phosphor text-glow">{output.text}</span>
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
        <div className="space-y-1" role="list">
          {output.items.map((item, i) => (
            <div key={`list-${i}`} className="text-phosphorDim" role="listitem">
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
        <div className="space-y-1" role="list">
          {output.items.map((link, i) => (
            <div key={`link-${link.label}-${i}`} role="listitem">
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={link.external ? `${link.label} (新しいタブで開く)` : link.label}
              >
                {link.label}
                {link.external && <span aria-hidden="true"> ↗</span>}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // スキル
  if (output.type === "skills") {
    return (
      <div className="mb-4">
        {output.title && (
          <div className="text-phosphor font-semibold mb-2">{output.title}</div>
        )}
        <div className="space-y-3" role="list">
          {output.groups.map((g) => (
            <div key={g.category} role="listitem">
              <div className="text-phosphor mb-1">[{g.category}]</div>
              <div className="space-y-1 pl-2 whitespace-pre-wrap" role="list">
                {g.items.map((s) => {
                  const bar = renderLevelBar(s.level);
                  return (
                    <div key={`${g.category}:${s.name}`} className="text-phosphorDim" role="listitem">
                      <span>• </span>
                      <span className="text-phosphor">{s.name}</span>
                      <span>{"  "}</span>
                      <span>[{s.levelLabel ?? `L${s.level}`}]</span>
                      <span>{" "}</span>
                      <span className="text-phosphor">{bar.full}</span>
                      <span>{bar.empty}</span>
                      {typeof s.years === "number" && <span>{`  (${s.years}y)`}</span>}
                      {s.keywords?.length ? <span>{`  ${s.keywords.map((k) => `[${k}]`).join(" ")}`}</span> : null}
                      {s.note ? <span>{`  - ${s.note}`}</span> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {output.legend?.bar && (
          <div className="mt-2 text-phosphorDim text-xs">{output.legend.bar}</div>
        )}
      </div>
    );
  }

  // プロジェクト
  if (output.type === "project") {
    const p = output.project;
    return (
      <div className="mb-5" role="article" aria-label={p.title}>
        <div className="text-phosphor whitespace-pre-wrap">
          ── {p.title}
          {p.period ? <span className="text-phosphorDim">{`  (${p.period})`}</span> : null}
        </div>
        <div className="mt-1 space-y-1 pl-2 text-phosphorDim" role="list">
          {(p.role || p.domain || p.team) && (
            <div role="listitem">
              •{" "}
              {p.role ? `[Role: ${p.role}] ` : ""}
              {p.domain ? `[Domain: ${p.domain}] ` : ""}
              {p.team ? `[Team: ${p.team}]` : ""}
            </div>
          )}
          {p.highlights?.length ? (
            <div role="listitem">• Highlights: {p.highlights.map((h) => `[${h}]`).join(" ")}</div>
          ) : null}
          {p.stack?.length ? (
            <div role="listitem">• Stack: {p.stack.map((t) => `[${t}]`).join(" ")}</div>
          ) : null}
          {p.scope?.length ? (
            <div role="listitem">
              • Scope:
              <div className="pl-4 space-y-0.5" role="list">
                {p.scope.map((s, i) => <div key={`scope-${i}`} role="listitem">• {s}</div>)}
              </div>
            </div>
          ) : null}
          {p.achievements?.length ? (
            <div role="listitem">
              • Achievements:
              <div className="pl-4 space-y-0.5" role="list">
                {p.achievements.map((a, i) => <div key={`achievement-${i}`} role="listitem">• {a}</div>)}
              </div>
            </div>
          ) : null}
          {(p.impact?.summary || p.impact?.metrics?.length) ? (
            <div role="listitem">
              • Impact:
              <div className="pl-4 space-y-0.5" role="list">
                {p.impact?.summary ? <div role="listitem">• {p.impact.summary}</div> : null}
                {p.impact?.metrics?.map((m, i) => <div key={`metric-${m.label}-${i}`} role="listitem">• {m.label}: {m.value}</div>)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // デモ
  if (output.type === "demo") {
    return (
      <div className="mb-4">
        {output.title && (
          <div className="text-phosphor font-semibold mb-2">{output.title}</div>
        )}
        <div className="space-y-2 whitespace-pre-wrap" role="list">
          {output.items.map((d, i) => (
            <div key={`${d.label}:${d.href}:${i}`} className="text-phosphorDim" role="listitem">
              <div>
                <span>• </span>
                {d.external ? (
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-phosphor"
                    aria-label={`${d.label} (新しいタブで開く)`}
                  >
                    {d.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                ) : (
                  <Link
                    href={d.href}
                    className="text-phosphor"
                    aria-label={d.label}
                  >
                    {d.label}
                  </Link>
                )}
                {d.note ? <span>{`  [${d.note}]`}</span> : null}
              </div>
              {(d.description || d.tech?.length) && (
                <div className="pl-4" role="list">
                  {d.description ? <div role="listitem">• {d.description}</div> : null}
                  {d.tech?.length ? <div role="listitem">• Tech: {d.tech.map((t) => `[${t}]`).join(" ")}</div> : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
