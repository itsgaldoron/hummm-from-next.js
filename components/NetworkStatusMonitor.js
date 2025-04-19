import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"
import { Wifi, WifiOff } from "react-native-feather"
import NetInfo from "@react-native-community/netinfo"
import { useTheme } from "../context/ThemeContext"
import { useResponsiveSize } from "../hooks/useResponsiveSize"

export const NetworkStatusMonitor = () => {
  const { theme } = useTheme()
  const { size, fontSize } = useResponsiveSize()
  const [isConnected, setIsConnected] = useState(true)
  const slideAnim = React.useRef(new Animated.Value(-100)).current

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected)

      // Animate the banner in or out
      Animated.timing(slideAnim, {
        toValue: state.isConnected ? -100 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    })

    return () => unsubscribe()
  }, [slideAnim])

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isConnected ? theme.primary : "#ef4444",
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        {isConnected ? (
          <Wifi width={size(20)} height={size(20)} color="#000000" style={styles.icon} />
        ) : (
          <WifiOff width={size(20)} height={size(20)} color="#ffffff" style={styles.icon} />
        )}
        <Text
          style={[
            styles.text,
            {
              color: isConnected ? "#000000" : "#ffffff",
              fontSize: fontSize(14),
            },
          ]}
        >
          {isConnected ? "Back online" : "No internet connection"}
        </Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: 40, // Account for status bar
    paddingBottom: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontFamily: "Rubik-Medium",
  },
})
