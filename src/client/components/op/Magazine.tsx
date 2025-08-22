'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { magazinePages } from '@/client/utils/magazine'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Magazine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const pages = container.querySelectorAll('.page') as NodeListOf<HTMLElement>
    const fronts = container.querySelectorAll('.front') as NodeListOf<HTMLElement>
    const backs = container.querySelectorAll('.back') as NodeListOf<HTMLElement>

    const totalScrollHeight = (magazinePages.length + 2) * window.innerHeight * 1 + 200 // Extra 200vh

    ScrollTrigger.create({
      trigger: container,
      start: 'top 15%',
      end: `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
    })

    gsap.set(container, { perspective: 1000 })
    gsap.set(pages, { transformStyle: 'preserve-3d' })
    gsap.set(fronts, { rotationY: 0 })
    gsap.set(backs, { rotationY: -180 })
    gsap.set([...fronts, ...backs], { backfaceVisibility: 'hidden' })

    gsap.to(mouseRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: `+=${totalScrollHeight * 0.5}`, // 50% of total scroll
        scrub: 1,
        onComplete: () => {
          if (mouseRef.current) {
            gsap.set(mouseRef.current, { display: 'none' })
          }
        },
      },
    })

    pages.forEach((page, index) => {
      gsap.to(page, {
        rotationY: -180,
        scrollTrigger: {
          trigger: container,
          start: () => (index + 1) * (window.innerHeight * 0.5),
          end: () => (index + 2) * (window.innerHeight * 0.5),
          scrub: 1,
          onUpdate: (self) => {
            pages.forEach((p, i) => {
              if (i < index) {
                gsap.set(p, { zIndex: 1 })
              } else if (i === index) {
                gsap.set(p, { zIndex: magazinePages.length + 2 })
              } else {
                gsap.set(p, { zIndex: magazinePages.length - i + 1 })
              }
            })
          },
          onComplete: () => {
            // After flip is complete, set proper z-index for flipped page
            gsap.set(page, { zIndex: 1 })
          },
        },
        transformOrigin: '0% 100%',
        ease: 'none',
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="w-screen overflow-x-hidden">
      <div className="grow p-4 md:p-8 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative portrait:w-full portrait:max-w-3xl portrait:h-auto landscape:h-[65vh] landscape:w-auto mx-auto aspect-[3/2] bg-neutral-600"
          style={{
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {/* The Magazine text */}
          <div className="absolute left-0 right-1/2 inset-y-0 flex items-center justify-center font-sans text-green-600 text-2xl font-bold z-0">
            The Magazine
          </div>

          {/* By OT'25 text */}
          <div className="absolute left-1/2 right-0 inset-y-0 flex items-center justify-center font-sans text-green-600 text-2xl font-bold z-0">
            By OT&apos;25
          </div>

          {magazinePages.map((page, index) => (
            <div
              key={index}
              className="page absolute left-1/2 right-0 inset-y-0 bg-red-500 border-2 border-solid border-blue-400"
              style={{ zIndex: magazinePages.length - index + 1 }} // Start with proper stacking
            >
              <div className="front absolute inset-0 flex items-center justify-center text-white text-xl font-bold shadow-lg">
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

      {/* Scroll indicator */}
      <div
        ref={mouseRef}
        className="fixed bottom-4 md:bottom-8 right-4 md:right-8 text-white text-center z-[2]"
      >
        <div className="animate-bounce">
          <div className="text-xs md:text-sm mb-1 md:mb-2">Scroll to flip pages</div>
          <div className="w-5 md:w-6 h-8 md:h-10 border-2 border-white rounded-full mx-auto">
            <div className="w-1 h-2 md:h-3 bg-white rounded-full mx-auto mt-1 md:mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
