import Sidebar from "./sidebar";

export default function Hero() {
  return (
    <div className='min-h-[80vh] flex flex-col'>
      <header className='flex justify-between items-center'>
        <div className='ml-4'>
          <img src="/logo.png" alt="Logo" className='h-12' />
        </div>

        <Sidebar />
      </header>

      <main className='p-4 pt-20 grow relative flex flex-col md:items-center gap-20'>
        <h1 className='font-[Equivalent_Bold] text-4xl md:text-7xl lg:text-9xl w-fit mx-auto text-right'>
          ORIENTATION '25
        </h1>
      </main>
    </div>
  )
}
