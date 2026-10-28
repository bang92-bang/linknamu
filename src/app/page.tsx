import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

async function loadCounts(): Promise<Record<string, number> | null> {
  if (!process.env.MONGODB_URI) return null;
  try {
    return await getClickCounts();
  } catch (error) {
    console.error("[page] 클릭 수 조회 실패", error);
    return null;
  }
}

// wireframe.png 구성: 원형 프로필 사진 → 이름 → 한 줄 소개 → 세로 링크 카드 목록
export default async function Home() {
  const counts = await loadCounts();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-7 pb-16 pt-20 sm:px-8 sm:pt-24">
      <ThemeToggle />
      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />
      <nav aria-label="링크 목록" className="mt-12 flex flex-col gap-5 sm:gap-6">
        {profile.links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            initialCount={counts ? (counts[link.id] ?? 0) : undefined}
          />
        ))}
      </nav>
    </main>
  );
}
