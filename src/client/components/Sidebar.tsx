"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import Link from "next/link"
import { menuItems } from "../utils/menu"
import { useSession } from "next-auth/react"

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const { status } = useSession()
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
        y: "-200%",
        duration: 0.2,
        stagger: 0.05,
        ease: 'power1.out',
      })
    }
  }, [isOpen])

  return (
    <div ref={c1Ref} className="z-50 fixed -translate-y-full inset-0 bg-amber-900">
      <div ref={c2Ref} className="absolute -translate-y-full inset-0 bg-amber-500">
        <div ref={c3Ref} className="absolute -translate-y-full inset-0 grid place-items-center text-amber-200 bg-neutral-950">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 hover:text-amber-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={40}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex">
            <ul className="flex flex-col gap-4 text-center text-2xl sm:text-3xl md:text-4xl font-semibold">
              {menuItems.map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-500 hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {status === "authenticated" ? (
                <li>
                  <Link className="hover:text-amber-500 hover:underline" href="/profile" onClick={() => setIsOpen(false)}>
                    Student Profile
                  </Link>
                </li>
              ) : (
                <li>
                  <Link className="hover:text-amber-500 hover:underline" href="/login" onClick={() => setIsOpen(false)}>
                    Student Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}