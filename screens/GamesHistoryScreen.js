import { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Clock, Filter } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { IconBubble } from "../components/ui/IconBubble"
import { Button } from "../components/ui/Button"
import { Avatar } from "../components/ui/Avatar"
import { StatusBadge } from "../components/ui/StatusBadge"
import { Card } from "../components/ui/Card"

export default function GamesHistoryScreen({ navigation }) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("active")

  // Mock data for games
  const games = [
    {
      id: "1",
      opponent: "Sarah",
      status: "their-turn",
      lastPlayed: "2 hours ago",
      avatarUrl: null,
    },
    {
      id: "2",
      opponent: "Mike",
      status: "your-turn",
      lastPlayed: "5 hours ago",
      avatarUrl: null,
    },
    {
      id: "3",
      opponent: "Alex",
      status: "your-turn",
      lastPlayed: "1 day ago",
      avatarUrl: null,
    },
    {
      id: "4",
      opponent: "Jamie",
      status: "completed",
      lastPlayed: "2 days ago",
      avatarUrl: null,
    },
    {
      id: "5",
      opponent: "Taylor",
      status: "completed",
      lastPlayed: "3 days ago",
      avatarUrl: null,
    },
  ]

  const filteredGames = games.filter((game) =>
    activeTab === "active" ? game.status === "your-turn" || game.status === "their-turn" : game.status === "completed",
  )

  const renderGameCard = (game) => {
    return (
      <Card
        key={game.id}
        variant={game.status === "your-turn" ? "primary" : "white"}
        style={styles.gameCard}
        onPress={() => navigation.navigate("Game", { id: game.id })}
      >
        <View style={styles.gameCardContent}>
          <Avatar name={game.opponent} size="medium" style={styles.avatar} />
          <View style={styles.gameInfo}>
            <Text style={styles.opponentName}>{game.opponent}</Text>
            <View style={styles.lastPlayedContainer}>
              <Clock width={16} height={16} color="#666666" />
              <Text style={styles.lastPlayed}>{game.lastPlayed}</Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
            {game.status === "your-turn" ? (
              <StatusBadge color="#000000">Your turn</StatusBadge>
            ) : game.status === "their-turn" ? (
              <StatusBadge color={theme.secondary}>Their turn</StatusBadge>
            ) : (
              <StatusBadge color="#10b981" textColor="#ffffff">
                Completed
              </StatusBadge>
            )}
          </View>
        </View>
      </Card>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.goBack()}>
          <ArrowLeft width={24} height={24} color="#000000" />
        </IconBubble>
        <Text style={styles.title}>Your Games</Text>
        <IconBubble variant="white" size="small" onPress={() => {}}>
          <Filter width={24} height={24} color="#000000" />
        </IconBubble>
      </View>

      <View style={styles.tabs}>
        <Button
          variant={activeTab === "active" ? "accent" : "white"}
          style={styles.tabButton}
          onPress={() => setActiveTab("active")}
        >
          Active
        </Button>
        <Button
          variant={activeTab === "completed" ? "accent" : "white"}
          style={styles.tabButton}
          onPress={() => setActiveTab("completed")}
        >
          Completed
        </Button>
      </View>

      <ScrollView style={styles.gamesList} showsVerticalScrollIndicator={false}>
        {filteredGames.map(renderGameCard)}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Clock width={16} height={16} color="#666666" />
          <Text style={styles.footerText}>Showing games from the last 30 days</Text>
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
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    fontFamily: "Fredoka-Regular",
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  gamesList: {
    flex: 1,
  },
  gameCard: {
    marginBottom: 16,
  },
  gameCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
  },
  opponentName: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  lastPlayedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  lastPlayed: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    marginLeft: 4,
    color: "#666666",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    marginLeft: 8,
    color: "#666666",
  },
})
