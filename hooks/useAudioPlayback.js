import { useState, useEffect, useRef } from "react"
import { Audio } from "expo-av"
import { configureAudioForPlayback } from "../utils/audioUtils"

export function useAudioPlayback(uri) {
  const [sound, setSound] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const positionUpdateInterval = useRef(null)

  useEffect(() => {
    const loadSound = async () => {
      if (!uri) return

      try {
        setIsLoading(true)
        setError(null)

        await configureAudioForPlayback()
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false },
          onPlaybackStatusUpdate,
        )

        const status = await newSound.getStatusAsync()
        setDuration(status.durationMillis / 1000) // Convert to seconds
        setSound(newSound)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading sound:", error)
        setError(error)
        setIsLoading(false)
      }
    }

    loadSound()

    return () => {
      if (sound) {
        sound.unloadAsync()
      }
      if (positionUpdateInterval.current) {
        clearInterval(positionUpdateInterval.current)
      }
    }
  }, [uri])

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis / 1000) // Convert to seconds
      setIsPlaying(status.isPlaying)

      if (status.didJustFinish) {
        setIsPlaying(false)
        setPosition(0)
      }
    }
  }

  const play = async () => {
    if (!sound) return

    try {
      await sound.playFromPositionAsync(position * 1000) // Convert back to milliseconds
      setIsPlaying(true)

      // Start position update interval
      if (positionUpdateInterval.current) {
        clearInterval(positionUpdateInterval.current)
      }

      positionUpdateInterval.current = setInterval(async () => {
        if (sound) {
          const status = await sound.getStatusAsync()
          setPosition(status.positionMillis / 1000)
        }
      }, 100)
    } catch (error) {
      console.error("Error playing sound:", error)
      setError(error)
    }
  }

  const pause = async () => {
    if (!sound) return

    try {
      await sound.pauseAsync()
      setIsPlaying(false)

      if (positionUpdateInterval.current) {
        clearInterval(positionUpdateInterval.current)
      }
    } catch (error) {
      console.error("Error pausing sound:", error)
      setError(error)
    }
  }

  const stop = async () => {
    if (!sound) return

    try {
      await sound.stopAsync()
      await sound.setPositionAsync(0)
      setIsPlaying(false)
      setPosition(0)

      if (positionUpdateInterval.current) {
        clearInterval(positionUpdateInterval.current)
      }
    } catch (error) {
      console.error("Error stopping sound:", error)
      setError(error)
    }
  }

  const seekTo = async (seconds) => {
    if (!sound) return

    try {
      await sound.setPositionAsync(seconds * 1000) // Convert to milliseconds
      setPosition(seconds)
    } catch (error) {
      console.error("Error seeking sound:", error)
      setError(error)
    }
  }

  return {
    sound,
    isPlaying,
    duration,
    position,
    isLoading,
    error,
    play,
    pause,
    stop,
    seekTo,
  }
}
