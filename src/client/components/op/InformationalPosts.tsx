'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { infoPosts } from '@/client/utils/infoPosts'
import Link from 'next/link'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function InformationalPosts() {
  const wheelRef = useRef<HTMLDivElement>(null)

  const setup = () => {
    const wheel = wheelRef.current
    if (!wheel) return

    const cards = wheel.children
    const radius = wheel.offsetWidth / 2
    const center = radius
    const slice = 360 / infoPosts.length
    const DEG2RAD = Math.PI / 180

    gsap.set(cards, {
      x: (i: number) => center + radius * Math.sin(i * slice * DEG2RAD),
      y: (i: number) => center - radius * Math.cos(i * slice * DEG2RAD),
      rotation: (i: number) => i * slice,
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      zIndex: 1
    })
  }

  useEffect(() => {
    setup()
    
    const wheel = wheelRef.current
    if (!wheel) return

    // Animate arrow
    gsap.to(".arrow", { 
      y: 5, 
      ease: "power1.inOut", 
      repeat: -1, 
      yoyo: true 
    })

    // Scroll-triggered rotation with active card update
    gsap.to(wheel, {
      rotation: -360,
      ease: "none",
      duration: infoPosts.length,
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 1
      }
    })

    // Resize handler
    const handleResize = () => {
      setup()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="overflow-x-hidden p-0 m-0 w-full text-white" style={{ height: '600vh' }}>
      {/* Slider Section */}
      <section className="h-[40vh] bottom-0 fixed w-full">
        <div 
          ref={wheelRef}
          className="absolute top-0 flex items-center justify-center left-1/2 transform -translate-x-1/2"
          style={{ 
            width: '300vw', 
            height: '300vw', 
            maxWidth: '2000px', 
            maxHeight: '2000px' 
          }}
        >
          {infoPosts.map((p, index) => (
            <Link
              key={index}
              href={p.href}
              className="block absolute top-0 left-0 bg-neutral-700"
              style={{ 
                width: '16%', 
                maxWidth: '240px',
                aspectRatio: '9 / 16'
              }}
            >
              <span className="absolute top-0 left-0 -translate-y-full">{p.title}</span>
              <Image
                src={p.cover}
                alt={p.title}
                fill
                className="w-full h-full object-cover absolute will-change-transform cursor-pointer rounded-lg shadow-lg"
                style={{ pointerEvents: 'none', zIndex: 1 }}
              />
            </Link>
          ))}
        </div>
      </section>

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 text-white font-normal uppercase text-sm">
        Scroll down
        <div 
          className="arrow relative top-0 mx-auto w-4 h-4 mt-2"
          style={{
            filter: 'invert(1)',
            backgroundImage: `url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHBhdGggZmlsbD0iYmxhY2siIGQ9Ik00ODMuMiwxOTIuMmMtMjAuNS0yMC41LTUzLjUtMjAuOC03My43LTAuNkwyNTcsMzQ0LjFMMTA0LjUsMTkxLjZjLTIwLjItMjAuMi01My4yLTE5LjktNzMuNywwLjYKCWMtMjAuNSwyMC41LTIwLjgsNTMuNS0wLjYsNzMuN2wxOTAsMTkwYzEwLjEsMTAuMSwyMy40LDE1LjEsMzYuOCwxNWMxMy4zLDAuMSwyNi43LTQuOSwzNi44LTE1bDE5MC0xOTAKCUM1MDMuOSwyNDUuNyw1MDMuNywyMTIuNyw0ODMuMiwxOTIuMnoiLz4KPC9zdmc+")`,
            backgroundSize: 'contain'
          }}
        />
      </div>
    </div>
  )
}