import React, { useEffect, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { Canvas, Path, useCanvasRef } from "@shopify/react-native-skia"
import { useTheme } from "../context/ThemeContext"
import {
  useSharedValue,
  useAnimatedReaction,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated"
import { useResponsiveSize } from "../hooks/useResponsiveSize"

export const AudioVisualizer = ({ isActive }) => {
  const { theme } = useTheme()
  const { size } = useResponsiveSize()
  const canvasRef = useCanvasRef()
  const animationValue = useSharedValue(0)

  // Create an array of shared values for each bar
  const barCount = 40
  const barValues = useMemo(() => Array.from({ length: barCount }, () => useSharedValue(0)), [barCount])

  useEffect(() => {
    const animateBars = () => {
      barValues.forEach((bar, index) => {
        bar.value = withRepeat(
          withSequence(
            withDelay(
              index * 50,
              withTiming(Math.random() * 0.8, {
                duration: 500 + Math.random() * 500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              }),
            ),
            withTiming(Math.random() * 0.3, {
              duration: 500 + Math.random() * 500,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
          ),
          -1,
          true,
        )
      })
    }

    if (isActive) {
      animateBars()

      // Main animation value for redrawing
      animationValue.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true)
    } else {
      // Gradually reduce heights when not active
      barValues.forEach((bar) => {
        bar.value = withTiming(0, { duration: 500 })
      })

      animationValue.value = withTiming(0, { duration: 500 })
    }
  }, [isActive, animationValue, barValues])

  useAnimatedReaction(
    () => animationValue.value,
    () => {
      if (canvasRef.current) {
        canvasRef.current.redraw()
      }
    },
  )

  const onDraw = ({ canvas, width, height }) => {
    const barWidth = width / barCount
    const color = isActive ? theme.accent : theme.mutedForeground

    canvas.clear()

    for (let i = 0; i < barCount; i++) {
      const barHeight = barValues[i].value * height

      const x = i * barWidth
      const radius = barWidth / 2

      const path = new Path()
      path.moveTo(x, height)
      path.lineTo(x, height - barHeight + radius)
      path.quadTo(x, height - barHeight, x + radius, height - barHeight)
      path.lineTo(x + barWidth - radius, height - barHeight)
      path.quadTo(x + barWidth, height - barHeight, x + barWidth, height - barHeight + radius)
      path.lineTo(x + barWidth, height)
      path.close()

      canvas.drawPath(path, { color })
    }
  }

  return (
    <View style={[styles.container, { height: size(60) }]}>
      <Canvas ref={canvasRef} style={styles.canvas} onDraw={onDraw} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  canvas: {
    flex: 1,
  },
})
