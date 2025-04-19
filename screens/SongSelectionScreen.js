import { useState, useEffect } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Music, Search } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { IconBubble } from "../components/ui/IconBubble"
import { Input } from "../components/ui/Input"
import { Card } from "../components/ui/Card"
import { StatusBadge } from "../components/ui/StatusBadge"

export default function SongSelectionScreen({ navigation }) {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for songs
  const songs = [
    { id: "1", title: "Bohemian Rhapsody", artist: "Queen", difficulty: "Hard" },
    { id: "2", title: "Happy", artist: "Pharrell Williams", difficulty: "Easy" },
    { id: "3", title: "Shape of You", artist: "Ed Sheeran", difficulty: "Medium" },
    { id: "4", title: "Billie Jean", artist: "Michael Jackson", difficulty: "Medium" },
    { id: "5", title: "Sweet Child O' Mine", artist: "Guns N' Roses", difficulty: "Hard" },
    { id: "6", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", difficulty: "Medium" },
    { id: "7", title: "Twinkle Twinkle Little Star", artist: "Traditional", difficulty: "Easy" },
  ]

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "#10b981" // green
      case "Medium":
        return "#fbbf24" // yellow
      case "Hard":
        return theme.accent // red
      default:
        return theme.secondary
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.goBack()}>
          <ArrowLeft width={24} height={24} color="#000000" />
        </IconBubble>
        <Text style={styles.title}>Select a Song</Text>
      </View>

      <Input
        placeholder="Search songs..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Search width={20} height={20} color="#9ca3af" />}
        style={styles.searchInput}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.songsList}>
        {filteredSongs.map((song) => (
          <Card
            key={song.id}
            variant="white"
            style={styles.songCard}
            onPress={() => navigation.navigate("Recording", { songId: song.id })}
          >
            <View style={styles.songCardContent}>
              <IconBubble variant="primary" size="small" style={styles.musicIcon}>
                <Music width={24} height={24} color="#000000" />
              </IconBubble>
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.songArtist}>{song.artist}</Text>
              </View>
              <StatusBadge color={getDifficultyColor(song.difficulty)} textColor="#000000">
                {song.difficulty}
              </StatusBadge>
            </View>
          </Card>
        ))}
      </ScrollView>
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
  searchInput: {
    marginBottom: 16,
  },
  songsList: {
    flex: 1,
  },
  songCard: {
    marginBottom: 16,
  },
  songCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  musicIcon: {
    marginRight: 16,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  songArtist: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#666666",
  },
})
