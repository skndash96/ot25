import DTGList from '@/client/components/dtgs/DTGList'
import React from 'react'

export default function DTGReels() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold">DTG Reels</h1>
      <p className="mt-2 mb-6">Explore our collection of engaging DTG reels showcasing our latest designs and creative processes.</p>

      <DTGList />
    </div>
  )
}
