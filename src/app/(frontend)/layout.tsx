import './globals.css'
import type { Metadata } from 'next'
import { LoadingContextProvider } from '../../client/context/LoadingContext'
import LoadingScreen from '@/client/components/LoadingScreen'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "Orientation '25",
  description:
    "Kickstart your College Life with Orientation '25 — connect, explore, and get ready for an unforgettable campus life!",
  icons: {
    icon: "/insta_dp.webp",
    apple: "/insta_dp.webp",
    shortcut: "/insta_dp.webp",
  },
  openGraph: {
    title: "Orientation '25",
    description:
      "Kickstart your College Life with Orientation '25 — connect, explore, and get ready for an unforgettable campus life!",
    url: "https://yourdomain.com", // replace with your actual domain
    siteName: "Orientation '25",
    images: [
      {
        url: "/insta_dp.webp",
        width: 512,
        height: 512,
        alt: "Orientation '25 Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orientation '25",
    description:
      "Kickstart your College Life with Orientation '25 — connect, explore, and get ready for an unforgettable campus life!",
    images: ["/insta_dp.webp"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <LoadingContextProvider>
          <body className="antialiased">
            <LoadingScreen />
            <ToastContainer />
            {children}
          </body>
          <GoogleAnalytics gaId="G-VG10QQ39ZS" />
        </LoadingContextProvider>
      </SessionProvider>
    </html>
  )
}
