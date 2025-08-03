import './globals.css'
import type { Metadata } from 'next'
import { LoadingContextProvider } from '../../client/context/LoadingContext'
import LoadingScreen from '@/client/components/LoadingScreen'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../../client/context/AuthContext'

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
      <AuthProvider>
        <LoadingContextProvider>
          <body className="antialiased">
            <LoadingScreen />
            <ToastContainer />
            {children}
          </body>
        </LoadingContextProvider>
      </AuthProvider>
    </html>
  )
}
