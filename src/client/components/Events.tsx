"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Events() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div id="events" ref={containerRef} className='p-4 relative w-screen bg-amber-500'>
      <h1 className='m-2 text-center text-6xl md:text-8xl lg:text-8xl font-reckoner font-black text-neutral-900'>
        Proshows and Events
      </h1>

      <div className="grid grid-cols-8 gap-4 max-w-5xl mx-auto">
        <div className="col-span-5 md:col-span-4 row-span-4">
          <Image className='w-full h-full rounded-lg object-center object-cover' src="/exp/2.png" alt="Event Image" width={800} height={600} />
        </div>
        <div className="col-span-8 md:col-span-2 row-start-9 md:row-start-1 row-span-1 md:row-span-4 col-start-1 md:col-start-5">
          <Image className='w-full h-full rounded-lg object-center object-cover' src="/exp/8.png" alt="Event Image" width={400} height={300} />
        </div>
        <div className="col-span-3 md:col-span-2 row-span-2 col-start-6 md:col-start-7">
          <Image className='w-full h-full rounded-lg object-center object-cover' src="/exp/4.png" alt="Event Image" width={800} height={200} />
        </div>
        <div className="col-span-3 md:col-span-2 row-span-2 col-start-6 md:col-start-7 row-start-3">
          <Image className='w-full h-full rounded-lg object-center object-cover' src="/exp/6.png" alt="Event Image" width={800} height={200} />
        </div>
        <div className="col-span-4 row-span-4 row-start-5 flex flex-col gap-4">
          <p className='text-neutral-900 text-sm sm:text-xl md:text-xl lg:text-2xl xl:text-3xl'>
            Tired of sleepless nights and countless hours of practice and tests? It&apos;s time to let loose and dive into the excitement of a new adventure! Welcome to NIT Trichy, where Orientation meets Celebration!
            <span className='max-lg:hidden'>
              {' '} Get ready to kickstart your college journey with fun, friends, and loads of unforgettable memories.
            </span>
          </p>

          <Link href="/events" className='w-full p-2 md:p-4 md:h-full grid place-items-center font-reckoner text-3xl md:text-6xl lg:text-7xl font-semibold text-amber-200 bg-neutral-900 hover:bg-neutral-700 transition-colors duration-300 rounded-lg'>
            Explore Events
          </Link>
        </div>
        <div className="col-span-4 row-span-4 col-start-5 row-start-5">
          <Image className='w-full h-full rounded-lg object-center object-cover' src="/exp/11.png" alt="Event Image" width={800} height={200} />
        </div>
      </div>
    </div>
  )
}
