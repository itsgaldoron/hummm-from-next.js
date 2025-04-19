import { useEffect, useRef } from "react"

interface AudioVisualizerProps {
  isActive: boolean
}

export function AudioVisualizer({ isActive }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Generate random bars for visualization
    const barCount = 40
    const barWidth = width / barCount
    const bars: number[] = []

    for (let i = 0; i < barCount; i++) {
      bars[i] = 0
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update bar heights with random values if active
      if (isActive) {
        for (let i = 0; i < barCount; i++) {
          // Smooth transitions for bar heights
          const targetHeight = Math.random() * height * 0.8
          bars[i] = bars[i] * 0.9 + targetHeight * 0.1
        }
      } else {
        // Gradually reduce heights when not active
        for (let i = 0; i < barCount; i++) {
          bars[i] *= 0.95
        }
      }

      // Draw bars
      ctx.fillStyle = isActive ? "#FF5757" : "#9ca3af"

      for (let i = 0; i < barCount; i++) {
        const x = i * barWidth
        const barHeight = bars[i]

        // Draw rounded bars
        const radius = barWidth / 2

        ctx.beginPath()
        ctx.moveTo(x, height)
        ctx.lineTo(x, height - barHeight + radius)
        ctx.quadraticCurveTo(x, height - barHeight, x + radius, height - barHeight)
        ctx.lineTo(x + barWidth - radius, height - barHeight)
        ctx.quadraticCurveTo(x + barWidth, height - barHeight, x + barWidth, height - barHeight + radius)
        ctx.lineTo(x + barWidth, height)
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  return <canvas ref={canvasRef} width={300} height={60} className="w-full h-[60px]" />
}
