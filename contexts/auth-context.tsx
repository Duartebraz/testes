'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (phone: string, code: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('dashboard-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (phone: string, code: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulação de login via WhatsApp - substitua pela sua API
      const cleanPhone = phone.replace(/\D/g, '')
      
      if (cleanPhone === '11999999999' && code === '123456') {
        const userData: User = {
          id: cleanPhone,
          name: 'Usuário WhatsApp',
          email: `user${cleanPhone}@whatsapp.local`,
          phone: phone
        }
        
        setUser(userData)
        localStorage.setItem('dashboard-user', JSON.stringify(userData))
        setIsLoading(false)
        return true
      }
      
      setIsLoading(false)
      return false
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('dashboard-user')
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}