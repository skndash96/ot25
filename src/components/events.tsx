import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useRef } from "react"

const src = "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400"

export default function Events() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "top 20%",
        scrub: true,
      },
    })

    let h1El = new SplitText(containerRef.current!.querySelector('& > h1'), {
      type: 'lines',
    })

    let pEl = new SplitText(containerRef.current!.querySelector('& > p'), {
      type: 'lines',
    })

    tl.from(h1El.lines, {
      opacity: 0,
      duration: 1,
      ease: 'power1.out',
      stagger: 0.1,
    })

    tl.from(pEl.lines, {
      y: '110%',
      opacity: 0,
      rotationZ: 5,
      duration: 0.5,
      delay: 0.2,
      ease: 'power1.out',
      stagger: 0.1,
    })

    const imgs = containerRef.current!.querySelectorAll('.img-box')

    imgs.forEach(img => {
      gsap.from(img.querySelector("img"), {
        scrollTrigger: {
          trigger: img,
          start: "top 60%",
          end: "top 40%",
          scrub: true,
        },
        opacity: 0,
        transform: 'translateY(-90%)',
      })
    })
  }, [])

  return (
    <section ref={containerRef} className='p-4 my-10 flex flex-col items-center'>
      <h1 className='overflow-hidden font-[Equivalent] text-5xl md:text-[10vw]'>
        Events
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-6 gap-4 md:gap-6">
        <div className="img-box col-span-3 md:col-span-3 w-full h-96 overflow-hidden">
          <img className="w-full h-full" src={src} alt="Img1" />
        </div>

        <div className="img-box col-span-3 md:col-span-3 w-full h-96 overflow-hidden">
          <img className="w-full h-full" src={src} alt="Img2" />
        </div>

        <p className="col-span-3 w-full h-96 text-sm md:text-lg lg:text-2xl">
          We are packed with exciting events crafted to spark your passion, fuel your fire and showcase your talent to your peers. Sign up for an unforgettable experience filled with laughter, creativity, and camaraderie. The ball is now in your court…
          <button className="mt-4 p-4 block bg-purple-700 text-white">
            Checkout Events
          </button>
        </p>

        <div className="img-box col-span-3 w-full h-96 overflow-hidden">
          <img className="w-full h-full" src={src} alt="Img3" />
        </div>

        <div className="img-box col-span-6 w-full h-96 overflow-hidden">
          <img className="w-full h-full" src={src} alt="Img4" />
        </div>
      </div>
    </section>
  )
}
