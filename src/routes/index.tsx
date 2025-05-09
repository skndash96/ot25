import Beginnings from '@/components/beginnings'
import Events from '@/components/events'
import Experience from '@/components/experience'
import Hero from '@/components/hero'
import ProshowsAndGL from '@/components/proshowsngl'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className='wrapper'>
      <Hero />

      <Beginnings />

      <ProshowsAndGL />

      <Events />

      <Experience />

      <footer className='p-4 text-sm text-center text-gray-300'>
        Made with ❤️ by <a href="https://github.com/skndash96" target="_blank" className='hover:underline'>OT Design</a>
      </footer>
    </div>
  )
}
