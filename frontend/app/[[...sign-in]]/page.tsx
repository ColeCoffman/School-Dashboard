"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Homepage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata?.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user]);

  console.log(user, router);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-schoolSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={24} height={24} />
            School Dashboard
          </h1>
          <h2 className="text-gray-500">Sign in to your account to continue</h2>
          <Clerk.GlobalError className="text-red-500" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-gray-500 text-sm">
              Username or Email
            </Clerk.Label>
            <Clerk.Input
              type="text"
              className="bg-gray-300 p-2 rounded-md ring-1"
              required
            />
            <Clerk.FieldError className="text-red-500 text-xs" />
          </Clerk.Field>

          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-gray-500 text-sm">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              className="bg-gray-300 p-2 rounded-md ring-1"
              required
            />
            <Clerk.FieldError className="text-red-500 text-xs" />
          </Clerk.Field>

          <SignIn.Action
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
            submit
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
