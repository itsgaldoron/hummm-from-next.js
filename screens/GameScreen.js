import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Clock, Music } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { AudioPlayer } from "../components/AudioPlayer"
import { Confetti } from "../components/Confetti"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Avatar } from "../components/ui/Avatar"
import { lightHaptic, successHaptic, errorHaptic } from "../utils/haptics"
import { useResponsiveSize } from "../hooks/useResponsiveSize"

export default function GameScreen({ navigation, route }) {
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

  // Get game ID from route params
  const gameId = route.params?.id || "1"

  // Mock data
  const game = {
    id: gameId,
    opponent: {
      name: "Sarah",
      avatarUrl: null,
    },
    status: "your-turn", // Can be "your-turn", "their-turn", or "completed"
    songOptions: [
      { id: "1", title: "Bohemian Rhapsody", artist: "Queen" },
      { id: "2", title: "We Will Rock You", artist: "Queen" },
      { id: "3", title: "Don't Stop Me Now", artist: "Queen" },
      { id: "4", title: "Radio Ga Ga", artist: "Queen" },
    ],
    correctAnswerId: "1", // For demo purposes
    streakCount: 3, // Current streak of correct answers
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

    if (selectedAnswer === game.correctAnswerId) {
      successHaptic() // Success haptic feedback for correct answer
      setShowConfetti(true)
    } else {
      errorHaptic() // Error haptic feedback for incorrect answer
    }
  }

  const isCorrect = selectedAnswer === game.correctAnswerId

  // If it's not the user's turn, show a waiting screen
  if (game.status === "their-turn") {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <BackgroundShapes />
        <BackgroundMusicElements />

        <View style={styles.header}>
          <IconBubble variant="white" size="small" onPress={() => navigation.navigate("Home")}>
            <ArrowLeft width={size(24)} height={size(24)} color="#000000" />
          </IconBubble>
          <Text style={[styles.title, { fontSize: fontSize(28) }]}>Game Status</Text>
        </View>

        <Card variant="white" style={styles.opponentCard}>
          <View style={styles.opponentCardContent}>
            <Avatar name={game.opponent.name} size="medium" style={styles.avatar} />
            <View>
              <Text style={[styles.opponentTitle, { fontSize: fontSize(18) }]}>{game.opponent.name}'s Turn</Text>
              <Text style={[styles.opponentSubtitle, { fontSize: fontSize(14) }]}>
                Waiting for them to guess your humming
              </Text>
            </View>
          </View>
        </Card>

        <Card variant="secondary" style={styles.waitingCard}>
          <View style={styles.waitingContent}>
            <IconBubble variant="white" size="large" style={styles.waitingIcon}>
              <Clock width={size(32)} height={size(32)} color="#000000" />
            </IconBubble>
            <Text style={[styles.waitingTitle, { fontSize: fontSize(24) }]}>Waiting for Response</Text>
            <Text style={[styles.waitingDescription, { fontSize: fontSize(16) }]}>
              {game.opponent.name} is currently trying to guess the song you hummed. You'll be notified when they
              respond!
            </Text>
          </View>
        </Card>

        <Button variant="primary" style={styles.backButton} onPress={() => navigation.navigate("Home")}>
          <ArrowLeft width={size(20)} height={size(20)} color="#000000" style={{ marginRight: 8 }} />
          <Text style={[styles.backButtonText, { fontSize: fontSize(16) }]}>Back to Home</Text>
        </Button>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <BackgroundShapes />
      <BackgroundMusicElements />
      {showConfetti && <Confetti />}

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.navigate("Home")}>
          <ArrowLeft width={size(24)} height={size(24)} color="#000000" />
        </IconBubble>
        <Text style={[styles.title, { fontSize: fontSize(28) }]}>Guess the Song</Text>
      </View>

      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Card variant="white" style={styles.opponentCard}>
          <View style={styles.opponentCardContent}>
            <Avatar name={game.opponent.name} size="medium" style={styles.avatar} />
            <View>
              <Text style={[styles.opponentTitle, { fontSize: fontSize(18) }]}>{game.opponent.name}'s Challenge</Text>
              <Text style={[styles.opponentSubtitle, { fontSize: fontSize(14) }]}>
                Listen and guess what song they're humming
              </Text>
            </View>
          </View>
        </Card>
      </Animated.View>

      <View style={styles.gameContainer}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <Card variant="secondary" style={styles.audioPlayerCard}>
            <AudioPlayer uri={game.recordingUri} style={styles.audioPlayer} />
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
          <View style={styles.optionsHeader}>
            <Text style={[styles.optionsTitle, { fontSize: fontSize(22) }]}>What song is this?</Text>
            {!hasSubmitted && (
              <View style={styles.streakContainer}>
                <Text style={[styles.streakText, { color: theme.accent, fontSize: fontSize(14) }]}>
                  Streak: {game.streakCount}
                </Text>
                <View style={[styles.streakBadge, { backgroundColor: theme.accent }]}>
                  <Text style={styles.streakEmoji}>🔥</Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.songGrid}>
            {game.songOptions.map((song) => {
              const isSelected = selectedAnswer === song.id
              const isCorrectAnswer = song.id === game.correctAnswerId
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
                <View style={styles.streakResultContainer}>
                  <Text style={[styles.streakResultText, { fontSize: fontSize(16) }]}>Current streak: </Text>
                  <Text style={[styles.streakResultValue, { color: theme.accent, fontSize: fontSize(20) }]}>
                    {game.streakCount + 1} 🔥
                  </Text>
                </View>
                <View style={styles.resultsButtons}>
                  <Button variant="outline" style={styles.resultButton} onPress={() => navigation.navigate("Home", { screen: "HomeMain" })}>
                    Back Home
                  </Button>
                  <Button variant="accent" style={styles.resultButton} onPress={() => navigation.navigate("Play", { screen: "NewGameMain" })}>
                    Play Again
                  </Button>
                </View>
              </>
            ) : (
              <>
                <Text style={[styles.resultText, { color: theme.accent, fontSize: fontSize(28) }]}>Incorrect</Text>
                <Text style={[styles.resultDescription, { fontSize: fontSize(16) }]}>
                  The correct answer was "{game.songOptions.find((s) => s.id === game.correctAnswerId)?.title}".
                </Text>
                <Text style={[styles.streakResetText, { fontSize: fontSize(16) }]}>Your streak has been reset!</Text>
                <View style={styles.resultsButtons}>
                  <Button variant="outline" style={styles.resultButton} onPress={() => navigation.navigate("Home", { screen: "HomeMain" })}>
                    Back Home
                  </Button>
                  <Button variant="accent" style={styles.resultButton} onPress={() => navigation.navigate("Play", { screen: "NewGameMain" })}>
                    Rematch
                  </Button>
                </View>
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
  opponentCard: {
    marginBottom: 24,
  },
  opponentCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    marginRight: 16,
  },
  opponentTitle: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    color: "#000000",
  },
  opponentSubtitle: {
    fontFamily: "Rubik-Regular",
    color: "#666666",
  },
  waitingCard: {
    flex: 1,
    marginBottom: 24,
  },
  waitingContent: {
    alignItems: "center",
    padding: 24,
  },
  waitingIcon: {
    marginBottom: 16,
  },
  waitingTitle: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    marginBottom: 8,
    color: "#000000",
  },
  waitingDescription: {
    fontFamily: "Rubik-Regular",
    textAlign: "center",
    color: "#000000",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    color: "#000000",
  },
  gameContainer: {
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
  optionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  optionsTitle: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    color: "#000000",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "700",
    marginRight: 4,
  },
  streakBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  streakEmoji: {
    fontSize: 10,
    color: "#ffffff",
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
  streakResultContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  streakResultText: {
    fontFamily: "Rubik-Regular",
    color: "#000000",
  },
  streakResultValue: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
  },
  resultDescription: {
    fontFamily: "Rubik-Regular",
    textAlign: "center",
    marginBottom: 8,
    color: "#000000",
  },
  streakResetText: {
    fontFamily: "Rubik-Regular",
    marginBottom: 16,
    color: "#000000",
  },
  resultButton: {
    paddingHorizontal: 24,
  },
  submitButton: {
    marginTop: 16,
  },
  resultsButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
})
