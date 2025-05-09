import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useRef } from "react"

export default function Experience() {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 60%",
      end: "bottom 30%",
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const progress = Math.min(self.progress * 100, 80)

        gsap.to(ref.current, {
          x: `-${progress}%`,
          duration: 0.5,
        })
      }
    })
  }, [])

  return (
    <div className="mb-[40vh] w-screen overflow-x-hidden">
      <h2 ref={ref} className="ml-[50%] min-w-fit text-5xl md:text-7xl lg:text-9xl text-nowrap font-[Equivalent] text-center">
        Are you ready to Experience?
      </h2>
    </div>
  )
}
