import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="rounded-full bg-gradient-to-b from-white to-sky-100/80 p-1 shadow-[0_18px_40px_-12px_rgb(30_50_90/0.35),0_4px_10px_-4px_rgb(30_50_90/0.2)] dark:from-slate-600 dark:to-slate-800 dark:shadow-[0_18px_40px_-12px_rgb(0_0_0/0.6)]">
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={160}
          height={160}
          priority
          unoptimized
          className="h-36 w-36 rounded-full object-cover object-[center_20%] sm:h-40 sm:w-40"
        />
      </div>
      <h1 className="mt-7 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
        {bio}
      </p>
    </header>
  );
}
