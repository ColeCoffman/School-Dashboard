import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Navbar() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;

  return (
    <div className="flex items-center justify-between p-4">
      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full border ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="Search" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 outline-none bg-transparent"
        />
      </div>
      {/* icons and user */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="Message" width={20} height={20} />
        </div>
        {/* Announcement */}
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image
            src="/announcement.png"
            alt="Announcement"
            width={20}
            height={20}
          />
          {/* Announcement count */}
          <div className="absolute -top-3 -right-2 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
        {/* User */}
        <div className="flex flex-col">
          <span className="text-sm leading-3 font-medium">
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.username}
          </span>
          <span className="text-[10px] text-gray-500 text-right">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        </div>
        {/* User Avatar */}
        {/* <Image
          src="/avatar.png"
          alt="User"
          width={36}
          height={36}
          className="rounded-full"
        /> */}
        <UserButton />
      </div>
    </div>
  );
}
