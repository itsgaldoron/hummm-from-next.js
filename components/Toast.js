import { useState, useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { CheckCircle, AlertCircle, X } from "react-native-feather"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { useTheme } from "../context/ThemeContext"

export const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true)
  const { theme } = useTheme()
  const translateY = useSharedValue(-100)

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 })

    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    translateY.value = withTiming(-100, { duration: 300 })
    setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, 300)
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  if (!visible) return null

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View
        style={[
          styles.toast,
          {
            backgroundColor: theme.card,
            borderColor: "#000000",
            borderLeftColor: type === "success" ? "#10b981" : "#ef4444",
          },
        ]}
      >
        {type === "success" ? (
          <CheckCircle width={20} height={20} color="#10b981" />
        ) : (
          <AlertCircle width={20} height={20} color="#ef4444" />
        )}
        <Text style={[styles.message, { color: theme.foreground }]}>{message}</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X width={16} height={16} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 4,
    borderLeftWidth: 8,
    borderRadius: 16,
    padding: 16,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 5,
  },
  message: {
    flex: 1,
    marginLeft: 12,
    fontFamily: "Rubik-Regular",
    fontSize: 14,
  },
  closeButton: {
    padding: 4,
  },
})
