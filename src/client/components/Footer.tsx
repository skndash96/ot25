import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="p-8 flex flex-row gap-8 justify-center md:justify-between items-center bg-neutral-900">
      <div className="max-md:hidden flex flex-col items-center">
        <div className="flex flex-col">
          <Link href="/">
            <Image
              src="/logo_long_white.png"
              alt="OTD 25 Logo"
              width={200}
              height={60}
              className="h-auto"
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-end gap-4">
        <div className="flex gap-6 text-2xl">
          <Link
            href="https://instagram.com/nitt.orientation"
            target="_blank"
            className="hover:scale-110 transition-transform"
          >
            <svg
              className="w-8 aspect-square fill-orange-400 hover:fill-yellow-500"
              width={32}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
            </svg>
          </Link>
          <Link
            href="https://www.linkedin.com/company/orientation-team-nit-trichy"
            target="_blank"
            className="hover:scale-110 transition-transform"
          >
            <svg
              className="w-8 aspect-square fill-orange-400 hover:fill-yellow-500"
              width={32}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM165 266.2L231.5 266.2L231.5 480L165 480L165 266.2zM236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160C219.5 160 236.7 177.2 236.7 198.5zM413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480L413.9 480z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="hover:scale-110 transition-transform"
          >
            <Image src="/logo_short_white.png" alt="YouTube Logo" width={32} height={32} className="w-8 translate-y-1 h-auto" />
          </Link>
        </div>

        <div className="">
          Made with 💛 by{' '} OTD 25
          {/* <Link
            href="https://github.com/skndash96"
            target="_blank"
            className="underline hover:text-amber-950"
          >
            OTD 25 Team
          </Link> */}
        </div>
      </div>
    </footer>
  )
}
