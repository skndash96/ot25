"use client"
import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap, { Power1 } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import Image from 'next/image'

export default function About() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const elevateRef = React.useRef<HTMLDivElement>(null)
  const elevateDotRef = React.useRef<HTMLDivElement>(null)
  const paraRef = React.useRef<HTMLParagraphElement>(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const lineSplit = SplitText.create(paraRef.current, {
      type: "lines",
      autoSplit: true,
      mask: "lines"
    })

    gsap.set(elevateRef.current, {
      borderTopRightRadius: '100%',
    })

    gsap.set(lineSplit.lines, {
      yPercent: 100,
      opacity: 0
    })

    gsap.set(titleRef.current, {
      yPercent: 100,
      opacity: 0
    })

    const tl = gsap.timeline({
      yoyo: false,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1500vh',
        pin: true,
        scrub: true
      }
    })
      .fromTo(elevateRef.current, {
        width: '20vmax',
        height: '20vmax',
      }, {
        duration: 1,
        width: p => `${100 - 100 * p}%`,
        height: p => `${100 - 100 * p}%`,
      })
      .fromTo(elevateRef.current, {
        borderTopRightRadius: '180px',
        borderBottomRightRadius: '180px',
      }, {
        duration: 1,
        borderTopRightRadius: p => `${180 * Power1.easeOut(p)}px`,
        borderBottomRightRadius: p => `${180 * Power1.easeOut(p)}px`,
      }, 0)
      .to(elevateDotRef.current, {
        scale: 1
      })
      .to(titleRef.current, {
        duration: 0.6,
        yPercent: 0,
        opacity: 1,
        ease: "expo.out"
      })
      .fromTo(lineSplit.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 1
      }, {
        duration: 0.6,
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "expo.out"
      })

    return () => {
      lineSplit.revert()
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className='relative p-4 w-screen h-screen bg-amber-500 overflow-hidden'>
      <div ref={elevateRef} className='p-4 flex flex-col gap-8 md:flex-row justify-start md:justify-between absolute bottom-0 left-0 bg-neutral-900 w-[10vw] h-[10vh] overflow-hidden'>
        <div className='relative w-full mx-auto'>
          <div className='absolute left-0 right-0 top-0 h-[10vh] bg-gradient-to-b from-neutral-900 to-transparent'></div>
          <div className='absolute left-0 right-0 bottom-0 h-[10vh] bg-gradient-to-t from-neutral-900 to-transparent'></div>

          <h1 ref={titleRef} className='font-reckoner font-black text-7xl lg:text-9xl text-amber-500 mt-[10vh]'>
            About OT 25
          </h1>

          <p ref={paraRef} className='mt-8 text-xl sm:text-2xl md:text-4xl md:w-[70vw] w-[85vw]'>
            Tired of sleepless nights and countless hours of practice and tests? It&apos;s time to let loose and dive into the excitement of a new adventure! Welcome to NIT Trichy, where Orientation meets Celebration! Get ready to kickstart your college journey with fun, friends, and loads of unforgettable memories.
          </p>
        </div>

        <div ref={elevateDotRef} className='scale-0 self-end md:self-start md:mt-12 md:mr-12 w-full max-w-[30vw] aspect-square grid place-items-center rounded-full bg-amber-500'>
          <Image className='w-[60%] h-fit object-center' src="/logo_short_black.png" alt="Logo" width={200} height={200} />
        </div>
      </div>
    </div>
  )
}
