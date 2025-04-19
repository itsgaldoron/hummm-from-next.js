import React from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft /*, Medal, Trophy */ } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"
import { Avatar } from "../components/ui/Avatar"

export default function LeaderboardScreen({ navigation }) {
  const { theme } = useTheme()

  // Mock leaderboard data
  const leaderboard = [
    { id: "1", name: "Sarah", score: 1250, avatarUrl: null, rank: 1 },
    { id: "2", name: "Mike", score: 980, avatarUrl: null, rank: 2 },
    { id: "3", name: "Alex", score: 840, avatarUrl: null, rank: 3 },
    { id: "4", name: "Jamie", score: 720, avatarUrl: null, rank: 4 },
    { id: "5", name: "Taylor", score: 650, avatarUrl: null, rank: 5 },
    { id: "6", name: "Jordan", score: 590, avatarUrl: null, rank: 6 },
    { id: "7", name: "Casey", score: 520, avatarUrl: null, rank: 7 },
    { id: "8", name: "Riley", score: 480, avatarUrl: null, rank: 8 },
  ]

  // Current user's rank
  const currentUser = {
    id: "9",
    name: "Alex Johnson",
    score: 420,
    avatarUrl: null,
    rank: 12,
  }

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "#fbbf24" // gold
      case 2:
        return "#d1d5db" // silver
      case 3:
        return "#b45309" // bronze
      default:
        return "#ffffff" // white
    }
  }

  const renderPlayerCard = (player, isCurrentUser = false) => {
    return (
      <Card key={player.id} variant={isCurrentUser ? "primary" : "white"} style={styles.playerCard}>
        <View style={styles.playerCardContent}>
          <View
            style={[
              styles.rankBubble,
              {
                backgroundColor: getRankStyle(player.rank),
              },
            ]}
          >
            {/* Replace Medal with Text */}
            {player.rank <= 3 ? (
               <Text>M</Text> // Placeholder for Medal
            ) : (
               <Text style={styles.rankText}>{player.rank}</Text>
            )}
          </View>
          <Avatar name={player.name} size="medium" style={styles.avatar} />
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{isCurrentUser ? "You" : player.name}</Text>
            <Text style={styles.playerScore}>{player.score} points</Text>
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
        <Text style={styles.title}>Leaderboard</Text>
      </View>

      <Card variant="white" style={styles.trophyCard}>
        <View style={styles.trophyCardContent}>
          {/* Replace Trophy with Text */}
          <Text style={{fontSize: 40}}>🏆</Text> 
          <Text style={styles.trophyTitle}>Top Players</Text>
          <Text style={styles.trophySubtitle}>Compete to be the best hummer!</Text>
        </View>
      </Card>

      <ScrollView style={styles.leaderboardList} showsVerticalScrollIndicator={false}>
        {/* Wrap map output in Fragment */}
        {leaderboard.map((player) => (
            <React.Fragment key={player.id}>
                 {renderPlayerCard(player)}
            </React.Fragment>
        ))}
      </ScrollView>

      {/* Wrap current user render in Fragment (though less likely needed) */}
      <View style={styles.currentUserContainer}>
          <React.Fragment key={currentUser.id}>
              {renderPlayerCard(currentUser, true)}
          </React.Fragment>
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
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 16,
    color: "#000000",
  },
  trophyCard: {
    marginBottom: 24,
  },
  trophyCardContent: {
    alignItems: "center",
    padding: 24,
  },
  trophyTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
    color: "#000000",
  },
  trophySubtitle: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#000000",
  },
  leaderboardList: {
    flex: 1,
  },
  playerCard: {
    marginBottom: 16,
  },
  playerCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  rankBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rankText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  avatar: {
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  playerScore: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#666666",
  },
  currentUserContainer: {
    marginTop: 8,
  },
})
