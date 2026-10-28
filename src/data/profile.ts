export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
  links: LinkItem[];
};

// TODO: 아래는 화면 확인용 더미 값입니다. 실제 내용으로 교체하세요.
// - image: public/ 폴더에 사진을 넣고 경로를 바꾸면 됩니다 (예: "/me.jpg")
// - id는 클릭 수 집계의 키로 쓰이므로 한 번 정하면 바꾸지 않는 것이 좋습니다.
export const profile: Profile = {
  name: "방클로",
  bio: "세계 최강 바이브코더",
  image: "/profile.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/your-id" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/in/your-id" },
    { id: "blog", title: "Blog", url: "https://example.com" },
  ],
};
