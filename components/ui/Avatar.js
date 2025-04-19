import { View, Image, Text, StyleSheet } from "react-native"
import { useTheme } from "../../context/ThemeContext"

export const Avatar = ({ source, name = "", size = "medium", style, ...props }) => {
  const { theme } = useTheme()

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          width: 40,
          height: 40,
          fontSize: 16,
        }
      case "large":
        return {
          width: 80,
          height: 80,
          fontSize: 32,
        }
      default:
        return {
          width: 56,
          height: 56,
          fontSize: 24,
        }
    }
  }

  const sizeStyles = getSizeStyles()
  const initial = name ? name.charAt(0).toUpperCase() : "?"

  return (
    <View
      style={[
        styles.avatar,
        {
          backgroundColor: theme.secondary,
          width: sizeStyles.width,
          height: sizeStyles.height,
        },
        style,
      ]}
      {...props}
    >
      {source ? (
        <Image source={source} style={styles.image} resizeMode="cover" />
      ) : (
        <Text style={[styles.initial, { fontSize: sizeStyles.fontSize }]}>{initial}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  initial: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    color: "#000000",
  },
})
