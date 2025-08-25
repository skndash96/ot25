import Footer from '@/client/components/Footer'
import Magazine from '@/client/components/op/Magazine'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "OT25 Magazine",
  description: "Dive into our vibrant Magazine, meticulously crafted to keep you informed and inspired throughout Orientation '25. Explore articles, stories, and insights that will enrich your college experience."
}

export default function page() {
  return (
    <div className='grow h-full'>
      <Magazine />
      <Footer />
    </div>
  )
}
