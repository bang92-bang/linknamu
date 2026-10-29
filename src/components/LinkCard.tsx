"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  count: number;
  onClick: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
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
    onClick();
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="relative flex min-h-[3.75rem] items-center justify-center rounded-3xl border border-white/70 bg-white/45 px-16 py-4 text-[15px] font-medium shadow-[0_14px_36px_-10px_rgb(30_50_90/0.35),0_4px_12px_-4px_rgb(30_50_90/0.15)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_18px_44px_-10px_rgb(30_50_90/0.42),0_6px_14px_-4px_rgb(30_50_90/0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_14px_36px_-10px_rgb(0_0_0/0.7),0_4px_12px_-4px_rgb(0_0_0/0.4)] dark:hover:bg-white/10"
    >
      <span className="truncate">{link.title}</span>
      <span className="absolute right-5 text-xs text-slate-400 dark:text-slate-500">
        {count.toLocaleString()}회
      </span>
    </a>
  );
}
