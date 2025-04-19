import { TouchableOpacity, StyleSheet } from "react-native"
import { useTheme } from "../../context/ThemeContext"

export const IconBubble = ({ children, variant = "default", size = "medium", onPress, style, ...props }) => {
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

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          width: 40,
          height: 40,
        }
      case "large":
        return {
          width: 80,
          height: 80,
        }
      default:
        return {
          width: 56,
          height: 56,
        }
    }
  }

  const sizeStyles = getSizeStyles()

  return (
    <TouchableOpacity
      style={[
        styles.bubble,
        {
          backgroundColor: getBackgroundColor(),
          width: sizeStyles.width,
          height: sizeStyles.height,
        },
        style,
      ]}
      onPress={onPress}
      disabled={!onPress}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 5,
  },
})
