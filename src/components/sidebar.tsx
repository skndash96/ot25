import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState } from "react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const c1Ref = useRef<HTMLDivElement>(null)
  const c2Ref = useRef<HTMLDivElement>(null)
  const c3Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!c1Ref.current || !c2Ref.current || !c3Ref.current) return

    if (isOpen) {
      gsap.to([c1Ref.current, c2Ref.current, c3Ref.current], {
        y: "0%",
        rotationZ: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power1.out',
      })
    } else {
      gsap.to([c1Ref.current, c2Ref.current, c3Ref.current], {
        y: "-100%",
        duration: 0.2,
        stagger: 0.05,
      })
    }
  }, [isOpen])

  return (
    <div className="mr-4">
      <button onClick={() => setIsOpen(b => !b)} className="hover:text-purple-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" /></svg>
      </button>

      <div ref={c1Ref} className="z-[2] absolute inset-0 bg-white">
        <div ref={c2Ref} className="absolute inset-0 bg-purple-950">
          <nav ref={c3Ref} className="absolute inset-0 grid place-items-center bg-purple-500">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-purple-950">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>

            <div className="flex">
              <ul className="flex flex-col gap-4 text-center text-purple-950 text-2xl md:text-4xl font-[Equivalent]">
                <li><a className="hover:text-purple-800 hover:underline" href="#beginnings" onClick={() => setIsOpen(false)}>Home</a></li>
                <li><a className="hover:text-purple-800 hover:underline" href="#schedule" onClick={() => setIsOpen(false)}>Schedule</a></li>
                <li><a className="hover:text-purple-800 hover:underline" href="#proshows" onClick={() => setIsOpen(false)}>Proshows & GL</a></li>
                <li><a className="hover:text-purple-800 hover:underline" href="#events" onClick={() => setIsOpen(false)}>Events</a></li>
                <li><a className="hover:text-purple-800 hover:underline" href="#experience" onClick={() => setIsOpen(false)}>Merchandise</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
