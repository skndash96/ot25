import Footer from '@/client/components/Footer'
import Link from 'next/link'

const buttons = [
  { label: 'Magazine', slug: 'magazine' },
  { label: 'DTG Reels', slug: 'dtg-reels' },
  { label: 'Caricatures', slug: 'caricatures' },
]

export default function OnlinePresence() {
  return (
    <div className="grow flex flex-col min-h-screen">
      <main className="flex flex-col grow items-center px-8 text-center">
        <h1 className="mt-8 md:mt-20 text-5xl font-extrabold mb-4">Online Presence</h1>
        <p className="text-gray-500 mb-10 max-w-xl">
          Explore our digital footprint — from our creative magazine and engaging reels to quirky caricatures.
        </p>
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
          {buttons.map(({ label, slug }) => (
            <Link
              key={slug}
              href={`/online-presence/${slug}`}
              className="w-full max-w-md text-center py-6 md:py-12 rounded-2xl text-2xl md:text-4xl font-bold tracking-tight hover:scale-105 active:scale-95 transition-transform bg-orange-400 text-black shadow-xl"
            >
              {label}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}