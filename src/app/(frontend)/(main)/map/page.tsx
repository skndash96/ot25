'use client'
import Footer from '@/client/components/Footer'
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
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

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

  const handlePlaceClick = (place: Place, event: MouseEvent) => {
    event.stopPropagation()

    if (isZoomed) return // Prevent clicking when already zoomed

    setSelectedPlace(place)
    setIsZoomed(true)

    // Add a small delay before showing details for better UX
    setTimeout(() => {
      setShowDetails(true)
    }, 300)

    // Calculate zoom position
    if (imgRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()

      const zoomScale = 3 // 3x zoom

      // Apply zoom with transform origin as percentage
      if (imgRef.current) {
        containerRef.current.scrollTo({
          left: Math.max(0, place.x) - containerRect.width / 2,
          top: Math.max(0, place.y) - containerRect.height / 2,
        })

        imgRef.current.style.transition = 'transform 0.5s ease-in-out'
        imgRef.current.style.transformOrigin = `${place.x}px ${place.y}px`
        imgRef.current.style.transform = `scale(${zoomScale})`
      }
    }
  }

  const handleEscape = () => {
    setShowDetails(false)
    setIsZoomed(false)
    setSelectedPlace(null)

    if (imgRef.current) {
      imgRef.current.style.transform = 'scale(1)'
      imgRef.current.style.transition = 'transform 0.5s ease-in-out'
    }
  }

  const handleMapClick = (event: MouseEvent) => {
    if (!isZoomed) return

    // Check if click was on the map itself (not on a place or UI element)
    if (event.target === event.currentTarget || event.target === imgRef.current) {
      handleEscape()
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isZoomed) {
        handleEscape()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isZoomed])

  return (
    <>
      <div
        ref={containerRef}
        className="grow relative w-screen scroll-smooth overflow-auto cursor-pointer"
        onClick={handleMapClick}
        style={{
          cursor: isZoomed ? 'zoom-out' : 'default',
        }}
      >
        <Image
          ref={imgRef}
          src="/map_dark.png"
          alt="Map of NITT"
          width={ORIGINAL_WIDTH}
          height={ORIGINAL_HEIGHT}
          className="select-none min-w-[200vw] sm:min-w-[150vw] md:min-w-[120vw] lg:min-w-[100vw] xl:min-w-screen h-auto"
          style={{
            transition: 'transform 0.5s ease-in-out',
          }}
        />

        {currentPlaces.map((p, i) => {
          const isSelected = selectedPlace?.name === p.name
          return (
            <div
              key={i}
              className={`absolute transition-opacity duration-200 cursor-pointer hover:scale-125 ${
                isZoomed && !isSelected ? 'opacity-30' : 'opacity-100'
              }`}
              style={{
                left: p.x,
                top: p.y,
                transform: 'translate(-50%, -100%)',
                zIndex: isSelected ? 20 : 10,
                fontSize: isSelected ? '24px' : '16px',
                transition: 'all 0.3s ease',
              }}
              data-testid={`place-${Buffer.from(p.name).toString('base64')}`}
              title={!isZoomed ? `${p.name}: ${p.description}` : ''}
              onClick={(e) => handlePlaceClick(p, e)}
            >
              📍
            </div>
          )
        })}
      </div>

      {/* Details Panel */}
      {selectedPlace && (
        <div
          className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full text-white p-6 shadow-lg z-[1] after:absolute after:inset-x-0 after:top-0 after:h-[5vh] after:bg-gradient-to-t bg-black after:-translate-y-full after:from-black after:via-black after:to-transparent transition-all duration-300 ${
            showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="mb-4 flex justify-between items-start">
            <h2 className="text-3xl font-bold grow text-yellow-400 text-center">{selectedPlace.name}</h2>
            <button
              onClick={handleEscape}
              className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl leading-none"
              aria-label="Close"
            >.
              ×
            </button>
          </div>
          <p className="mb-4 text-lg text-gray-200 text-center leading-relaxed">{selectedPlace.description}</p>
        </div>
      )}

      {/* Overlay to help with click detection when zoomed */}
      {isZoomed && <div className="fixed inset-0 z-10 cursor-zoom-out" onClick={handleEscape} />}

      <Footer />
    </>
  )
}
