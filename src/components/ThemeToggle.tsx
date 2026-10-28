"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="fixed right-5 top-5 rounded-full border border-white/70 bg-white/45 p-2.5 text-lg leading-none shadow-[0_4px_16px_-8px_rgb(30_50_90/0.3)] backdrop-blur-xl transition duration-300 hover:bg-white/65 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10"
    >
      {/* 마운트 전에는 서버/클라이언트 불일치를 피하려고 비워 둠 */}
      <span className="block h-5 w-5">{isDark === null ? "" : isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}
