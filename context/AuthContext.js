import React, { createContext, useContext, useState, useEffect } from "react"
import * as Auth from "../utils/auth"
import { GoogleAuthProvider } from "../components/auth/GoogleAuthProvider"

const AuthContext = createContext({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  register: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  loginWithApple: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updateProfile: async () => {},
  updateEmail: async () => {},
  updatePassword: async () => {},
  deleteAccount: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthState = async () => {
      try {
        // First check secure storage
        const storedUser = await Auth.getUserFromSecureStore()
        if (storedUser) {
          setUser(storedUser)
        }

        // Subscribe to auth state changes
        const unsubscribe = Auth.subscribeToAuthChanges((firebaseUser) => {
          if (firebaseUser) {
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            }
            setUser(userData)
          } else {
            setUser(null)
          }
          setIsLoading(false)
        })

        return unsubscribe
      } catch (error) {
        console.error("Error checking auth state:", error)
        setIsLoading(false)
      }
    }

    const unsubscribe = checkAuthState()
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe()
      }
    }
  }, [])

  // Register with email and password
  const register = async (email, password, displayName) => {
    setIsLoading(true)
    const result = await Auth.registerWithEmail(email, password, displayName)
    setIsLoading(false)
    return result
  }

  // Login with email and password
  const login = async (email, password) => {
    setIsLoading(true)
    const result = await Auth.signInWithEmail(email, password)
    setIsLoading(false)
    return result
  }

  // Login with Apple
  const loginWithApple = async () => {
    setIsLoading(true)
    const result = await Auth.signInWithApple()
    setIsLoading(false)
    return result
  }

  // Logout
  const logout = async () => {
    setIsLoading(true)
    const result = await Auth.signOutUser()
    setIsLoading(false)
    return result
  }

  // Reset password
  const resetPassword = async (email) => {
    return await Auth.sendPasswordReset(email)
  }

  // Update profile
  const updateProfile = async (displayName, photoURL) => {
    setIsLoading(true)
    const result = await Auth.updateUserProfile(displayName, photoURL)
    setIsLoading(false)
    return result
  }

  // Update email
  const updateEmail = async (newEmail, password) => {
    setIsLoading(true)
    const result = await Auth.updateUserEmail(newEmail, password)
    setIsLoading(false)
    return result
  }

  // Update password
  const updatePassword = async (currentPassword, newPassword) => {
    setIsLoading(true)
    const result = await Auth.updateUserPassword(currentPassword, newPassword)
    setIsLoading(false)
    return result
  }

  // Delete account
  const deleteAccount = async (password) => {
    setIsLoading(true)
    const result = await Auth.deleteUserAccount(password)
    setIsLoading(false)
    return result
  }

  return (
    <GoogleAuthProvider>
      {({ promptAsync }) => {
        // Define loginWithGoogle inside the render prop to access promptAsync
        const loginWithGoogle = async () => {
          setIsLoading(true)
          const result = await Auth.signInWithGoogle(promptAsync)
          setIsLoading(false)
          return result
        }

        return (
          <AuthContext.Provider
            value={{
              user,
              isLoading,
              isAuthenticated: !!user,
              register,
              login,
              loginWithGoogle,
              loginWithApple,
              logout,
              resetPassword,
              updateProfile,
              updateEmail,
              updatePassword,
              deleteAccount,
            }}
          >
            {children}
          </AuthContext.Provider>
        )
      }}
    </GoogleAuthProvider>
  )
}
