import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, Animated, Easing } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Disc3, Headphones, Mic, Pause, Play, Send } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { AudioVisualizer } from "../components/AudioVisualizer"
import { Toast } from "../components/Toast"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"
import {
  requestMicrophonePermissions,
  startRecording,
  stopRecording,
  playSound,
  pauseSound,
  unloadSound,
  saveRecording,
} from "../utils/audioUtils"
import { lightHaptic, mediumHaptic, successHaptic } from "../utils/haptics"
import { useResponsiveSize } from "../hooks/useResponsiveSize"

export default function RecordingScreen({ navigation, route }) {
  const { theme } = useTheme()
  const { size, fontSize } = useResponsiveSize()
  const [isRecording, setIsRecording] = useState(false)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [recordingUri, setRecordingUri] = useState(null)
  const [loading, setLoading] = useState(false)

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current
  const recordingAnim = useRef(new Animated.Value(0)).current

  const timerRef = useRef(null)
  const recordingRef = useRef(null)
  const soundRef = useRef(null)

  // Get song ID from route params
  const songId = route.params?.songId || "1"

  // Mock song data
  const song = {
    id: songId,
    title: "Bohemian Rhapsody",
    artist: "Queen",
  }

  useEffect(() => {
    // Request microphone permissions when component mounts
    const getPermissions = async () => {
      const granted = await requestMicrophonePermissions()
      setPermissionGranted(granted)
      if (!granted) {
        alert("Permission to access microphone is required!")
      }
    }

    getPermissions()

    return () => {
      // Clean up when component unmounts
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      if (recordingRef.current) {
        stopRecording(recordingRef.current)
      }

      if (soundRef.current) {
        unloadSound(soundRef.current)
      }
    }
  }, [])

  // Start pulsing animation for record button
  useEffect(() => {
    if (!isRecording && !recordingComplete) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start()
    } else {
      pulseAnim.setValue(1)
    }
  }, [isRecording, recordingComplete, pulseAnim])

  // Recording animation
  useEffect(() => {
    if (isRecording) {
      Animated.timing(recordingAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start()
    } else {
      Animated.timing(recordingAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }).start()
    }
  }, [isRecording, recordingAnim])

  const handleStartRecording = async () => {
    if (!permissionGranted) {
      alert("Microphone permission is required to record.")
      return
    }

    try {
      setLoading(true)
      mediumHaptic() // Medium haptic feedback when starting recording

      const recording = await startRecording()
      recordingRef.current = recording
      setIsRecording(true)
      setRecordingTime(0)
      setShowToast(true)
      setLoading(false)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 30) {
            handleStopRecording()
            return 30
          }
          return prev + 1
        })
      }, 1000)
    } catch (error) {
      console.error("Failed to start recording", error)
      alert("Failed to start recording. Please try again.")
      setLoading(false)
    }
  }

  const handleStopRecording = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (recordingRef.current) {
      try {
        setLoading(true)
        mediumHaptic() // Medium haptic feedback when stopping recording

        setIsRecording(false)
        const { sound, uri } = await stopRecording(recordingRef.current)
        soundRef.current = sound
        setRecordingUri(uri)

        // Save the recording with a custom name
        const timestamp = new Date().getTime()
        const filename = `recording_${songId}_${timestamp}.m4a`
        const savedUri = await saveRecording(uri, filename)

        if (savedUri) {
          setRecordingUri(savedUri)
        }

        // Add listener for when playback finishes
        if (sound) {
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setIsPlaying(false)
            }
          })
        }

        setRecordingComplete(true)
        setLoading(false)
        successHaptic() // Success haptic feedback when recording is complete
      } catch (error) {
        console.error("Failed to stop recording", error)
        alert("Failed to stop recording. Please try again.")
        setLoading(false)
      }
    }
  }

  const handleTogglePlayback = async () => {
    if (!soundRef.current) return

    lightHaptic() // Light haptic feedback when toggling playback

    try {
      if (isPlaying) {
        await pauseSound(soundRef.current)
        setIsPlaying(false)
      } else {
        await playSound(soundRef.current)
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("Failed to toggle playback", error)
      alert("Failed to play recording. Please try again.")
    }
  }

  const handleSendChallenge = () => {
    // In a real app, you would upload the recording to a server
    // and create a challenge with the recording URI
    navigation.navigate("ChallengeOptions", {
      recordingUri,
      songId,
      recordingDuration: recordingTime,
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Animation styles
  const pulseStyle = {
    transform: [{ scale: pulseAnim }],
  }

  const recordingAnimStyle = {
    opacity: recordingAnim,
    transform: [
      {
        scale: recordingAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {showToast && (
        <Toast message="Recording started! Hum your song." type="success" onClose={() => setShowToast(false)} />
      )}

      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.goBack()}>
          <ArrowLeft width={size(24)} height={size(24)} color="#000000" />
        </IconBubble>
        <Text style={[styles.title, { fontSize: fontSize(28) }]}>Record Your Humming</Text>
      </View>

      <Card variant="white" style={styles.songCard}>
        <View style={styles.songCardContent}>
          <Disc3 width={size(48)} height={size(48)} color={theme.accent} />
          <Text style={[styles.songTitle, { fontSize: fontSize(24) }]}>{song.title}</Text>
          <Text style={[styles.songArtist, { fontSize: fontSize(18) }]}>{song.artist}</Text>
        </View>
      </Card>

      <View style={styles.recordingContainer}>
        <Card variant="secondary" style={[styles.visualizerCard, { backgroundColor: theme.secondary }]}>
          {isRecording ? (
            <Animated.View style={[styles.recordingContent, recordingAnimStyle]}>
              <Text style={[styles.timerText, { color: theme.accent, fontSize: fontSize(32) }]}>
                {formatTime(recordingTime)}
              </Text>
              <AudioVisualizer isActive={isRecording} />
              <Text style={[styles.recordingStatus, { fontSize: fontSize(16) }]}>Recording... Hum the melody!</Text>
            </Animated.View>
          ) : recordingComplete ? (
            <View style={styles.recordingContent}>
              <Text style={[styles.timerText, { fontSize: fontSize(32) }]}>{formatTime(recordingTime)}</Text>
              <AudioVisualizer isActive={isPlaying} />
              <Text style={[styles.recordingStatus, { fontSize: fontSize(16) }]}>
                {isPlaying ? "Playing your recording..." : "Recording complete!"}
              </Text>
            </View>
          ) : (
            <View style={styles.recordingContent}>
              <IconBubble variant="primary" size="large" style={styles.headphonesIcon}>
                <Headphones width={size(32)} height={size(32)} color="#000000" />
              </IconBubble>
              <Text style={[styles.recordingStatus, { fontSize: fontSize(16) }]}>
                Tap the microphone button below to start recording your humming
              </Text>
            </View>
          )}
        </Card>

        <View style={styles.controlsContainer}>
          {!isRecording && !recordingComplete && (
            <Animated.View style={pulseStyle}>
              <IconBubble
                variant="accent"
                size="large"
                style={styles.controlButton}
                onPress={handleStartRecording}
                disabled={loading}
              >
                <Mic width={size(32)} height={size(32)} color="#ffffff" />
              </IconBubble>
            </Animated.View>
          )}

          {isRecording && (
            <IconBubble
              variant="accent"
              size="large"
              style={styles.controlButton}
              onPress={handleStopRecording}
              disabled={loading}
            >
              <Pause width={size(32)} height={size(32)} color="#ffffff" />
            </IconBubble>
          )}

          {recordingComplete && (
            <View style={styles.completedControls}>
              <IconBubble
                variant="white"
                size="large"
                style={styles.controlButton}
                onPress={handleTogglePlayback}
                disabled={loading}
              >
                {isPlaying ? (
                  <Pause width={size(32)} height={size(32)} color="#000000" />
                ) : (
                  <Play width={size(32)} height={size(32)} color="#000000" />
                )}
              </IconBubble>

              <IconBubble
                variant="accent"
                size="large"
                style={styles.controlButton}
                onPress={handleSendChallenge}
                disabled={loading}
              >
                <Send width={size(32)} height={size(32)} color="#ffffff" />
              </IconBubble>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    marginLeft: 16,
    color: "#000000",
  },
  songCard: {
    marginBottom: 24,
  },
  songCardContent: {
    alignItems: "center",
    padding: 24,
  },
  songTitle: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    marginTop: 16,
    color: "#000000",
  },
  songArtist: {
    fontFamily: "Rubik-Regular",
    color: "#000000",
  },
  recordingContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  visualizerCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "#000000",
  },
  recordingContent: {
    alignItems: "center",
  },
  timerText: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    marginBottom: 16,
    color: "#000000",
  },
  recordingStatus: {
    fontFamily: "Rubik-Regular",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 16,
    color: "#000000",
  },
  headphonesIcon: {
    marginBottom: 16,
  },
  controlsContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  controlButton: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 8,
  },
  completedControls: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
})
