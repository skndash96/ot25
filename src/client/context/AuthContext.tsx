"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify";

type Student = any
type FirebaseUser = any

interface AuthContextType {
  firebaseUser: any | null
  user: any | null
  isAuthenticated: boolean
  isLoading: boolean
}

const authContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Student | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const isAuthenticated = useMemo<boolean>(() => {
    return firebaseUser !== null;
  }, [firebaseUser])

  useEffect(() => {
  }, [])

  return (
    <authContext.Provider value={{
      user,
      firebaseUser,
      isLoading,
      isAuthenticated,
    }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}