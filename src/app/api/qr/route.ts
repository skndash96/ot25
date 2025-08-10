import { auth } from "@/lib/auth";
import { encrypt } from "@/lib/encrypt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await auth()

  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = encrypt(`${user.id}-${user.rollNumber}-${user.name}`)

  return NextResponse.json({ token });
}