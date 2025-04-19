import { useRef, useEffect, useState } from "react"

export function useAudioVisualization(recording) {
  const [meterLevel, setMeterLevel] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!recording) {
      setIsActive(false)
      return
    }

    // Set up metering updates
    const onRecordingStatusUpdate = (status) => {
      if (status.isRecording && status.metering !== undefined) {
        // Convert dB to a value between 0 and 1
        // Typical values range from -160 (silence) to 0 (max volume)
        const normalizedLevel = Math.max(0, (status.metering + 160) / 160)
        setMeterLevel(normalizedLevel)
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }

    recording.setOnRecordingStatusUpdate(onRecordingStatusUpdate)

    return () => {
      if (recording) {
        recording.setOnRecordingStatusUpdate(null)
      }
    }
  }, [recording])

  return { meterLevel, isActive }
}
