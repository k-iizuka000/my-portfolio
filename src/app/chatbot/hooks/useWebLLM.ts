"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MLCEngine } from "@mlc-ai/web-llm";
import { SYSTEM_PROMPT } from "../lib/systemPrompt";

const MODEL_ID = "gemma-2-2b-it-q4f16_1-MLC";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export function useWebLLM() {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [initProgress, setInitProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const engineRef = useRef<MLCEngine | null>(null);

  useEffect(() => {
    const initEngine = async () => {
      try {
        const engine = new MLCEngine();
        engine.setInitProgressCallback((progress: { progress: number }) => {
          setInitProgress(Math.round(progress.progress * 100));
        });
        await engine.reload(MODEL_ID);
        engineRef.current = engine;
        setIsReady(true);
      } catch (err) {
        console.error('Initialization error:', err);
        setError("モデルノ読ミ込ミニ失敗シマシタ。再読込シテクダサイ。");
      }
    };
    initEngine();
  }, []);

  const sendMessage = useCallback(
    async (messages: Message[]): Promise<string> => {
      if (!engineRef.current) throw new Error("Engine not ready");
      setIsLoading(true);
      try {
        const response = await engineRef.current.chat.completions.create({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
        });
        return response.choices[0]?.message?.content || "";
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, isReady, initProgress, error, sendMessage };
}
