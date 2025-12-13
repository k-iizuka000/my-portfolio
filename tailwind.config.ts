import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        terminalBg: "var(--terminal-bg)",
        phosphor: "var(--phosphor-green)",
        phosphorDim: "var(--phosphor-green-dim)",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      keyframes: {
        scanline: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.9" },
          "50%": { opacity: "1" },
        },
        cursor: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        scanline: "scanline 6s linear infinite",
        flicker: "flicker 2.5s ease-in-out infinite",
        cursor: "cursor 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
