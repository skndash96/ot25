'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

interface DTG {
  id: number
  name: string
  cover: string
  href: string
}

const dtgs: DTG[] = new Array(15).fill(0).map((_, i) => ({
  id: i,
  name: `DTG ${i + 1}`,
  cover: `https://picsum.photos/360/640`,
  href: `/dtg/${i + 1}`,
}))

export default function DTGList() {
  const wheelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [currentCard, setCurrentCard] = useState<HTMLDivElement | null>(null)

  const setup = () => {
    const wheel = wheelRef.current
    if (!wheel) return

    const cards = wheel.children
    const radius = wheel.offsetWidth / 2
    const center = radius
    const slice = 360 / dtgs.length
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

  const updateActiveCard = () => {
    const wheel = wheelRef.current
    if (!wheel) return

    const cards = Array.from(wheel.children) as HTMLElement[]
    const slice = 360 / dtgs.length
    const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    const currentRotation = scrollProgress * 360
    
    cards.forEach((card, i) => {
      const cardAngle = (i * slice - currentRotation) % 360
      const normalizedAngle = ((cardAngle + 360) % 360)
      
      // Calculate distance from top (0 degrees)
      const distanceFromTop = Math.min(normalizedAngle, 360 - normalizedAngle)
      
      let scale = 1
      let zIndex = 1
      
      if (distanceFromTop <= slice) {
        // Active card (at top center)
        scale = 1.4
        zIndex = 10
      } else if (distanceFromTop <= slice * 2) {
        // Adjacent cards
        scale = 1.2
        zIndex = 5
      }
      
      gsap.to(card, {
        scale,
        zIndex,
        duration: 0.3,
        ease: "power2.out"
      })
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
      duration: dtgs.length,
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 1,
        onUpdate: () => updateActiveCard()
      }
    })

    // Initial active card setup
    updateActiveCard()

    // Resize handler
    const handleResize = () => {
      setup()
      updateActiveCard()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const closeCurrentCard = () => {
    if (currentCard && headerRef.current) {
      const img = headerRef.current.querySelector('img')
      if (img) {
        // Reset header
        headerRef.current.innerHTML = ''
        setCurrentCard(null)
      }
    }
  }

  const onClickCard = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    const card = e.currentTarget
    
    if (card !== currentCard) {
      closeCurrentCard()
      setCurrentCard(card)
      
      // Show enlarged image in header
      if (headerRef.current) {
        headerRef.current.innerHTML = `
          <img 
            src="${dtgs[index].cover}" 
            alt="${dtgs[index].name}"
            style="width: 30vw; height: 53vw; max-height: 500px; max-width: 280px; object-fit: cover; border-radius: 16px;"
          />
          <div style="position: absolute; bottom: -60px; left: 50%; transform: translateX(-50%); text-align: center;">
            <h2 style="font-size: 2rem; margin: 0; color: white;">${dtgs[index].name}</h2>
            <a href="${dtgs[index].href}" style="color: #60a5fa; text-decoration: none; font-size: 1.1rem;">View Details</a>
          </div>
        `
      }
    } else {
      closeCurrentCard()
    }
  }

  return (
    <div className="overflow-x-hidden p-0 m-0 w-full font-sans text-white" style={{ height: '600vh' }}>
      {/* Header */}
      <div 
        ref={headerRef}
        className="fixed top-0 left-0 w-full h-[60vh] flex items-center justify-center cursor-pointer z-10"
        onClick={closeCurrentCard}
      />

      {/* Slider Section */}
      <section className="h-[22vh] bottom-0 fixed w-full">
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
          {dtgs.map((dtg, index) => (
            <div
              key={dtg.id}
              className="absolute top-0 left-0 cursor-pointer"
              style={{ 
                width: '6%', 
                maxWidth: '120px',
                aspectRatio: '9 / 16'
              }}
              onClick={(e) => onClickCard(e, index)}
            >
              <img
                src={dtg.cover}
                alt={dtg.name}
                className="w-full h-full object-cover absolute will-change-transform cursor-pointer rounded-lg shadow-lg"
                style={{ pointerEvents: 'none', zIndex: 999 }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Scroll Down Indicator */}
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