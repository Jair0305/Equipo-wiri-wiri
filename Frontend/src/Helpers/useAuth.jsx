import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [role, setRole] = useState(localStorage.getItem('role') || '')

  const login = (token, userRole) => {
    setIsLoggedIn(true)
    localStorage.setItem('token', token)
    localStorage.setItem('role', userRole)
    setRole(userRole)
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }

  return <AuthContext.Provider value={{ isLoggedIn, login, logout, role }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
