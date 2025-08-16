// Starfield.tsx
'use client'
import React, { useEffect, useRef } from 'react'
import { params, Star, Dot, degToRad } from '@/client/lib/stars';

// Define the state type for the useRef hook
interface StarfieldState {
  WIDTH: number;
  HEIGHT: number;
  mouseX: number;
  mouseY: number;
  mouseMoving: boolean;
  mouseMoveChecker: ReturnType<typeof setTimeout> | null;
  stars: Star[];
  dots: (Dot | null)[];
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<StarfieldState>({
    WIDTH: 0,
    HEIGHT: 0,
    mouseX: 0,
    mouseY: 0,
    mouseMoving: false,
    mouseMoveChecker: null,
    stars: [],
    dots: [],
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const state = stateRef.current;

    const setCanvasSize = () => {
      state.WIDTH = document.documentElement.clientWidth;
      state.HEIGHT = document.documentElement.clientHeight;
      canvas.width = state.WIDTH;
      canvas.height = state.HEIGHT;
    };

    const drawIfMouseMoving = () => {
      if (!state.mouseMoving) return;
      if (state.dots.length === 0) {
        state.dots[0] = new Dot(0, state.mouseX, state.mouseY, ctx, state);
        state.dots[0].draw();
        return;
      }
      const previousDot = state.dots[state.dots.length - 1];
      if (!previousDot) return;
      const diffX = Math.abs(previousDot.x - state.mouseX);
      const diffY = Math.abs(previousDot.y - state.mouseY);
      if (diffX < 2 || diffY < 2) return;
      const xVariation = (Math.random() > 0.5 ? -1 : 1) * Math.floor(Math.random() * params.maxDistFromCursor) + 1;
      const yVariation = (Math.random() > 0.5 ? -1 : 1) * Math.floor(Math.random() * params.maxDistFromCursor) + 1;
      const newDot = new Dot(state.dots.length, state.mouseX + xVariation, state.mouseY + yVariation, ctx, state);
      state.dots.push(newDot);
      newDot.draw();
      newDot.link();
    };

    const animate = () => {
      ctx.clearRect(0, 0, state.WIDTH, state.HEIGHT);
      state.stars.forEach((s) => s.move());
      state.dots.forEach((d) => d?.move());
      drawIfMouseMoving();
      requestAnimationFrame(animate);
    };

    const init = () => {
      ctx.strokeStyle = 'white';
      ctx.shadowColor = 'white';
      const initStarsPopulation = 80;
      for (let i = 0; i < initStarsPopulation; i++) {
        state.stars[i] = new Star(i, Math.floor(Math.random() * state.WIDTH), Math.floor(Math.random() * state.HEIGHT), ctx, state.HEIGHT);
      }
      ctx.shadowBlur = 0;
      animate();
    };

    setCanvasSize();
    init();

    const handleMouseMove = (e: MouseEvent) => {
      state.mouseMoving = true;
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      if (state.mouseMoveChecker) clearTimeout(state.mouseMoveChecker);
      state.mouseMoveChecker = setTimeout(() => {
        state.mouseMoving = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      if (state.mouseMoveChecker) clearTimeout(state.mouseMoveChecker);
    };
  }, []);

  return (
    <div className='absolute inset-0'>
      <canvas ref={canvasRef} className='block' />
    </div>
  );
}