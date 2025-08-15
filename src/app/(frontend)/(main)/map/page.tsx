'use client'
import Image from 'next/image'
import React, { useState, useEffect, MouseEvent, useRef, useMemo } from 'react'

interface Place {
  name: string
  description: string
  x: number // pixel coord at original 1920 width
  y: number // pixel coord at original 1080 height
}

export default function Map() {
  const [places, setPlaces] = useState<Place[]>([])
  const imgRef = useRef<HTMLImageElement | null>(null)

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  })

  const currentPlaces = useMemo(() => {
    if (!imgRef.current) return []
    const rect = imgRef.current.getBoundingClientRect()

    const scaleX = rect.width / 1920
    const scaleY = rect.height / 1080

    return places.map((p) => ({
      ...p,
      x: Math.round(p.x * scaleX),
      y: Math.round(p.y * scaleY),
    }))
  }, [dimensions, places])

  const ORIGINAL_WIDTH = 1920
  const ORIGINAL_HEIGHT = 1080

  useEffect(() => {
    const stored = localStorage.getItem('mapPlaces')
    if (stored) {
      try {
        setPlaces(JSON.parse(stored) as Place[])
      } catch {
        console.error('Invalid data in localStorage')
      }
    }

    const handleResize = () => {
      if (imgRef.current) {
        setDimensions({
          width: imgRef.current.clientWidth,
          height: imgRef.current.clientHeight,
        })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mapPlaces', JSON.stringify(places))
  }, [places])

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()

    const scaleX = ORIGINAL_WIDTH / rect.width
    const scaleY = ORIGINAL_HEIGHT / rect.height

    // Convert click coords to original 1920×1080
    const x = Math.round((e.clientX - rect.left) * scaleX)
    const y = Math.round((e.clientY - rect.top) * scaleY)

    const name = prompt('Enter place name:')
    if (!name) return
    const description = prompt('Enter place description:') || ''

    setPlaces((prev) => [...prev, { name, description, x, y }])
  }

  const handleEdit = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const placeIndex = currentPlaces.findIndex(
      p => Buffer.from(p.name).toString('base64') === e.currentTarget.dataset.testid?.split('-').slice(1).join('-')
    )

    if (placeIndex === -1) return

    const name = prompt('Edit place name:', currentPlaces[placeIndex].name)
    if (name === null) return

    const description = prompt(
      'Edit place description:',
      currentPlaces[placeIndex].description
    ) || ''

    setPlaces((prev) => {
      const updated = [...prev]
      updated[placeIndex] = { ...updated[placeIndex], name, description }
      return updated
    })
  }

  return (
    <div className="grow relative w-screen overflow-x-scroll" onClick={handleClick}>
      <Image
        ref={imgRef}
        src="/map_dark.png"
        alt="Map of NITT"
        width={ORIGINAL_WIDTH}
        height={ORIGINAL_HEIGHT}
        className='select-none min-w-[200vw] sm:min-w-[150vw] md:min-w-[120vw] lg:min-w-[100vw] xl:min-w-screen h-auto'
      />

      {currentPlaces.map((p, i) => (
        <div
          key={i}
          className="absolute bg-red-500 text-white text-xs px-1 rounded cursor-pointer"
          style={{
            left: p.x,
            top: p.y,
            transform: 'translate(-50%, -100%)',
          }}
          data-testid={`place-${Buffer.from(p.name).toString('base64')}`}
          title={`${p.name}: ${p.description}`}
          onClick={handleEdit}
        >
          📍
        </div>
      ))}
    </div>
  )
}
