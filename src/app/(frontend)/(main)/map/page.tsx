import Image from 'next/image'
import React from 'react'

export default function Map() {
  return (
    <div className='grow relative'>
      <Image src="/map.png" alt="Map of NITT" width={1920} height={1080} className="h-full" />
    </div>
  )
}
