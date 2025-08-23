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

  useGSAP(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const pages = container.querySelectorAll('.page') as NodeListOf<HTMLElement>
    const fronts = container.querySelectorAll('.front') as NodeListOf<HTMLElement>
    const backs = container.querySelectorAll('.back') as NodeListOf<HTMLElement>

    // Calculate minimum scroll height per page based on screen size
    const minScrollPerPage = window.innerHeight < 600 ? 800 : window.innerHeight
    const readingGap = 0.4 * minScrollPerPage
    const totalScrollHeight = magazinePages.length * minScrollPerPage + (magazinePages.length - 1) * readingGap

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

    // Set initial z-indices properly
    pages.forEach((page, index) => {
      gsap.set(page, { zIndex: magazinePages.length - index })
    })

    pages.forEach((page, index) => {
      let hasFlipped = false

      gsap.to(page, {
        rotationY: -180,
        scrollTrigger: {
          trigger: container,
          start: () => index * minScrollPerPage + readingGap * index,
          end: () => (index + 1) * minScrollPerPage + readingGap * index,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress

            // Update z-indices for all pages based on current state
            pages.forEach((p, i) => {
              if (i < index) {
                // Already flipped pages - behind everything
                gsap.set(p, { zIndex: -(magazinePages.length - i) })
              } else if (i === index) {
                // Currently flipping page
                if (progress > 0.5) {
                  // More than halfway flipped - behind remaining pages but above already flipped
                  gsap.set(p, { zIndex: 0 })
                  hasFlipped = true
                } else {
                  // Less than halfway - above all other pages
                  gsap.set(p, { zIndex: magazinePages.length + 10 })
                }
              } else {
                // Unflipped pages - maintain original order above flipped pages
                gsap.set(p, { zIndex: magazinePages.length - i })
              }
            })

            if (progress >= 0.99 && hasFlipped) {
              console.log('Fully flipped page', index + 1)
            }

            // Handle reverse scrolling
            if (progress <= 0.01 && hasFlipped) {
              hasFlipped = false
              // Reset all z-indices when unflipping
              pages.forEach((p, i) => {
                gsap.set(p, { zIndex: magazinePages.length - i })
              })
            }
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
          className="relative portrait:w-full portrait:max-w-3xl portrait:h-auto landscape:h-[65vh] landscape:w-auto mx-auto aspect-[1.41]"
          style={{
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {/* The Magazine text */}
          <div style={{
            zIndex: -(magazinePages.length + 1)
          }} className="absolute left-0 right-1/2 inset-y-0 flex items-center justify-center font-sans text-white text-2xl font-bold z-0">
            <div className="animate-bounce">
              <div className="text-xs md:text-sm mb-1 md:mb-2">Scroll to flip pages</div>
              <div className="w-5 md:w-6 h-8 md:h-10 border-2 border-white rounded-full mx-auto">
                <div className="w-1 h-2 md:h-3 bg-white rounded-full mx-auto mt-1 md:mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>

          {magazinePages.map((page, index) => (
            <div key={index} className="page absolute left-1/2 right-0 inset-y-0 bg-neutral-600">
              <div className="front absolute inset-0 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                <Image
                  src={page.frontBg}
                  alt={`${page.front} background`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}