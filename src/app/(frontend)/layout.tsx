import './globals.css'
import type { Metadata } from 'next'
import { LoadingContextProvider } from '../../client/context/LoadingContext'
import LoadingScreen from '@/client/components/LoadingScreen'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: 'Orientation 25',
  description: 'Welcome Freshers to the Orientation 25 website!',
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
