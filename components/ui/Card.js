import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../../context/ThemeContext"

export const Card = ({ children, variant = "default", style, onPress, ...props }) => {
  const { theme } = useTheme()

  const getBackgroundColor = () => {
    switch (variant) {
      case "primary":
        return theme.primary
      case "secondary":
        return theme.secondary
      case "accent":
        return theme.accent
      case "white":
        return "#ffffff"
      default:
        return "#ffffff"
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: getBackgroundColor(),
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 5,
    marginBottom: 16,
  },
})
