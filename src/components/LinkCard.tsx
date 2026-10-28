"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  initialCount?: number;
};

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    // sendBeacon은 페이지가 이동해도 요청이 끊기지 않음
    const payload = JSON.stringify({ linkId: link.id });
    const sent =
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon("/api/clicks", new Blob([payload], { type: "application/json" }));
    if (!sent) {
      fetch("/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
    setCount((c) => (c === undefined ? c : c + 1));
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="relative flex min-h-16 items-center justify-center rounded-2xl border-2 border-neutral-800 bg-white px-16 py-4 font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-green-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 dark:border-neutral-600 dark:bg-neutral-800 dark:hover:border-green-400"
    >
      <span className="truncate">{link.title}</span>
      {count !== undefined && (
        <span className="absolute right-4 text-xs text-neutral-500 dark:text-neutral-400">
          {count.toLocaleString()}회 클릭
        </span>
      )}
    </a>
  );
}
