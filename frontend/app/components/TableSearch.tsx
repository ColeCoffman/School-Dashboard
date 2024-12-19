"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TableSearch() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto items-center flex gap-2 text-xs rounded-full border ring-[1.5px] ring-gray-300 px-2"
    >
      <Image src="/search.png" alt="Search" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 outline-none bg-transparent"
      />
    </form>
  );
}
