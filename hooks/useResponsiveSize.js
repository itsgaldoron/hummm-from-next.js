import { useWindowDimensions } from "react-native"

export function useResponsiveSize() {
  const { width, height } = useWindowDimensions()

  // Base sizes are designed for iPhone 11 (414 x 896)
  const baseWidth = 414
  const baseHeight = 896

  // Calculate scale factors
  const widthScale = width / baseWidth
  const heightScale = height / baseHeight

  // Use the smaller scale factor to ensure content fits on screen
  const scale = Math.min(widthScale, heightScale)

  // Function to scale sizes
  const size = (size) => Math.round(size * scale)

  // Function to scale horizontal spacing
  const horizontalSize = (size) => Math.round(size * widthScale)

  // Function to scale vertical spacing
  const verticalSize = (size) => Math.round(size * heightScale)

  // Function to scale font sizes (with a minimum size)
  const fontSize = (size) => Math.max(12, Math.round(size * scale))

  return {
    width,
    height,
    scale,
    size,
    horizontalSize,
    verticalSize,
    fontSize,
    isSmallDevice: width < 375,
    isMediumDevice: width >= 375 && width < 414,
    isLargeDevice: width >= 414,
  }
}
