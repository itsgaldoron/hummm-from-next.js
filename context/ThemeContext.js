import { createContext, useState, useContext } from "react"
import { useColorScheme } from "react-native"

// Define our theme colors
const lightTheme = {
  background: "#f5f9fa",
  foreground: "#0f0f0f",
  primary: "#ffd166",
  primaryForeground: "#1a1a1a",
  secondary: "#8ad8e0",
  secondaryForeground: "#1a1a1a",
  accent: "#ff5757",
  accentForeground: "#ffffff",
  muted: "#e6f3f5",
  mutedForeground: "#757575",
  card: "#ffffff",
  cardForeground: "#0f0f0f",
  border: "#e5e5e5",
  input: "#e5e5e5",
}

const darkTheme = {
  background: "#1a2e30",
  foreground: "#fafafa",
  primary: "#ffd166",
  primaryForeground: "#1a1a1a",
  secondary: "#1e4d54",
  secondaryForeground: "#fafafa",
  accent: "#ff5757",
  accentForeground: "#ffffff",
  muted: "#1e3336",
  mutedForeground: "#a5a5a5",
  card: "#262626",
  cardForeground: "#fafafa",
  border: "#404040",
  input: "#404040",
}

const ThemeContext = createContext({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme()
  const [isDark, setIsDark] = useState(colorScheme === "dark")

  const theme = isDark ? darkTheme : lightTheme

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}
