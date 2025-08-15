import About from '@/client/components/About'
import Core from '@/client/components/Core'
import Events from '@/client/components/Events'
import Experience from '@/client/components/Experience'
import Header from '@/client/components/Header'
import Hero from '@/client/components/Hero'
import Footer from '@/client/components/Footer'
import Faqs from '@/client/components/Faqs'

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
        <Faqs />
        <Footer />
      </div>
    </>
  )
}
