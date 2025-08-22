'use client'
import React from 'react'
import { Clock } from 'lucide-react'

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] rounded-2xl shadow-sm p-6 text-center">
      <Clock className="w-10 h-10 text-gray-300 mb-3 animate-pulse" />
      <h2 className="text-xl font-semibold text-gray-200">Coming Soon</h2>
      <p className="text-gray-300 text-sm mt-1">This section will be updated shortly.</p>
    </div>
  )
}
