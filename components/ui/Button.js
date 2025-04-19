import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useTheme } from "../../context/ThemeContext"

export const Button = ({
  children,
  variant = "default",
  size = "medium",
  onPress,
  style,
  textStyle,
  disabled,
  ...props
}) => {
  const { theme } = useTheme()

  const getBackgroundColor = () => {
    if (disabled) return "#cccccc"

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

  const getTextColor = () => {
    if (disabled) return "#888888"

    switch (variant) {
      case "primary":
        return theme.primaryForeground
      case "secondary":
        return theme.secondaryForeground
      case "accent":
        return theme.accentForeground
      default:
        return "#000000"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 14,
        }
      case "large":
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          fontSize: 18,
        }
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 20,
          fontSize: 16,
        }
    }
  }

  const sizeStyles = getSizeStyles()

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: sizeStyles.fontSize,
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: "#000000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 5,
  },
  text: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    textAlign: "center",
  },
})
