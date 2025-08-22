"use client"
import React from 'react'
import { useGSAP } from '@gsap/react'
import { useLoadingContext } from '../context/LoadingContext'
import gsap from 'gsap'
import Starfield from './Stars'
import HeroImage from './HeroImage'

export default function Hero() {
  const { completedEndAnimation } = useLoadingContext()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const wlcmRef = React.useRef<HTMLHeadingElement>(null)
  const otRef = React.useRef<HTMLHeadingElement>(null)
  const yearRef = React.useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    if (!completedEndAnimation) {
      gsap.to([wlcmRef.current, otRef.current, yearRef.current], {
        yPercent: 100,
        opacity: 0
      })
    } else {
      gsap.fromTo([wlcmRef.current, otRef.current, yearRef.current], {
        yPercent: 100,
        opacity: 0
      }, {
        duration: 0.6,
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "expo.out"
      })
    }
  }, [completedEndAnimation])

  return (
    <div id="hero" ref={containerRef} className='relative w-screen h-[100svh] bg-amber-500'>
      <Starfield />

      <div className='z-[1] w-fit absolute bottom-[14vh] md:bottom-[10vh] left-[5vw] text-amber-200 flex flex-col gap-0'>
        <h1 ref={wlcmRef} className='font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
          Welcome to
        </h1>
        <h1 ref={otRef} className='font-reckoner font-black text-7xl md:text-[144px] lg:text-[180px]'>
          ORIENTATION
        </h1>
        <h1 ref={yearRef} className='-mt-2 md:-mt-4 font-black text-xl text-right'>
          @ NITT
        </h1>
      </div>

      <HeroImage />
    </div>
  )
}
