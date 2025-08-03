"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import React from 'react'

const people = [
  {
    name: 'John Doe',
    role: 'Overall Coordinator',
    image: '/pseudopic.jpeg',
  },
  {
    name: 'Jane Smith',
    role: 'Logistics Lead',
    image: '/pseudopic.jpeg',
  },
  {
    name: 'Alex Johnson',
    role: 'Marketing Head',
    image: '/pseudopic.jpeg',
  },
  {
    name: 'Priya Patel',
    role: 'Technical Director',
    image: '/pseudopic.jpeg',
  },
  {
    name: 'Carlos Gomez',
    role: 'Volunteer Coordinator',
    image: '/pseudopic.jpeg',
  },
  {
    name: 'Emily Chen',
    role: 'Sponsorship Manager',
    image: '/pseudopic.jpeg',
  }
]

export default function Core() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<(HTMLLIElement | null)[]>([])

  useGSAP(() => {
    itemRefs.current.forEach(item => {
      gsap.fromTo(item, {
        opacity: 0,
        scale: 1.05,
      }, {
        opacity: 1,
        scale: 1,
        delay: 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'bottom 80%',
          toggleActions: 'play none none none',
        }
      })
    })
  }, [])

  return (
    <div id="core" ref={containerRef} className='relative px-8 py-12 sm:py-8 lg:py-12 w-screen bg-amber-500'>
      <h1 className='text-6xl text-center md:text-8xl lg:text-8xl font-reckoner font-black text-neutral-900'>
        Meet our Team
      </h1>

      <ul className='mt-12 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-2 md:gap-4'>
        {people.map((person, index) => (
          <li ref={el => { itemRefs.current[index] = el }} key={index} className='group w-full max-w-60 md:max-w-80 mx-auto'>
            <div className='w-full relative aspect-square'>
              <Image src={person.image} alt={person.name} fill className='grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:rotate-2 duration-200 rounded-xl' />
              <div className='p-4 absolute bottom-0 left-0'>
                <h2 className='text-5xl md:text-6xl font-bold font-reckoner text-amber-200'>{person.name}</h2>
                <h3 className='-translate-y-1 text-xl md:text-2xl font-semibold text-amber-50'>{person.role}</h3>
              </div>
            </div>
            <div>
            </div>
          </li>
        ))}
      </ul>
    </div >
  )
}
