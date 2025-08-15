'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { magazinePages } from "@/client/utils/magazine"

export default function Magazine() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const pages = containerRef.current.querySelectorAll('.page') as NodeListOf<HTMLElement>
    const fronts = containerRef.current.querySelectorAll('.front') as NodeListOf<HTMLElement>
    const backs = containerRef.current.querySelectorAll('.back') as NodeListOf<HTMLElement>

    // Initial GSAP setup
    gsap.set(containerRef.current, { perspective: 1000 })
    gsap.set(pages, { transformStyle: 'preserve-3d' })
    gsap.set(fronts, { rotationY: 0 })
    gsap.set(backs, { rotationY: -180 })
    gsap.set([...fronts, ...backs], { backfaceVisibility: 'hidden' })

    const frontClickHandler = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const parent = target.parentElement
      if (!parent) return

      gsap.timeline().set(pages, { zIndex: 0 }).set(parent, { zIndex: 2 }).to(parent, {
        duration: 0.6,
        rotationY: -180,
        transformOrigin: '0% 100%',
        ease: 'power2.out',
      })
    }

    const backClickHandler = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const parent = target.parentElement
      if (!parent) return

      gsap.timeline().set(pages, { zIndex: 0 }).set(parent, { zIndex: 2 }).to(parent, {
        duration: 0.6,
        rotationY: 0,
        transformOrigin: '0% 100%',
        ease: 'power2.out',
      })
    }

    fronts.forEach((el) => {
      el.addEventListener('click', frontClickHandler)
    })

    backs.forEach((el) => {
      el.addEventListener('click', backClickHandler)
    })

    return () => {
      fronts.forEach((el) => {
        el.removeEventListener('click', frontClickHandler)
      })
      backs.forEach((el) => {
        el.removeEventListener('click', backClickHandler)
      })
    }
  }, [])

  return (
    <div className="grow flex items-center justify-center p-4 md:p-8 max-sm:mt-[20vh]">
      <div
        ref={containerRef}
        className="relative w-full max-w-3xl mx-auto aspect-[3/2] bg-neutral-600"
        style={{
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        {/* The End text */}
        <div className="absolute left-0 right-1/2 inset-y-0 flex items-center justify-center font-sans text-green-600 text-2xl font-bold z-0">
          The Magazine
        </div>

        {/* The End text */}
        <div className="absolute left-1/2 right-0 inset-y-0 flex items-center justify-center font-sans text-green-600 text-2xl font-bold z-0">
          By OT&apos;25
        </div>

        {magazinePages.map((page, index) => (
          <div
            key={index}
            className="page absolute left-1/2 right-0 inset-y-0 bg-red-500 border-2 border-solid border-blue-400 cursor-pointer"
            style={{ zIndex: magazinePages.length - index }} // Higher index = higher z-index
          >
            <div className="front absolute inset-0 flex items-center justify-center text-white text-xl font-bold shadow-lg overflow-hidden">
              <Image
                src={page.frontBg}
                alt={`${page.front} background`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 2}
              />
              <div className="relative z-10 bg-black bg-opacity-50 px-4 py-2 rounded">
                {page.front}
              </div>
            </div>
            <div className="back absolute inset-0 flex items-center justify-center text-white text-xl font-bold shadow-lg overflow-hidden">
              <Image
                src={page.backBg}
                alt={`${page.back} background`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 2}
              />
              <div className="relative z-10 bg-black bg-opacity-50 px-4 py-2 rounded">
                {page.back}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
