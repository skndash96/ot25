import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Profile",
  description: "See your profile data and download your ID card.",
}

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}