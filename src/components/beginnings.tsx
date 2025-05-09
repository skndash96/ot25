import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

export default function Beginnings() {
  const containerRef = useRef<HTMLDivElement>(null)
  const firstItemRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to(containerRef.current!, {
      width: '50vw',
      rotate: 4,
      margin: '0 auto',
      maxWidth: '100vw',
    })

    tl.to(containerRef.current!, {
      scrollTrigger: {
        trigger: containerRef.current!,
        start: 'top 80%',
        end: 'top 10%',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(containerRef.current!, {
            maxWidth: '100vw',
            margin: '0 auto',
            rotate: `${4 - self.progress * 4}deg`,
            width: `${50 + self.progress * 50}vw`,
          })
        }
      },
    })

    ScrollTrigger.create({
      trigger: containerRef.current!,
      start: 'top top',
      end: '+=1000vh',
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        let max = firstItemRef.current!.clientWidth + window.innerWidth

        let x = self.progress < 0.05 ? 0 : self.progress > 0.9 ? max : (self.progress * max)

        gsap.to("#new-beginnings-content", {
          x: `-${x}px`,
        })
      }
    })
  }, [])

  return (
    <section ref={containerRef} className='relative h-screen flex flex-row md:items-start overflow-hidden'>
      <img src="/concert.jpg" alt="Concert" className='z-[-1] object-cover object-left w-full h-full absolute inset-0' />

      <div id="new-beginnings-content" className='w-full h-screen flex flex-row md:items-start'>
        <div ref={firstItemRef} className='px-12 h-full shrink-0 flex justify-between items-center gap-20 min-w-screen '>
          <h1 className='font-[Equivalent_Bold] text-5xl md:text-7xl'>
            Get Ready
          </h1>

          <div className='w-76 md:w-96 bg-black group hover:bg-purple-700 shadow-[10px_10px_20px_#ffffff11]'>
            <img className='group-hover:p-4 duration-200' alt="Fun" src="/concert.jpg" />

            <div className='p-6'>
              <h2 className='font-[Equivalent_Bold] text-4xl md:text-6xl'>
                Lots of Fun
              </h2>

              <p>
                Get ready for a whirlwind of excitement! Our Orientation is packed with thrilling events.
              </p>

              <p className='mt-4 font-[Equivalent] text-base md:text-lg'>
                August 25th, 2025
              </p>
            </div>
          </div>
        </div>

        <div className='w-screen self-center shrink-0'>
          <div className='mx-auto w-76 md:w-96 bg-black group hover:bg-purple-700 shadow-[10px_10px_20px_#ffffff11]'>
            <img className='group-hover:p-4 duration-200' alt="Fun" src="/concert.jpg" />

            <div className='p-6'>
              <h2 className='font-[Equivalent_Bold] text-4xl md:text-6xl'>
                Lots of Fun
              </h2>

              <p>
                Get ready for a whirlwind of excitement! Our Orientation is packed with thrilling events.
              </p>

              <p className='mt-4 font-[Equivalent] text-base md:text-lg'>
                August 25th, 2025
              </p>
            </div>
          </div>
        </div>

        <div className='w-screen self-center shrink-0'>
          <div className='mx-auto w-76 md:w-96 bg-black/95 group hover:bg-purple-700 shadow-[10px_10px_20px_#ffffff11]'>
            <img className='group-hover:p-4 duration-200' alt="Fun" src="/concert.jpg" />

            <div className='p-6'>
              <h2 className='font-[Equivalent_Bold] text-4xl md:text-6xl'>
                Lots of Fun
              </h2>

              <p>
                Get ready for a whirlwind of excitement! Our Orientation is packed with thrilling events.
              </p>

              <p className='mt-4 font-[Equivalent] text-base md:text-lg'>
                August 25th, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
