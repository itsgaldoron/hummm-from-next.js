import { createContext, useContext } from "react"
import * as Google from "expo-auth-session/providers/google"

// Google auth configuration
const googleConfig = {
  expoClientId: "YOUR_EXPO_CLIENT_ID",
  iosClientId: "YOUR_IOS_CLIENT_ID",
  androidClientId: "YOUR_ANDROID_CLIENT_ID",
  webClientId: "YOUR_WEB_CLIENT_ID",
}

const GoogleAuthContext = createContext(null)

export const useGoogleAuth = () => useContext(GoogleAuthContext)

export const GoogleAuthProvider = ({ children }) => {
  const [request, response, promptAsync] = Google.useAuthRequest(googleConfig)

  const value = { request, response, promptAsync }

  // Handle both function as children and regular children
  if (typeof children === "function") {
    return children(value)
  }

  return <GoogleAuthContext.Provider value={value}>{children}</GoogleAuthContext.Provider>
}
