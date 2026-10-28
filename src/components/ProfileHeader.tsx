import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name} 프로필 사진`}
        width={224}
        height={224}
        priority
        unoptimized
        className="h-48 w-48 rounded-full object-cover ring-4 ring-white shadow-md sm:h-56 sm:w-56 dark:ring-neutral-800"
      />
      <h1 className="mt-6 text-2xl font-bold">{name}</h1>
      <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">{bio}</p>
    </header>
  );
}
