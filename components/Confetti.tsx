import React, { useEffect, useRef } from "react"
import { StyleSheet } from "react-native"
import Animated, {
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  Easing,
} from "react-native-reanimated"
import { useResponsiveSize } from "../hooks/useResponsiveSize"

export const Confetti = () => {
  const [confetti, setConfetti] = useState([])
  const { width, height } = useResponsiveSize()

  useEffect(() => {
    const colors = ["#FF5757", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"]
    const confettiCount = 100
    const newConfetti = []

    for (let i = 0; i < confettiCount; i++) {
      const left = Math.random() * width
      const delay = Math.random() * 500
      const initialRotation = Math.random() * 360
      const size = 5 + Math.random() * 10
      const color = colors[Math.floor(Math.random() * colors.length)]
      const duration = 3000 + Math.random() * 2000

      // Add some physics properties
      const horizontalMovement = -30 + Math.random() * 60 // -30 to +30
      const rotationDirection = Math.random() > 0.5 ? 1 : -1
      const rotationSpeed = 0.1 + Math.random() * 0.4
      const gravity = 0.15 + Math.random() * 0.1

      newConfetti.push({
        id: i,
        left,
        color,
        size,
        initialRotation,
        delay,
        duration,
        horizontalMovement,
        rotationDirection,
        rotationSpeed,
        gravity,
      })
    }

    setConfetti(newConfetti)

    // Remove confetti after animation completes
    const timer = setTimeout(() => {
      setConfetti([])
    }, 6000)

    return () => clearTimeout(timer)
  }, [width, height])

  const animatedStyles = useMemo(() => {
    return confetti.map((piece) => {
      return useAnimatedStyle(() => {
        return {
          opacity: withSequence(
            withDelay(piece.delay, withTiming(1, { duration: 100 })),
            withTiming(1, { duration: piece.duration - 500 }),
            withTiming(0, { duration: 500 }),
          ),
          transform: [
            {
              translateX: withSequence(
                withDelay(piece.delay, withSpring(piece.horizontalMovement, { damping: 3 })),
                withTiming(piece.horizontalMovement * 2, { duration: piece.duration }),
              ),
            },
            {
              translateY: withSequence(
                withDelay(piece.delay, withTiming(0, { duration: 100 })),
                withTiming(height, {
                  duration: piece.duration,
                  easing: Easing.bezier(0.33, 0.1, 0.67, 0.9), // Custom easing for more realistic falling
                }),
              ),
            },
            {
              rotate: withSequence(
                withDelay(piece.delay, withTiming(`${piece.initialRotation}deg`, { duration: 100 })),
                withTiming(`${piece.initialRotation + 360 * piece.rotationDirection * piece.rotationSpeed}deg`, {
                  duration: piece.duration,
                }),
              ),
            },
          ],
        }
      })
    })
  }, [confetti, height])

  return (
    <>
      {confetti.map((piece, index) => {
        return (
          <Animated.View
            key={piece.id}
            style={[
              styles.confetti,
              {
                left: piece.left,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: Math.random() > 0.5 ? piece.size / 2 : 0, // Mix of circles and squares
              },
              animatedStyles[index],
            ]}
          />
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  confetti: {
    position: "absolute",
    top: -20,
    zIndex: 100,
  },
})
