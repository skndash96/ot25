import payloadConfig from "@/payload.config";
import { writeFile } from "fs/promises";
import { join } from "path";
import { getPayload } from "payload";

const EVENT_ID = "68ac972a60776b782428dc2b"

async function main(eventId: string) {
  const payload = await getPayload({
    config: payloadConfig
  })

  const { docs } = await payload.find({
    collection: "registrations",
    where: {
      event: {
        equals: eventId
      }
    },
    depth: 5,
    limit: 10000000000
  })

  const mappedDocs = docs.map(d => ({
    id: d.id,
    teamName: d.teamName,
    event: typeof d.event === "string" ? d.event : d.event.title,
    leader: typeof d.user === 'string' ? {} : {
      name: d.user.name,
      gender: d.user.gender,
      email: d.user.email,
      ph: d.user.phoneNumber,
      rollNumber: d.user.phoneNumber
    },
    members: d.members.map(m => m.user).map(u => (typeof u === 'string' ? {} : { name: u.name, email: u.email, ph: u.phoneNumber, rollNumber: u.rollNumber, department: u.department }))
  }))

  await writeFile(join(process.cwd(), `tmp/registrations-${eventId}.json`), JSON.stringify(mappedDocs, null, 2))
  
  payload.destroy()
}

main(EVENT_ID).then(() => {
  console.log('done')
  process.exit(0)
}).catch(console.error)