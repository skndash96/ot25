"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthGuard(completeProfile = true) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    const user = session?.user
    if (!user) {
      router.push("/login");
      return
    }

    if (!user.rollNumber) {
      router.push("/profile/update");
    }
  }, [session, status]);

  return null
}