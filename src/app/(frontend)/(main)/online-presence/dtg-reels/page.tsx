import DTGItem from '@/client/components/op/DTGItem'
import { dtgs } from '@/client/utils/dtgs'
import React from 'react'

export default function DTGReels() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold">DTG Reels</h1>
      <p className="mt-2 mb-6">Explore our collection of engaging DTG reels showcasing our latest designs and creative processes.</p>

      <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-12 w-full'>
        {dtgs.map((reel, index) => (
          <li key={index} className="m">
            <DTGItem href={reel.href} label={reel.number} coverImage={`/dtgnir/${reel.number}dtg.jpg`} />
          </li>
        ))}
      </ul>
    </div>
  )
}
