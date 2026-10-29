import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

// wireframe.png 구성: 원형 프로필 사진 → 이름 → 한 줄 소개 → 세로 링크 카드 목록
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-7 pb-16 pt-20 sm:px-8 sm:pt-24">
      <ThemeToggle />
      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />
      <LinkList links={profile.links} />
    </main>
  );
}
