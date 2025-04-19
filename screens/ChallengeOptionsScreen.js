"use client"

import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Send } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"
import { Avatar } from "../components/ui/Avatar"
import { Button } from "../components/ui/Button"
import { StatusBadge } from "../components/ui/StatusBadge"
import { CheckBox } from "../components/ui/CheckBox"

export default function ChallengeOptionsScreen({ navigation }) {
  const { theme } = useTheme()
  const [selectedOptions, setSelectedOptions] = useState([])

  // Mock data
  const opponent = {
    name: "Sarah",
    avatarUrl: null,
  }

  const correctSong = {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
  }

  const decoyOptions = [
    { id: "2", title: "We Will Rock You", artist: "Queen" },
    { id: "3", title: "Don't Stop Me Now", artist: "Queen" },
    { id: "4", title: "Radio Ga Ga", artist: "Queen" },
    { id: "5", title: "Another One Bites the Dust", artist: "Queen" },
  ]

  // Combine correct song with decoys and shuffle
  const allOptions = [correctSong, ...decoyOptions]
    .sort(() => Math.random() - 0.5)
    .map((song) => ({
      ...song,
      isCorrect: song.id === correctSong.id,
    }))

  const toggleOption = (id) => {
    // For this UI, we'll allow selecting multiple options to show the UI state
    // In a real implementation, you might want to limit to one selection
    setSelectedOptions((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.goBack()}>
          <ArrowLeft width={24} height={24} color="#000000" />
        </IconBubble>
        <Text style={styles.title}>Challenge Options</Text>
      </View>

      <Card variant="white" style={styles.opponentCard}>
        <View style={styles.opponentCardContent}>
          <Avatar name={opponent.name} size="medium" style={styles.avatar} />
          <View>
            <Text style={styles.opponentTitle}>Challenging {opponent.name}</Text>
            <Text style={styles.opponentSubtitle}>They'll need to guess your humming</Text>
          </View>
        </View>
      </Card>

      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>Select answer options:</Text>
        <Text style={styles.sectionDescription}>
          Choose which songs will appear as options for your opponent to guess from. The correct answer is already
          included.
        </Text>

        <View style={styles.optionsList}>
          {allOptions.map((option) => (
            <View
              key={option.id}
              style={[
                styles.optionItem,
                {
                  backgroundColor: option.isCorrect ? "#10b981" : "#ffffff",
                },
              ]}
            >
              <View style={styles.optionContent}>
                <CheckBox
                  checked={selectedOptions.includes(option.id) || option.isCorrect}
                  onCheckedChange={() => toggleOption(option.id)}
                  disabled={option.isCorrect}
                />
                <View style={styles.optionInfo}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionArtist}>{option.artist}</Text>
                </View>
                {option.isCorrect && <StatusBadge color="#000000">Correct</StatusBadge>}
              </View>
            </View>
          ))}
        </View>
      </View>

      <Button
        variant="accent"
        style={styles.sendButton}
        onPress={() => navigation.navigate("Home", { challengeSent: true })}
      >
        <Send width={24} height={24} color="#ffffff" style={{ marginRight: 8 }} />
        <Text style={styles.sendButtonText}>Send Challenge</Text>
      </Button>
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
    fontSize: 28,
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
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  opponentSubtitle: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#666666",
  },
  optionsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000000",
  },
  sectionDescription: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    marginBottom: 16,
    color: "#000000",
  },
  optionsList: {
    flex: 1,
  },
  optionItem: {
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#000000",
    padding: 16,
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  optionArtist: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    marginTop: 4,
    color: "#666666",
  },
  sendButton: {
    marginTop: 16,
  },
  sendButtonText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
})
