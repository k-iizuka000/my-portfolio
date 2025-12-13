"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import MessageBox from "./MessageBox";
import { useWebLLM } from "../hooks/useWebLLM";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "コンニチハ...ワタシハ KEI-bot デス。ナニカオ手伝イシマショウカ？ ピコッ",
};

const MAX_HISTORY = 10;

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const { isLoading, isReady, initProgress, error, sendMessage } = useWebLLM();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isReady || isLoading) return;

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      content: input
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const recentMessages = messages.slice(-MAX_HISTORY);
      const response = await sendMessage([...recentMessages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      })));
      const assistantMessage: Message = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: response
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        role: "assistant",
        content: "エラー...再起動シマス...ガガガ",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  }, [input, isReady, isLoading, messages, sendMessage]);

  if (!isReady) {
    return (
      <div className="nes-container is-dark with-title flex-1 flex flex-col">
        <p className="title">KEI-bot</p>
        <div className="flex flex-col items-center gap-4 p-8">
          <p className="text-white">モデルヲ読ミ込ミ中デス...</p>
          <progress
            className="nes-progress is-primary"
            value={initProgress}
            max={100}
          />
          <p className="text-white text-sm">{initProgress}%</p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="nes-container is-dark with-title flex-1 flex flex-col w-full max-w-2xl mx-auto">
      <p className="title">KEI-bot Chat</p>

      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <MessageBox
            key={message.id}
            role={message.role}
            content={message.content}
            isLatest={message.id === messages[messages.length - 1]?.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          className="nes-input is-dark flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`nes-btn ${isLoading ? "is-disabled" : "is-primary"}`}
          disabled={isLoading}
        >
          {isLoading ? "..." : "送信"}
        </button>
      </form>
    </div>
  );
}
