import About from '@/app/(frontend)/components/About'
import Core from '@/app/(frontend)/components/Core'
import Events from '@/app/(frontend)/components/Events'
import Experience from '@/app/(frontend)/components/Experience'
import Header from '@/app/(frontend)/components/Header'
import Hero from '@/app/(frontend)/components/Hero'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <div className="w-screen overflow-x-hidden">
        <Header type="homepage" />
        <Hero />
        <About />
        <Events />
        <Experience />
        <Core />
        <Footer />
      </div>
    </>
  )
}
