import { auth } from "@/lib/auth";
import payloadConfig from "@/payload.config";
import { NextResponse } from "next/server";
import { getPayload } from "payload";

export const GET = async () => {
  const session = await auth()

  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({
    config: payloadConfig
  })

  const attendance = await payload.find({
    collection: "attendance-records",
    where: {
      attendee: {
        equals: user.id
      }
    },
    select: {
      event: true,
      manager: true,
      timestamp: true
    },
    sort: "-createdAt",
    depth: 2
  })

  const data = attendance.docs.map(record => ({
    id: record.id,
    timestamp: record.timestamp,
    event: typeof record.event === "string" ? {
      id: record.event,
      title: "Unknown Event",
      type: "Other"
    } : {
      id: record.event.id,
      title: record.event.title,
      type: record.event.type
    },
    manager: typeof record.manager === "string" ? record.manager : record.manager.email
  }))

  return NextResponse.json({ data }, {
    headers: {
      'Cache-Control': 'private, max-age=600'
    }
  });
}