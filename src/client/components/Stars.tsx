'use client'
import React, { useEffect, useRef } from 'react'
import { params, Star, Dot } from '@/client/lib/stars'

export default function Starfield() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const stateRef = useRef({
    WIDTH: 0,
    HEIGHT: 0,
    mouseX: 0,
    mouseY: 0,
    mouseMoving: false,
    mouseMoveChecker: null as ReturnType<typeof setTimeout> | null,
    stars: [] as Star[],
    dots: [] as (Dot | null)[],
  })

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const state = stateRef.current

    const setCanvasSize = () => {
      state.WIDTH = containerRef.current?.clientWidth ?? window.innerWidth
      state.HEIGHT = containerRef.current?.clientHeight ?? window.innerHeight
      canvas.width = state.WIDTH
      canvas.height = state.HEIGHT
    }

    const drawIfMouseMoving = () => {
      if (!state.mouseMoving) return
      if (state.dots.length === 0) {
        state.dots[0] = new Dot(0, state.mouseX, state.mouseY, ctx, state)
        state.dots[0].draw()
        return
      }
      const prev = state.dots[state.dots.length - 1]
      if (!prev) return
      const diffX = Math.abs(prev.x - state.mouseX)
      const diffY = Math.abs(prev.y - state.mouseY)
      if (diffX < 2 || diffY < 2) return

      const xv = (Math.random() > 0.5 ? -1 : 1) * Math.floor(Math.random() * params.maxDistFromCursor) + 1
      const yv = (Math.random() > 0.5 ? -1 : 1) * Math.floor(Math.random() * params.maxDistFromCursor) + 1
      const newDot = new Dot(state.dots.length, state.mouseX + xv, state.mouseY + yv, ctx, state)
      state.dots.push(newDot)
      newDot.draw()
      newDot.link()
    }

    const animate = () => {
      ctx.clearRect(0, 0, state.WIDTH, state.HEIGHT)
      state.stars.forEach((s) => s.move())
      state.dots.forEach((d) => d?.move())
      drawIfMouseMoving()
      requestAnimationFrame(animate)
    }

    const init = () => {
      const initStars = 80
      for (let i = 0; i < initStars; i++) {
        state.stars[i] = new Star(i, Math.random() * state.WIDTH, Math.random() * state.HEIGHT, ctx, state.HEIGHT)
      }
      animate()
    }

    setCanvasSize()
    init()

    // event handlers
    const handleMove = (x: number, y: number) => {
      state.mouseMoving = true
      state.mouseX = x
      state.mouseY = y
      if (state.mouseMoveChecker) clearTimeout(state.mouseMoveChecker)
      state.mouseMoveChecker = setTimeout(() => {
        state.mouseMoving = false
      }, 100)
    }

    const onMouseMove = (e: MouseEvent) => handleMove(e.offsetX, e.offsetY)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        const rect = canvas.getBoundingClientRect()
        handleMove(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top)
      }
    }

    const container = containerRef.current
    container?.addEventListener('mousemove', onMouseMove)
    container?.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('resize', setCanvasSize)

    return () => {
      container?.removeEventListener('mousemove', onMouseMove)
      container?.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', setCanvasSize)
      if (state.mouseMoveChecker) clearTimeout(state.mouseMoveChecker)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
