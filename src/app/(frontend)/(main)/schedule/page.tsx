'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Clock, MapPin, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { scheduleData, getEventColor } from '@/client/utils/schedule'
import ComingSoon from '@/client/components/ComingSoon'

const getCurrentDay = () => {
  const today = new Date()
  const todayString = today.toISOString().split('T')[0]
  return todayString
}

export default function SchedulePage() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const today = getCurrentDay()
    const todayIndex = scheduleData.findIndex((day) => day.fullDate === today)
    if (todayIndex !== -1) {
      setSelectedDayIndex(todayIndex)
    }
  }, [])

  const animateItems = () => {
    setIsAnimating(true)
    itemRefs.current.forEach((item, index) => {
      if (item) {
        item.style.opacity = '0'
        item.style.transform = 'translateX(-20px)'
        setTimeout(() => {
          item.style.transition = 'all 0.4s ease-out'
          item.style.opacity = '1'
          item.style.transform = 'translateX(0)'
        }, index * 100)
      }
    })
    setTimeout(() => setIsAnimating(false), 600)
  }

  useEffect(() => {
    animateItems()
  }, [selectedDayIndex])

  const handleDaySelect = (index: number) => {
    if (index !== selectedDayIndex && !isAnimating) {
      setSelectedDayIndex(index)
    }
  }

  const handlePrevDay = () => {
    if (selectedDayIndex > 0 && !isAnimating) {
      setSelectedDayIndex(selectedDayIndex - 1)
    }
  }

  const handleNextDay = () => {
    if (selectedDayIndex < scheduleData.length - 1 && !isAnimating) {
      setSelectedDayIndex(selectedDayIndex + 1)
    }
  }

  const selectedDay = scheduleData[selectedDayIndex]
  const today = getCurrentDay()
  const isToday = selectedDay.fullDate === today

  // Get formatted date and day name from fullDate
  const getFormattedDate = (fullDate: string) => {
    const date = new Date(fullDate)
    return {
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
    }
  }

  const { date: selectedDateFormatted, dayName: selectedDayName } = getFormattedDate(
    selectedDay.fullDate,
  )

  return (
    <ComingSoon />
  )

  return (
    <div className="min-h-screen bg-neutral-900 font-sans">
      {/* Header with Day Navigation */}
      <div className="bg-neutral-800 border-b border-neutral-700 sticky top-0 z-[1] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto p-4">
          {/* Mobile Navigation */}
          <div className="flex items-center justify-between mb-4 md:hidden">
            <button
              onClick={handlePrevDay}
              disabled={selectedDayIndex === 0 || isAnimating}
              className="p-2 rounded-lg bg-neutral-700 text-neutral-300 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h1 className="text-xl font-medium text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {selectedDateFormatted}
              </h1>
              <p className="text-sm text-neutral-400">{selectedDayName}</p>
              {isToday && (
                <span className="inline-block mt-1 px-2 py-1 bg-amber-500 text-black text-xs font-medium rounded-full">
                  TODAY
                </span>
              )}
            </div>

            <button
              onClick={handleNextDay}
              disabled={selectedDayIndex === scheduleData.length - 1 || isAnimating}
              className="p-2 rounded-lg bg-neutral-700 text-neutral-300 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:block">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-medium text-white flex items-center gap-3">
                <Calendar className="w-6 h-6 text-amber-400" />
                OT&apos;25 Schedule
              </h1>
            </div>

            <div
              ref={tabsContainerRef}
              className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-track-neutral-700 scrollbar-thumb-neutral-600"
            >
              {scheduleData.map((day, index) => {
                const isDayToday = day.fullDate === today
                const isSelected = index === selectedDayIndex
                const { date: dayFormatted, dayName } = getFormattedDate(day.fullDate)

                return (
                  <button
                    key={day.fullDate}
                    onClick={() => handleDaySelect(index)}
                    disabled={isAnimating}
                    className={`flex-shrink-0 px-4 py-3 rounded-lg transition-all duration-200 relative ${
                      isSelected
                        ? 'bg-amber-500 text-black font-medium shadow-lg'
                        : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:text-white'
                    } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="text-sm font-medium">{dayFormatted}</div>
                    <div className="text-xs opacity-75">{dayName}</div>
                    {isDayToday && !isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                    )}
                    {isDayToday && isSelected && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-black text-amber-400 text-xs px-2 py-1 rounded-full font-bold">
                        TODAY
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="max-w-md mx-auto p-6">
        <div className="mb-6 md:hidden">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-neutral-800 rounded-lg">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="text-neutral-300 text-sm">{selectedDay.items.length} events</span>
            </div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative">
          {/* Vertical Gradient Line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 via-purple-400 to-pink-300 shadow-sm"></div>

          <div className="space-y-6">
            {selectedDay.items.map((item, itemIndex) => (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[itemIndex] = el
                }}
                className="relative flex items-start group"
              >
                {/* Colored Dot */}
                <div
                  className={`relative z-10 w-6 h-6 ${getEventColor(itemIndex)} rounded-full flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-200 ring-4 ring-neutral-900`}
                >
                  {/* Pulse effect for current time events */}
                  {isToday && (
                    <div
                      className={`absolute inset-0 ${getEventColor(itemIndex)} rounded-full animate-ping opacity-20`}
                    ></div>
                  )}
                </div>

                {/* Content */}
                <div className="ml-4 flex-1 pb-2">
                  <div className="bg-neutral-800/50 rounded-lg p-4 group-hover:bg-neutral-800/70 transition-colors duration-200 border border-neutral-700/50 group-hover:border-neutral-600/50">
                    <h3 className="text-white font-medium text-lg leading-tight mb-3 group-hover:text-amber-200 transition-colors duration-200">
                      {item.title}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center text-neutral-400 text-sm">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{item.time}</span>
                      </div>

                      <div className="flex items-center text-neutral-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}
