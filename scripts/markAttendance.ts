import { AttendanceRecord } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

// https://nittorientation.in/api/events?select[id]=true&select[title]=true

const EVENT_ID = "68aa9e222b04a0f6bd106424"

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

  const uniqueRecordsMap = new Map<string, AttendanceRecord>();

  for (const record of allRecords) {
    const attendeeId = typeof record.attendee === "string" ? record.attendee : record.attendee.id
    if (!uniqueRecordsMap.has(attendeeId)) {
      uniqueRecordsMap.set(attendeeId, record);
    }
  }

  const uniqueRecords = Array.from(uniqueRecordsMap.values());

  let len = 0
  for (const record of Object.values(uniqueRecords)) {
    len += 1
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

  console.log(`Marked attendance for ${len} attendees in event ${eventId}`);

  payload.destroy()
}

main(EVENT_ID).then(() => {
  console.log('done')
  process.exit(0)
}).catch(console.error)