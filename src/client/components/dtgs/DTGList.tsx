'use client'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import Image from 'next/image';
import Link from 'next/link';

const dtgs = new Array(15).fill(0).map((_, i) => ({
  id: i,
  name: `DTG ${i + 1}`,
  cover: `https://picsum.photos/360/576`,
  href: `/dtg/${i + 1}`,
}))

function Cuboid({ name, cover, href }: { href: string, name: string; cover: string }) {
  const cubeRef = useRef<HTMLAnchorElement>(null)
  const activeRef = useRef(false)

  const open = () => {
    if (!cubeRef.current) return
    gsap.killTweensOf(cubeRef.current)
    gsap.to(cubeRef.current, {
      rotateY: -90,
      duration: 0.6,
      ease: 'power3.out',
      onStart: () => { activeRef.current = true },
    })
  }

  const close = () => {
    if (!cubeRef.current) return
    gsap.killTweensOf(cubeRef.current)
    gsap.to(cubeRef.current, {
      rotateY: -30,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => { activeRef.current = false },
    })
  }

  useEffect(() => {
    if (!cubeRef.current) return
    gsap.set(cubeRef.current, { rotateY: -30 })

    const handleDocClick = (e: MouseEvent | TouchEvent) => {
      if (
        cubeRef.current &&
        !cubeRef.current.contains(e.target as Node) &&
        activeRef.current
      ) {
        close()
      }
    }

    document.addEventListener('click', handleDocClick)
    document.addEventListener('touchstart', handleDocClick)
    return () => {
      document.removeEventListener('click', handleDocClick)
      document.removeEventListener('touchstart', handleDocClick)
    }
  }, [])

  // const handleClick = (e: React.MouseEvent) => {
  //   e.stopPropagation()
  //   activeRef.current ? close() : open()
  // }

  return (
    <Link
      href={href}
      ref={cubeRef}
      className="relative w-16 h-52 cursor-pointer select-none"
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'left center',
        perspective: '1500px',
      }}
      onMouseEnter={open}
      onMouseLeave={close}
      // onClick={handleClick}
    >
      {/* Spine */}
      <div className="absolute top-0 left-0 w-12 h-52 flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg">
        <h2 className="-rotate-90 text-2xl font-bold text-amber-900 whitespace-nowrap px-2">
          {name}
        </h2>
      </div>

      {/* Cover */}
      <div
        className="absolute top-0 left-12 w-52 h-52 z-[1]"
        style={{ width: `${(208 * 9) / 16}px`, transform: 'rotateY(90deg)', transformOrigin: 'left center' }}
      >
        <Image
          width={360}
          height={576}
          src={cover}
          alt={name}
          className="block w-full h-full object-cover shadow-2xl"
          loading="lazy"
        />
      </div>
    </Link>
  )
}

export default function DTGList() {
  return (
    <div className="pr-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
      {dtgs.map((dtg) => (
        <div key={dtg.id} className="flex justify-center">
          <Cuboid href={dtg.href} name={dtg.name} cover={dtg.cover} />
        </div>
      ))}
    </div>
  )
}
