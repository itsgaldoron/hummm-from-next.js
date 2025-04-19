import React from "react";
import { View, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"

export const BackgroundShapes = () => {
  const { theme } = useTheme()

  return (
    <>
      <View style={[styles.waveShape, { backgroundColor: theme.primary }]} />
      <View
        style={[styles.circleShape, styles.topRight, { backgroundColor: theme.secondary, borderColor: "#000000" }]}
      />
      <View
        style={[styles.circleShape, styles.topLeft, { backgroundColor: theme.secondary, borderColor: "#000000" }]}
      />
      <View
        style={[styles.circleShape, styles.bottomRight, { backgroundColor: theme.secondary, borderColor: "#000000" }]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  waveShape: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    zIndex: -1,
  },
  circleShape: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 4,
    zIndex: -1,
    opacity: 0.6,
  },
  topRight: {
    top: 20,
    right: 0,
    width: 120,
    height: 120,
  },
  topLeft: {
    top: 40,
    left: 0,
    width: 90,
    height: 90,
  },
  bottomRight: {
    bottom: 60,
    right: 10,
    width: 60,
    height: 60,
  },
})
