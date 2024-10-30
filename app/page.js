"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated" && session.user.user.is_staff) {
    return router.push("/dashboard");
  }

  if (status === "unauthenticated") {
    return router.push("/login");
  }

  return (
    <main>
      home
    </main>
  );
}
