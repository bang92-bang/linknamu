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
      className="fixed right-4 top-4 rounded-full border border-neutral-200 bg-white p-2.5 text-lg leading-none shadow-sm transition hover:scale-105 dark:border-neutral-700 dark:bg-neutral-800"
    >
      {/* 마운트 전에는 서버/클라이언트 불일치를 피하려고 비워 둠 */}
      <span className="block h-5 w-5">{isDark === null ? "" : isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}
