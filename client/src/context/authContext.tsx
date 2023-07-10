import { createContext, useEffect, useState } from 'react'
import authApi from '../api/Auth/authApi'

export interface AuthContextProps {
  currentUser: any | null
  loginContext: (params: object) => Promise<void>
  logoutContext: () => Promise<void>
}

interface AuthContextProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<object | null>(() => {
    const storedUser = window.localStorage.getItem('userId')
    if (storedUser) {
      return JSON.parse(storedUser)
    }
    return null
  })

  const loginContext = async (params: object): Promise<void> => {
    const response = await authApi.login(params)
    setCurrentUser(response.data.data)
  }

  const logoutContext = async (): Promise<void> => {
    await authApi.logout()
    setCurrentUser(null)
  }

  useEffect(() => {
    const currentUserString = JSON.stringify(currentUser)
    window.localStorage.setItem('userId', currentUserString)
  }, [currentUser])

  return <AuthContext.Provider value={{ currentUser, loginContext, logoutContext }}>{children}</AuthContext.Provider>
}
