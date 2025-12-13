"use client";

import { useEffect, useRef, useState } from "react";
import OutputBlock from "./OutputBlock";
import type { Output } from "./lib/types";

interface OutputListProps {
  outputs: Output[];
}

export default function OutputList({ outputs }: OutputListProps) {
  const outputsEndRef = useRef<HTMLDivElement>(null);
  // 各出力のタイプライター完了状態を追跡
  const [completedIndices, setCompletedIndices] = useState<Set<number>>(new Set());

  // 新しい出力が追加されたら最下部へスクロール
  useEffect(() => {
    outputsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs]);

  // outputsが完全にクリアされたときのみリセット
  useEffect(() => {
    if (outputs.length === 0) {
      setCompletedIndices(new Set());
    }
  }, [outputs.length]);

  // 指定されたインデックスの出力が完了したことを記録
  const handleOutputComplete = (index: number) => {
    setCompletedIndices((prev) => new Set(prev).add(index));
  };

  // 指定されたインデックスが開始可能か判定
  // text型は前のtext型が完了していることが条件
  const canStartTypewriter = (index: number): boolean => {
    if (index === 0) return true;

    // 前のtext出力を探す
    for (let i = index - 1; i >= 0; i--) {
      if (outputs[i]?.type === "text") {
        // 前のtext出力が完了しているか確認
        return completedIndices.has(i);
      }
    }

    // 前にtext出力がない場合は開始可能
    return true;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {outputs.map((output, index) => (
        <OutputBlock
          key={index}
          output={output}
          index={index}
          canStart={canStartTypewriter(index)}
          onComplete={() => handleOutputComplete(index)}
        />
      ))}
      <div ref={outputsEndRef} />
    </div>
  );
}
