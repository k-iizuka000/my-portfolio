"use client";

import { DotGothic16 } from "next/font/google";
import ChatContainer from "./components/ChatContainer";

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
});

export default function ChatbotPage() {
  return (
    <main className={`h-screen flex flex-col bg-[#1a1a2e] p-2 sm:p-4 ${dotGothic.className}`}>
      <ChatContainer />
    </main>
  );
}
