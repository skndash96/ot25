'use client'

import React from 'react'
import Image from 'next/image'
import { MapPin, Camera } from 'lucide-react'
import Footer from '@/client/components/Footer'

const data = [
  {
    title: 'Know Your Places',
    icon: <MapPin className="w-6 h-6" />,
    layout: 'grid grid-cols-1 sm:grid-cols-2 gap-8',
    items: Array(2).fill({
      href: 'https://instagram.com',
      aspect: 'aspect-[9/16]',
      src: 'https://picsum.photos/400/700',
    }),
  },
  {
    title: 'Caricatures',
    icon: <Camera className="w-6 h-6" />,
    layout: 'grid grid-cols-2 sm:grid-cols-4 gap-6',
    items: Array(4).fill({
      aspect: 'aspect-square',
      src: 'https://picsum.photos/600/600',
    }),
  },
  {
    title: 'In & Around Campus',
    items: [
      {
        href: 'https://instagram.com',
        aspect: 'aspect-[3/4]',
        src: 'https://picsum.photos/400/533',
      },
    ],
  },
  {
    title: 'Campus Resources',
    items: [
      {
        href: 'https://instagram.com',
        aspect: 'aspect-[3/4]',
        src: 'https://picsum.photos/400/533',
      },
    ],
  },
]

export default function InfoPage() {
  return (
    <>
      <main className="min-h-screen text-amber-100 px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-amber-400 drop-shadow-lg">
          Informative Posts
        </h1>

        <div className="space-y-24 max-w-7xl mx-auto">
          {data.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-2 text-amber-300">
                {section.icon} {section.title}
              </h2>

              <div className={section.layout ?? 'block max-w-sm'}>
                {section.items.map((item, i) => {
                  const Wrapper = item.href ? 'a' : 'div'
                  return (
                    <Wrapper
                      key={i}
                      href={item.href}
                      target="_blank"
                      className="group relative block"
                    >
                      <div
                        className={`relative w-full ${item.aspect} max-h-[500px] overflow-hidden rounded-xl shadow-lg`}
                      >
                        <Image
                          src={item.src}
                          alt={`${section.title} ${i + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 bg-neutral-800"
                        />
                      </div>
                    </Wrapper>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
