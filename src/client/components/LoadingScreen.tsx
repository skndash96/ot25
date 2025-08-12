"use client"
import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLoadingContext } from '../context/LoadingContext'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

export default function LoadingScreen() {
  const svgRef = useRef<SVGSVGElement>(null)
  const innerCircleRef = useRef<SVGCircleElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { loading, setLoading, completedEndAnimation, setCompletedEndAnimation } = useLoadingContext()
  const DURATION = 1

  useGSAP(() => {
    if (loading) {
      gsap.to(svgRef.current, {
        duration: DURATION,
        yoyo: true,
        repeat: -1,
        scale: 1.6,
        ease: "power3.inOut",
        transformOrigin: "center center",
      })

      gsap.fromTo(innerCircleRef.current, {
        duration: DURATION,
        yoyo: true,
        scale: 1.5,
        transformOrigin: "center center",
      }, {
        duration: DURATION,
        yoyo: true,
        repeat: -1,
        scale: 0.6,
        ease: "power3.inOut",
        transformOrigin: "center center",
      })
    } else {
      gsap.to(containerRef.current, {
        duration: 0.5,
        opacity: 0,
        ease: "power3.inOut",
        transformOrigin: "center center",
      })

      gsap.to(innerCircleRef.current, {
        duration: 0.5,
        scale: 5,
        ease: "power3.inOut",
        transformOrigin: "center center",
        onComplete: () => {
          setCompletedEndAnimation(true)
        }
      })
    }
  }, [loading])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    containerRef.current!.addEventListener('scroll', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })

    const timer = setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = 'auto'
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'auto'
    }
  }, [setLoading])

  if (completedEndAnimation) return null

  return (
    <div ref={containerRef} className='z-70 fixed inset-0 w-screen h-screen grid place-items-center bg-amber-500'>
      <div className='relative w-fit -translate-y-[10vh]'>
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          viewBox="0 0 512 512"
          width={300}
          style={{
            width: "clamp(200px, 62vw, 400px)",
            aspectRatio: "1 / 1",
          }}
        >
          <path
            d="M-218.318-101.467a160.938 160.938 0 0 0 160.94-160.937 160.938 160.938 0 0 0-160.94-160.938 160.938 160.938 0 0 0-134.012 72.088c7.287 18.46 11.887 41.834 11.887 71.643 0 61.044.162 96.861.341 122.343a160.938 160.938 0 0 0 121.784 55.801z"
            style={{
              display: "inline",
              fill: "black",
              fillRule: "evenodd",
              strokeWidth: 0.947461,
            }}
            transform="scale(-1)"
          />
          <path
            d="M465.869 337.447v81.516s-114.304 10.019-114.304-139.35c0-149.37-.911-170.318-.911-170.318h74.242v88.582h39.768v81.308h-39.607s-7.916 58.262 40.812 58.262z"
            style={{
              display: "inline",
              fill: "black",
              stroke: "black",
              strokeWidth: 0,
              paintOrder: "stroke fill markers",
            }}
          />
          <path
            ref={innerCircleRef}
            d="M218.45 186.995c-20.859-.187-41.32 9.145-55.127 24.725-19.059 20.267-25.123 51.509-14.87 77.404 10.88 29.378 41.523 50.46 73.017 48.65 18.327-.148 36.404-7.997 49.63-20.567 15.24-14.709 24.42-35.698 23.57-56.994-.401-31.764-23.352-61.61-53.947-70.178a75.801 75.801 0 0 0-22.273-3.04z"
            style={{
              display: "inline",
              fill: "orange",
              stroke: "orange",
              strokeWidth: 0,
              paintOrder: "stroke fill markers"
            }}
          />
        </svg>
      </div>
    </div>
  )
}
