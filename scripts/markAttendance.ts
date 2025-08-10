import { AttendanceRecord } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

const EVENT_ID = ""

main(EVENT_ID)

async function main(eventId: string) {
  const payload = await getPayload({
    config: payloadConfig
  })

  const { docs } = await payload.find({
    collection: "manager-records",
    where: {
      event: {
        equals: eventId
      }
    }
  })

  await payload.delete({
    collection: "attendance-records",
    where: {
      event: {
        equals: eventId
      }
    }
  })

  const allRecords = docs.reduce((acc, doc) => {
    acc.push(...(doc.records as any).map((r: {
      attendee: string;
      timestamp: string;
    }) => ({
      ...r,
      event: doc.event,
      manager: doc.manager
    })))
    
    return acc;
  }, [] as AttendanceRecord[])

  for (const record of allRecords) {
    await payload.create({
      collection: "attendance-records",
      data: {
        event: record.event,
        attendee: record.attendee,
        manager: record.manager,
        timestamp: record.timestamp
      }
    })
  }

  console.log(`Marked attendance for ${allRecords.length} attendees in event ${eventId}`);
}