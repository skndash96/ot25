import { departments } from "@/client/utils/departments"
import { auth } from "@/lib/auth"
import { utapi } from "@/lib/cloudthing"
import payloadConfig from "@/payload.config"
import { NextRequest, NextResponse } from "next/server"
import { getPayload } from "payload"
import { z } from "zod"

const inputSchema = z.object({
  name: z.string().min(1, "Name is required").regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  rollNumber: z.string().min(1, "Roll Number is required").regex(/^\d+$/, "Roll Number must be only digits"),
  phoneNumber: z.string().regex(/^(\+91)?\s?\d{5}\s?\d{5}$/, "Phone Number must be valid Indian phone number"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  department: z.enum(departments, "Department is required and should be valid"),
  image: z.url().optional()
})

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()

  const payload = await getPayload({ config: payloadConfig })
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  const textFields = {
    name: formData.get("name")?.toString(),
    gender: formData.get("gender")?.toString(),
    rollNumber: formData.get("rollNumber")?.toString(),
    phoneNumber: formData.get("phoneNumber")?.toString(),
    department: formData.get("department")?.toString(),
    image: undefined
  }

  const profilePic = formData.get("profilePicture") as File | null

  const { data, success: parseSuccess, error: parseError } = inputSchema.safeParse(textFields)
  
  if (!parseSuccess) {
    throw new Error(parseError.message)
  }
  
  if (profilePic) {
    const uploadRes = await utapi.uploadFiles(profilePic)

    if (uploadRes.error) {
      console.error(uploadRes.error)
  
      return NextResponse.json({
        error: "Failed to upload file"
      }, {
        status: 500
      })
    } else {
      data.image = uploadRes.data.ufsUrl
    }
  } else {
    delete data.image
  }

  await payload.update({
    collection: "users",
    id: session.user.id,
    data
  })

  return NextResponse.json({
    message: "Profile Updated"
  }, { status: 200 })
}