import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className='wrapper'>
      <div className='min-h-screen flex flex-col'>
        <header className='bg-[#060061]'>
          <div className='ml-4'>
            <img src="/logo.png" alt="Logo" className='h-12' />
          </div>
        </header>

        <main id="hero" className='p-4 pt-20 grow relative flex flex-col md:items-center gap-20'>
          <h1 className='font-[Equivalent] text-5xl md:text-7xl'>
            ORIENTATION '25
          </h1>

          <div className='max-w-lg absolute bottom-8 md:bottom-20 left-4 md:left-12'>
            <h2 className='font-[Equivalent] text-2xl pl-2 border-l-4 border-l-white drop-shadow-[3px_3px_10px_#00000033]'>
              New Beginnings
            </h2>
            <p className='mt-2 text-sm drop-shadow-[3px_3px_10px_#00000033]'>
              Tired of sleepless nights and endless practice? It's time to dive into the excitement! Welcome to NIT Trichy, where Orientation meets Celebration! Kickstart your college journey with fun, friends, and unforgettable memories.
            </p>
          </div>
        </main>
      </div>

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

      <section className='p-4 my-10 flex flex-col items-center'>
        <h3 className='font-[Equivalent] text-9xl text-nowrap self-start'>
          Are you ready to Experience?
        </h3>
      </section>
    </div>
  )
}
