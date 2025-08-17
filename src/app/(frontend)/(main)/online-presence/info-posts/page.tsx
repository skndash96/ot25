'use client'

import React from 'react'
import Image from 'next/image'
import { MapPin, Camera } from 'lucide-react'
import Footer from '@/client/components/Footer'

export default function InfoPage() {
  return (
    <>
      <main className="min-h-screen text-amber-100 px-6 py-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-amber-400 drop-shadow-lg">
          Informative Posts
        </h1>

        <div className="space-y-24 max-w-7xl mx-auto">
          {/* Know your Places */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-2 text-amber-300">
              <MapPin className="w-6 h-6" /> Know Your Places
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <a
                  key={i}
                  href="https://instagram.com"
                  target="_blank"
                  className="group relative block"
                >
                  <div className="relative w-full aspect-[9/16] max-h-[500px] mx-auto overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src={`https://picsum.photos/400/700?random=${i}`}
                      alt={`Reel ${i}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Caricatures */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-2 text-amber-300">
              <Camera className="w-6 h-6" /> Caricatures
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={`https://picsum.photos/600/600?random=${i + 10}`}
                    alt={`Caricature ${i}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* In and Around Campus */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-amber-300">
              In & Around Campus
            </h2>
            <a href="https://instagram.com" target="_blank" className="block max-w-sm">
              <div className="relative w-full aspect-[3/4] max-h-[500px] overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="https://picsum.photos/400/533?random=21"
                  alt="Campus Insta Post"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </a>
          </section>

          {/* Campus Resources */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-amber-300">
              Campus Resources
            </h2>
            <a href="https://instagram.com" target="_blank" className="block max-w-sm">
              <div className="relative w-full aspect-[3/4] max-h-[500px] overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="https://picsum.photos/400/533?random=22"
                  alt="Campus Resource Post"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
