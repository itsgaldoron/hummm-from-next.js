import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Slider from "@react-native-community/slider"
import { Play, Pause, SkipBack, SkipForward } from "react-native-feather"
import { useAudioPlayback } from "../hooks/useAudioPlayback"
import { AudioVisualizer } from "./AudioVisualizer"
import { useTheme } from "../context/ThemeContext"
import { useResponsiveSize } from "../hooks/useResponsiveSize"
import { lightHaptic } from "../utils/haptics"

export const AudioPlayer = ({ uri, onComplete, style }) => {
  const { theme } = useTheme()
  const { size, fontSize } = useResponsiveSize()
  const [isSeeking, setIsSeeking] = useState(false)
  const [seekPosition, setSeekPosition] = useState(0)

  const { isPlaying, duration, position, isLoading, play, pause, seekTo } = useAudioPlayback(uri)

  useEffect(() => {
    if (!isSeeking) {
      setSeekPosition(position)
    }
  }, [position, isSeeking])

  useEffect(() => {
    if (position >= duration && duration > 0) {
      if (onComplete) {
        onComplete()
      }
    }
  }, [position, duration, onComplete])

  const handlePlayPause = () => {
    lightHaptic()
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const handleSkipBack = () => {
    lightHaptic()
    const newPosition = Math.max(0, position - 5) // Skip back 5 seconds
    seekTo(newPosition)
  }

  const handleSkipForward = () => {
    lightHaptic()
    const newPosition = Math.min(duration, position + 5) // Skip forward 5 seconds
    seekTo(newPosition)
  }

  const handleSeekStart = () => {
    setIsSeeking(true)
  }

  const handleSeekComplete = (value) => {
    seekTo(value)
    setIsSeeking(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <View style={[styles.container, style]}>
      <AudioVisualizer isActive={isPlaying} />

      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, { color: theme.foreground, fontSize: fontSize(12) }]}>
          {formatTime(seekPosition)}
        </Text>
        <Text style={[styles.timeText, { color: theme.foreground, fontSize: fontSize(12) }]}>
          {formatTime(duration)}
        </Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration || 1}
        value={seekPosition}
        onSlidingStart={handleSeekStart}
        onSlidingComplete={handleSeekComplete}
        onValueChange={setSeekPosition}
        minimumTrackTintColor={theme.accent}
        maximumTrackTintColor={theme.muted}
        thumbTintColor={theme.accent}
        disabled={isLoading || duration === 0}
      />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handleSkipBack} disabled={isLoading}>
          <SkipBack width={size(24)} height={size(24)} color={theme.foreground} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: theme.accent }]}
          onPress={handlePlayPause}
          disabled={isLoading || duration === 0}
        >
          {isPlaying ? (
            <Pause width={size(24)} height={size(24)} color="#ffffff" />
          ) : (
            <Play width={size(24)} height={size(24)} color="#ffffff" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={handleSkipForward} disabled={isLoading}>
          <SkipForward width={size(24)} height={size(24)} color={theme.foreground} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    fontFamily: "Rubik-Regular",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  controlButton: {
    padding: 12,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
  },
})
