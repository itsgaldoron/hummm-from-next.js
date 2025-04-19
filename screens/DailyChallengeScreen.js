import React from "react"
import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Calendar, Gift, Music } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { AudioPlayer } from "../components/AudioPlayer"
import { Confetti } from "../components/Confetti"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { lightHaptic, successHaptic, errorHaptic } from "../utils/haptics"
import { useResponsiveSize } from "../hooks/useResponsiveSize"

export default function DailyChallengeScreen({ navigation }) {
  const { theme } = useTheme()
  const { size, fontSize } = useResponsiveSize()
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [loading, setLoading] = useState(true)

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const optionsAnim = useRef(new Animated.Value(0)).current
  const resultAnim = useRef(new Animated.Value(0)).current

  // Mock data
  const challenge = {
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    songOptions: [
      { id: "1", title: "Billie Jean", artist: "Michael Jackson" },
      { id: "2", title: "Beat It", artist: "Michael Jackson" },
      { id: "3", title: "Thriller", artist: "Michael Jackson" },
      { id: "4", title: "Smooth Criminal", artist: "Michael Jackson" },
    ],
    correctAnswerId: "1", // For demo purposes
    reward: 50, // Points for completing the challenge
    recordingUri: require("../assets/demo-humming.mp3"), // In a real app, this would be the URI to the recording
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false)

      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(optionsAnim, {
          toValue: 1,
          duration: 800,
          delay: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }, 500)
  }, [fadeAnim, scaleAnim, optionsAnim])

  const handleSelectAnswer = (id) => {
    lightHaptic() // Light haptic feedback when selecting an answer
    setSelectedAnswer(id)
  }

  const handleSubmit = () => {
    // Animate options out and results in
    Animated.sequence([
      Animated.timing(optionsAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(resultAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start()

    setHasSubmitted(true)

    if (selectedAnswer === challenge.correctAnswerId) {
      successHaptic() // Success haptic feedback for correct answer
      setShowConfetti(true)
    } else {
      errorHaptic() // Error haptic feedback for incorrect answer
    }
  }

  const isCorrect = selectedAnswer === challenge.correctAnswerId

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <BackgroundShapes />
      <BackgroundMusicElements />
      {showConfetti && <Confetti />}

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.navigate("Home")}>
          <ArrowLeft width={size(24)} height={size(24)} color="#000000" />
        </IconBubble>
        <Text style={[styles.title, { fontSize: fontSize(28) }]}>Daily Challenge</Text>
      </View>

      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Card variant="primary" style={styles.dateCard}>
          <View style={styles.dateCardContent}>
            <IconBubble variant="white" size="small" style={styles.calendarIcon}>
              <Calendar width={size(24)} height={size(24)} color="#000000" />
            </IconBubble>
            <View>
              <Text style={[styles.dateText, { fontSize: fontSize(18) }]}>{challenge.date}</Text>
              <Text style={[styles.rewardText, { fontSize: fontSize(14) }]}>
                Complete for {challenge.reward} bonus points!
              </Text>
            </View>
          </View>
        </Card>
      </Animated.View>

      <View style={styles.challengeContainer}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <Card variant="secondary" style={styles.audioPlayerCard}>
            <AudioPlayer uri={challenge.recordingUri} style={styles.audioPlayer} />
          </Card>
        </Animated.View>

        <Animated.View
          style={[
            styles.optionsContainer,
            {
              opacity: optionsAnim,
              transform: [
                {
                  translateY: optionsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={[styles.optionsTitle, { fontSize: fontSize(22) }]}>What song is this?</Text>

          <View style={styles.songGrid}>
            {challenge.songOptions.map((song) => {
              const isSelected = selectedAnswer === song.id
              const isCorrectAnswer = song.id === challenge.correctAnswerId
              const isWrongAnswer = hasSubmitted && isSelected && !isCorrectAnswer

              let backgroundColor = "#ffffff"
              if (hasSubmitted && isCorrectAnswer) {
                backgroundColor = "#10b981" // green
              } else if (isWrongAnswer) {
                backgroundColor = theme.accent
              } else if (isSelected) {
                backgroundColor = theme.primary
              }

              return (
                <TouchableOpacity
                  key={song.id}
                  style={[
                    styles.songOption,
                    {
                      backgroundColor,
                    },
                  ]}
                  onPress={() => !hasSubmitted && handleSelectAnswer(song.id)}
                  disabled={hasSubmitted}
                >
                  <View style={styles.songOptionContent}>
                    <IconBubble
                      variant={isSelected ? "accent" : "secondary"}
                      size="small"
                      style={styles.songOptionIcon}
                    >
                      <Music width={size(20)} height={size(20)} color={isSelected ? "#ffffff" : "#000000"} />
                    </IconBubble>
                    <Text style={[styles.songOptionTitle, { fontSize: fontSize(14) }]}>{song.title}</Text>
                    <Text style={[styles.songOptionArtist, { fontSize: fontSize(12) }]}>{song.artist}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>

          {!hasSubmitted && (
            <Button
              variant="accent"
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={!selectedAnswer || loading}
            >
              Submit Answer
            </Button>
          )}
        </Animated.View>

        {hasSubmitted && (
          <Animated.View
            style={[
              styles.resultContainer,
              {
                opacity: resultAnim,
                transform: [
                  {
                    translateY: resultAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {isCorrect ? (
              <>
                <Text style={[styles.resultText, { color: "#10b981", fontSize: fontSize(28) }]}>Correct!</Text>
                <View style={styles.rewardContainer}>
                  <Gift width={size(24)} height={size(24)} color={theme.accent} />
                  <Text style={[styles.rewardValue, { color: theme.accent, fontSize: fontSize(20) }]}>
                    +{challenge.reward} points
                  </Text>
                </View>
                <Text style={[styles.resultDescription, { fontSize: fontSize(16) }]}>
                  Come back tomorrow for a new challenge!
                </Text>
                <Button variant="accent" style={styles.resultButton} onPress={() => navigation.navigate("Home")}>
                  Back to Home
                </Button>
              </>
            ) : (
              <>
                <Text style={[styles.resultText, { color: theme.accent, fontSize: fontSize(28) }]}>Incorrect</Text>
                <Text style={[styles.resultDescription, { fontSize: fontSize(16) }]}>
                  The correct answer was "{challenge.songOptions.find((s) => s.id === challenge.correctAnswerId)?.title}
                  ".
                </Text>
                <Text style={[styles.resultDescription, { fontSize: fontSize(16) }]}>Better luck tomorrow!</Text>
                <Button variant="accent" style={styles.resultButton} onPress={() => navigation.navigate("Home")}>
                  Back to Home
                </Button>
              </>
            )}
          </Animated.View>
        )}
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
  dateCard: {
    marginBottom: 24,
  },
  dateCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  calendarIcon: {
    marginRight: 16,
  },
  dateText: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    color: "#000000",
  },
  rewardText: {
    fontFamily: "Rubik-Regular",
    color: "#000000",
  },
  challengeContainer: {
    flex: 1,
  },
  audioPlayerCard: {
    padding: 16,
    marginBottom: 24,
  },
  audioPlayer: {
    marginVertical: 8,
  },
  optionsContainer: {
    flex: 1,
  },
  optionsTitle: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    marginBottom: 16,
    color: "#000000",
  },
  songGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  songOption: {
    width: "48%",
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#000000",
    padding: 16,
    marginBottom: 12,
  },
  songOptionContent: {
    alignItems: "center",
  },
  songOptionIcon: {
    marginBottom: 8,
  },
  songOptionTitle: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    textAlign: "center",
    color: "#000000",
  },
  songOptionArtist: {
    fontFamily: "Rubik-Regular",
    textAlign: "center",
    color: "#666666",
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  resultText: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    marginBottom: 8,
  },
  rewardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rewardValue: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    marginLeft: 8,
  },
  resultDescription: {
    fontFamily: "Rubik-Regular",
    textAlign: "center",
    marginBottom: 16,
    color: "#000000",
  },
  resultButton: {
    paddingHorizontal: 24,
  },
  submitButton: {
    marginTop: 16,
  },
})
