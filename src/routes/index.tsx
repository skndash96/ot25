import { useGSAP } from '@gsap/react'
import { createFileRoute } from '@tanstack/react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to("#new-beginnings", {
      width: '50vw',
      rotate: 4,
      margin: '0 auto',
      maxWidth: '100vw',
    })

    tl.to('#new-beginnings', {
      scrollTrigger: {
        trigger: '#new-beginnings',
        start: 'top 80%',
        end: 'top 10%',
        scrub: true,
        onUpdate: (self) => {
          gsap.set('#new-beginnings', {
            maxWidth: '100vw',
            margin: '0 auto',
            rotate: `${4 - self.progress * 4}deg`,
            width: `${50 + self.progress * 50}vw`,
          })
        }
      },
    })

    ScrollTrigger.create({
      trigger: '#new-beginnings',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      pin: true,
    })
  }, [])

  return (
    <div className='wrapper'>
      <div className='min-h-screen flex flex-col'>
        <header className=''>
          <div className='ml-4'>
            <img src="/logo.png" alt="Logo" className='h-12' />
          </div>
        </header>

        <main className='p-4 pt-20 grow relative flex flex-col md:items-center gap-20'>
          <h1 className='font-[Equivalent_Bold] text-4xl md:text-7xl lg:text-9xl w-fit mx-auto text-right'>
            ORIENTATION '25
          </h1>
        </main>
      </div>

      <section id="new-beginnings" className='relative h-screen flex flex-row md:items-start overflow-hidden'>
        <img src="/concert.jpg" alt="Concert" className='z-[-1] object-cover object-left w-full h-full absolute inset-0' />

        <div className='p-4 shrink-0 basis-full'>
          <h2 className='font-[Equivalent] text-4xl md:text-7xl'>
            New Beginnings
          </h2>
          <p className='mt-2 max-w-2xl text-base md:text-xl'>
            Tired of sleepless nights and endless practice? It's time to dive into the excitement! Welcome to NIT Trichy, where Orientation meets Celebration! Kickstart your college journey with fun, friends, and unforgettable memories.
          </p>
        </div>
      </section>

      <section className='p-4 my-10 flex flex-col items-center'>
        <h1 className='font-[Equivalent] text-6xl'>
          Events
        </h1>

        <p className='max-w-2xl'>
          We are packed with exciting events crafted to spark your passion, fuel your fire and showcase your talent to your peers. Sign up for an unforgettable experience filled with laughter, creativity, and camaraderie. The ball is now in your court…
        </p>

        <div className='mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
          {[
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
          ].map((image, index) => (
            <img
              key={index}
              alt={image.alt}
              src={image.src}
              className='rounded-lg shadow-lg w-52 h-auto'
            />
          ))}
        </div>
      </section>

      <section className='p-4 my-10 flex flex-col items-center'>
        <h1 className='font-[Equivalent] text-6xl'>
          Proshows GL
        </h1>
        <p className='max-w-2xl'>
          Whether you&apos;re craving for entertainment or enlightenment…Look no further! Orientation has something incredible in store for you. Our Proshows and Guest Lecture will definitely leave you spellbound and inspired. Don&apos;t miss out—join the magic at NIT Trichy!
        </p>

        <div className='mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
          {[
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
          ].map((image, index) => (
            <img
              key={index}
              alt={image.alt}
              src={image.src}
              className='rounded-lg shadow-lg w-52 h-auto'
            />
          ))}
        </div>
      </section>

      <section className='p-4 my-10 flex flex-col items-center'>
        <h1 className='font-[Equivalent] text-6xl'>
          Merchandise
        </h1>
        <p className='max-w-2xl'>
          Flaunt your Orientation spirit with our exclusive merchandise! From cool caps and trendy t-shirts to a custom-designed diary, we&apos;ve crafted it all to perfection, just for you. Grab your Orientation merch today and carry a piece of the fest with you wherever you go. Don&apos;t miss out on these limited-edition items—get yours before they&apos;re gone!
        </p>

        <div className='mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
          {[
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
            {
              alt: "Pic 1",
              src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTY5NzE3NTg&ixlib=rb-4.0.3&q=80&w=400",
            },
          ].map((image, index) => (
            <img
              key={index}
              alt={image.alt}
              src={image.src}
              className='rounded-lg shadow-lg w-52 h-auto'
            />
          ))}
        </div>
      </section>

      {/* <section className='p-4 my-10 flex flex-col items-center'>
        <h3 className='font-sans text-6xl md:text-7xl lg:text-9xl text-nowrap self-start'>
          Are you ready to Experience?
        </h3>
      </section> */}

      <footer className='p-4 text-sm text-center text-gray-300'>
        Made with ❤️ by <a href="https://github.com/skndash96" target="_blank" className='hover:underline'>OT Design</a>
      </footer>
    </div>
  )
}
