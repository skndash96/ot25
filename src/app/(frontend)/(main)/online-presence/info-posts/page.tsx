import React from 'react'
import InformationalPosts from '@/client/components/op/InformationalPosts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Informative Posts',
  description: 'Stay informed with our curated posts covering essential topics, tips, and updates to enhance your experience during Orientation \'25.',
}

export default function InfoPage() {
  return (
    <main className="min-h-screen text-amber-100 px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-amber-400 drop-shadow-lg">
        Informative Posts
      </h1>

      <InformationalPosts />
    </main>
  )
}
