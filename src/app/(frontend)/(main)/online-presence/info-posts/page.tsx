import React from 'react'
import InformationalPosts from '@/client/components/op/InformationalPosts'

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
