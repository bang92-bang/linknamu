"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Props = {
  links: LinkItem[];
};

export default function LinkList({ links }: Props) {
  // 데이터를 받기 전에는 모든 링크를 0회로 표시
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Record<string, number>) => {
        if (!cancelled) setCounts(data);
      })
      .catch((error) => console.error("[clicks] 클릭 수 조회 실패", error));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (linkId: string) => {
    setCounts((prev) => ({ ...prev, [linkId]: (prev[linkId] ?? 0) + 1 }));
  };

  return (
    <nav aria-label="링크 목록" className="mt-12 flex flex-col gap-5 sm:gap-6">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          count={counts[link.id] ?? 0}
          onClick={() => handleClick(link.id)}
        />
      ))}
    </nav>
  );
}
