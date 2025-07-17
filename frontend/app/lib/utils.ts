import { auth } from "@clerk/nextjs/server";

export async function getRole() {
  try {
    const { sessionClaims } = await auth();
    return (sessionClaims?.metadata as { role?: string })?.role || "guest";
  } catch (error) {
    return "guest";
  }
}
