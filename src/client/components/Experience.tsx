"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import React from 'react'

export default function Experience() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const ulRefs = React.useRef<(HTMLUListElement | null)[]>([])
  const titleRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(titleRef.current, {
      opacity: 0,
      y: 200
    }, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 40%',
        end: 'top 20%',
        scrub: true,
      },
      opacity: 1,
      y: 0,
      ease: 'power3.out',
    })

    const uls = ulRefs.current.filter(Boolean)

    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1000vh',
        pin: true,
        scrub: true
      }
    })
      .fromTo(uls, {
        duration: 1,
        y: (i) => `${100 + i * 50}vh`,
      }, {
        duration: 10,
        y: (i) => `-${i * 40}vh`,
        // y: (i) => `-${uls[i]!.clientHeight + i * 300}px`,
        ease: 'slow(0.7,0.7,false)',
      })
      // .to(titleRef.current, {
      //   y: -100,
      //   opacity: 0,
      //   ease: 'power3.in'
      // }, 6.4)
  }, [])

  return (
    <div id="experience" ref={containerRef} className='relative w-screen h-screen grid place-items-center overflow-hidden bg-neutral-900'>
      <h1 ref={titleRef} className='text-center font-reckoner relative drop-shadow-[2px_2px_10px_#000000aa]'>
        <span className='font-semibold text-4xl lg:text-6xl'>
          The
        </span>
        <br />
        <span className='font-black text-amber-500 text-7xl lg:text-9xl'>
          EXPERIENCE
        </span>
      </h1>

      <div className='z-[-1] p-4 absolute top-0 bottom-0 left-0 right-0 w-fit mx-auto flex gap-4 md:gap-12 lg:gap-20'>
        <div className='z-10 absolute top-0 left-0 h-[8vh] w-full bg-gradient-to-b from-neutral-900 to-transparent'></div>
        <div className='z-10 absolute bottom-0 left-0 h-[8vh] w-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

        {[1, 2, 0].map((col) => (
          <ul ref={el => { ulRefs.current[col] = el }} key={col} className={`min-h-fit h-fit ${col === 0 ? "max-md:hidden" : ""}`}>
            {[0, 1, 2, 3].map((row) => (
              <li key={row} className={`mt-4 block ${row === 3 ? "md:hidden" : ""}`}>
                <Image
                  src="https://picsum.photos/300/400"
                  width={300}
                  height={400}
                  alt={`Exp ${col}-${row}`}
                  className='hue-rotate-30 rounded-xl'
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
