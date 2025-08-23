"use client"
import Link from 'next/link'
import React from 'react'
import Sidebar from './Sidebar'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

export default function Header({
  type
}: {
  type?: "homepage" | "default"
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const leftLogoRef = React.useRef<HTMLAnchorElement>(null)

  useGSAP(() => {
    if (type !== "homepage") return;

    gsap.to(leftLogoRef.current, {
      y: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    })
  }, [])

  return (
    <>
      <header ref={containerRef} className={`
        ${type === "homepage" ? "z-10 h-16 fixed top-0" : "py-2 bg-orange-400"}
        w-screen flex justify-between items-center overflow-hidden text-black
      `}>
        <Link ref={leftLogoRef} href="/" className="ml-4 relative font-reckoner text-lg md:text-2xl hover:text-orange-700">
          {/* ORIENTATION */}
          <Image src="/logo_short_black.png" alt="Orientation 25 Logo" width={100} height={100} className="origin-left w-12 drop-shadow-[1px_1px_black]" />
        </Link>

        <button onClick={() => setIsOpen(b => !b)} className="mr-6 px-2 py-1 text-lg font-bold rounded-md shadow-md bg-amber-400 hover:text-orange-700">
          MENU
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" /></svg> */}
        </button>
      </header>

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}
