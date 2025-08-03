import './globals.css'
import type { Metadata } from 'next'
import { LoadingContextProvider } from './context/LoadingContext'
import LoadingScreen from '@/app/(frontend)/components/LoadingScreen'
import Footer from '@/app/(frontend)/components/Footer'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'

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
