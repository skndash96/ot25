import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
  const q = new URLSearchParams(req.url.split('?').pop() || "")

  revalidateTag('events')

  if (q.has("id")) {
    const id = q.get("id")
    revalidateTag(`event-${id}`)
  }

  return new Response("Revalidated successfully", { status: 200 });
}