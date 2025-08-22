'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DTGItem({
  href,
  label,
  coverImage,
}: {
  href: string
  label: string
  coverImage: string
}) {
  return (
    <Link href={href} className="relative block mx-auto w-36 h-64" style={{ perspective: '1000px' }}>
      <div className="notebook">
        {/* Front face */}
        <div className="relative face front bg-amber-400">
          <Image src={coverImage} alt={label} layout="fill" objectFit="cover" />
        </div>

        {/* Back face */}
        <div className="face back text-center p-2">{label}</div>

        {/* Top face */}
        <div className="face top"></div>

        {/* Bottom face */}
        <div className="face bottom"></div>

        {/* Left face (spine) */}
        <div className="face left">
          <div className="spine-text">OTD &apos;25</div>
        </div>

        {/* Right face (spine) */}
        <div className="face right">
          <div className="spine-text">Welcome Freshers</div>
        </div>
      </div>

      <style jsx>{`
        .notebook {
          position: relative;
          width: 144px; /* 9 units */
          height: 256px; /* 16 units */
          transform-style: preserve-3d;
          animation: spinY 4s linear infinite;
        }

        .face {
          position: absolute;
          width: 144px;
          height: 256px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
        }

        .front {
          transform: translateZ(10px);
        }

        .back {
          background: linear-gradient(135deg, #e76f51 0%, #f4a261 100%);
          transform: rotateY(180deg) translateZ(10px);
        }

        .top {
          width: 144px;
          height: 20px;
          background: #8b4513;
          transform: rotateX(90deg) translateZ(10px);
        }

        .bottom {
          width: 144px;
          height: 20px;
          background: #8b4513;
          transform: rotateX(-90deg) translateZ(130px);
        }

        .left,
        .right {
          background: #000000;
        }

        .left {
          width: 20px;
          height: 256px;
          transform: rotateY(-90deg) translateZ(10px);
          font-size: 12px;
          color: #f4f1de;
          font-weight: bold;
        }

        .right {
          width: 20px;
          height: 256px;
          transform: rotateY(90deg) translateZ(134px);
          font-size: 12px;
          color: #f4f1de;
          font-weight: bold;
        }

        .spine-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        @keyframes spinY {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </Link>
  )
}
