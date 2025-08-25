import LoginComponent from "@/client/components/login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OT25 Login",
  description: "Login to Orientation '25 to access your student profile, register for events, and stay updated!",
}

export default function LoginPage() {
  return (
    <LoginComponent />
  )
}