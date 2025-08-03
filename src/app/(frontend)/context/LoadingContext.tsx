"use client"
import { createContext, useContext, useState } from "react"

interface LoadingContextType {
  loading: boolean
  completedEndAnimation: boolean
  setLoading: (loading: boolean) => void
  setCompletedEndAnimation: (completed: boolean) => void
}

const loadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [loading, setLoading] = useState(true)
  const [completedEndAnimation, setCompletedEndAnimation] = useState(false)

  return (
    <loadingContext.Provider
      value={{
        loading,
        completedEndAnimation,
        setLoading,
        setCompletedEndAnimation,
      }}
    >
      {children}
    </loadingContext.Provider>
  )
}

export const useLoadingContext = () => {
  const context = useContext(loadingContext)
  if (!context) {
    throw new Error("useLoadingContext must be used within a LoadingContextProvider")
  }
  return context
}