import "../globals.css";
import type { Metadata } from "next";
import Header from "@/client/components/Header";

export const metadata: Metadata = {
  title: "Orientation 25",
  description: "Welcome Freshers to the Orientation 25 website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header type="default" />
      <div className="grow h-full">
        {children}
      </div>
    </div>
  );
}
