import React from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated"
import { Music } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { useResponsiveSize } from "../hooks/useResponsiveSize"

// Define a default theme matching the lightTheme from context
const defaultLoadingTheme = {
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

export const LoadingScreen = ({ message = "Loading..." }) => {
  // Use context theme, but fall back to defaultLoadingTheme if context value or theme property is missing
  const contextValue = useTheme()
  const theme = contextValue?.theme || defaultLoadingTheme
  const { size, fontSize } = useResponsiveSize()

  // Create animated values for the music notes
  const note1Opacity = useSharedValue(0)
  const note2Opacity = useSharedValue(0)
  const note3Opacity = useSharedValue(0)

  const note1Y = useSharedValue(0)
  const note2Y = useSharedValue(0)
  const note3Y = useSharedValue(0)

  // Start animations
  React.useEffect(() => {
    // Animate opacity
    note1Opacity.value = withRepeat(withTiming(1, { duration: 800, easing: Easing.ease }), -1, true)

    note2Opacity.value = withDelay(200, withRepeat(withTiming(1, { duration: 800, easing: Easing.ease }), -1, true))

    note3Opacity.value = withDelay(400, withRepeat(withTiming(1, { duration: 800, easing: Easing.ease }), -1, true))

    // Animate position
    note1Y.value = withRepeat(withTiming(-size(20), { duration: 800, easing: Easing.ease }), -1, true)

    note2Y.value = withDelay(200, withRepeat(withTiming(-size(20), { duration: 800, easing: Easing.ease }), -1, true))

    note3Y.value = withDelay(400, withRepeat(withTiming(-size(20), { duration: 800, easing: Easing.ease }), -1, true))
  }, [])

  // Create animated styles
  const note1Style = useAnimatedStyle(() => ({
    opacity: note1Opacity.value,
    transform: [{ translateY: note1Y.value }],
  }))

  const note2Style = useAnimatedStyle(() => ({
    opacity: note2Opacity.value,
    transform: [{ translateY: note2Y.value }],
  }))

  const note3Style = useAnimatedStyle(() => ({
    opacity: note3Opacity.value,
    transform: [{ translateY: note3Y.value }],
  }))

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Music width={size(40)} height={size(40)} color={theme.accent} />

          <View style={styles.notesContainer}>
            <Animated.Text style={[styles.note, note1Style, { color: theme.accent }]}>♪</Animated.Text>
            <Animated.Text style={[styles.note, note2Style, { color: theme.accent }]}>♫</Animated.Text>
            <Animated.Text style={[styles.note, note3Style, { color: theme.accent }]}>♩</Animated.Text>
          </View>
        </View>

        <Text style={[styles.title, { color: theme.foreground, fontSize: fontSize(24) }]}>Humming Game</Text>

        <Text style={[styles.message, { color: theme.foreground, fontSize: fontSize(16) }]}>{message}</Text>

        <ActivityIndicator size="large" color={theme.accent} style={styles.spinner} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 20,
  },
  notesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  note: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontFamily: "Fredoka-Bold",
    marginBottom: 10,
  },
  message: {
    fontFamily: "Rubik-Regular",
    marginBottom: 20,
    textAlign: "center",
  },
  spinner: {
    marginTop: 10,
  },
})
