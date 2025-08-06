'use server'

import { departments } from "@/client/utils/departments"
import { auth } from "@/lib/auth"
import payloadConfig from "@/payload.config"
import { getPayload } from "payload"
import { z } from "zod"

const inputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone Number must be 10 digits"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  rollNumber: z.string().min(1, "Roll Number is required"),
  department: z.enum(departments, "Department is required and should be valid"),
})

export async function updateProfile(data: any) {
  const payload = await getPayload({ config: payloadConfig })
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  const parsedData = inputSchema.safeParse(data)

  if (!parsedData.success) {
    throw new Error(parsedData.error.message)
  }

  await payload.update({
    collection: "users",
    id: session.user.id,
    data
  })

  // refresh session client side
}