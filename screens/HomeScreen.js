import React, { useState, useEffect } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Music, Plus, Trophy, Users, Calendar, Gift, ArrowLeft } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { Toast } from "../components/Toast"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { IconBubble } from "../components/ui/IconBubble"
import { StatusBadge } from "../components/ui/StatusBadge"
import { Avatar } from "../components/ui/Avatar"

export default function HomeScreen({ navigation, route }) {
  const { theme } = useTheme()
  const [showToast, setShowToast] = useState(false)

  // Check if coming from a challenge sent page
  useEffect(() => {
    if (route.params?.challengeSent) {
      setShowToast(true)
    }
  }, [route.params])

  // Mock data for active games
  const activeGames = [
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
  ]

  const renderGameCard = (game) => {
    return (
      <Card
        key={game.id}
        variant={game.status === "your-turn" ? "primary" : "white"}
        style={styles.gameCard}
        onPress={() => {
          navigation.navigate("Game", { id: game.id })
        }}
      >
        <View style={styles.gameCardContent}>
          <Avatar name={game.opponent} size="medium" style={styles.avatar} />
          <View style={styles.gameInfo}>
            <Text style={styles.opponentName}>{game.opponent}</Text>
            <View style={styles.lastPlayedContainer}>
              <Music width={16} height={16} color="#666666" />
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
            {/* --- Temporarily comment out this specific IconBubble --- */}
            {/* {game.status === "your-turn" && (
              <IconBubble variant="accent" size="small" style={styles.turnIcon}>
                <Music width={20} height={20} color="#ffffff" />
              </IconBubble>
            )} */}
          </View>
        </View>
      </Card>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {showToast && <Toast message="Challenge sent successfully!" type="success" onClose={() => setShowToast(false)} />}

      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.goBack()}>
           <Text>←</Text>
        </IconBubble>
        
        <Text style={styles.title}>Humming Game</Text>
        
        <View style={styles.headerIcons}>
          {/* Temporarily comment out right-side header icons */}
          {/*
          <IconBubble variant="secondary" size="small" onPress={() => navigation.navigate("Friends")}>
            <Users width={24} height={24} color="#000000" />
          </IconBubble>
          <IconBubble
            variant="accent"
            size="small"
            style={styles.profileIcon}
            onPress={() => navigation.navigate("Profile", { screen: "ProfileMain" })}
          >
            <Trophy width={24} height={24} color="#ffffff" />
          </IconBubble>
          */}
        </View>
      </View>

      <Button
        variant="accent"
        size="large"
        style={styles.newChallengeButton}
        onPress={() => navigation.navigate("Play", { screen: "NewGameMain"})}
      >
        <Plus width={24} height={24} color="#ffffff" style={{ marginRight: 8 }} />
        <Text style={styles.newChallengeText}>New Challenge</Text>
      </Button>

      {/* Daily Challenge Card */}
      <Card variant="primary" style={styles.dailyCard} onPress={() => navigation.navigate("DailyChallenge")}>
        <View style={styles.dailyCardContent}>
          {/* --- Temporarily comment out daily challenge IconBubble --- */}
          {/* 
          <IconBubble variant="white" size="small">
            <Calendar width={24} height={24} color="#000000" />
          </IconBubble>
          */}
          <View style={styles.dailyInfo}>
            <Text style={styles.dailyTitle}>Daily Challenge</Text>
            <Text style={styles.dailySubtitle}>Complete for bonus points!</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Gift width={20} height={20} color="#000000" />
            <Text style={styles.pointsText}>+50</Text>
          </View>
        </View>
      </Card>

      <View style={styles.gamesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Games</Text>
          <Text style={styles.viewAllLink} onPress={() => navigation.navigate("GamesHistory")}>
            View All
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeGames.length > 0 ? (
            activeGames.map((game) => (
              <React.Fragment key={game.id}>
                {renderGameCard(game)}
              </React.Fragment>
            ))
          ) : (
            <View style={styles.emptyState}>
              {/* --- Temporarily comment out empty state IconBubble --- */}
              {/* 
              <IconBubble variant="secondary" size="large" style={styles.emptyIcon}>
                <Music width={40} height={40} color="#000000" />
              </IconBubble>
              */}
              <Text style={styles.emptyText}>No active games yet</Text>
              <Button variant="primary" onPress={() => navigation.navigate("Play", { screen: "NewGameMain"})}>
                Start a Game
              </Button>
            </View>
          )}
        </ScrollView>
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
    textAlign: 'center',
    flex: 1,
  },
  headerIcons: {
    flexDirection: "row",
  },
  profileIcon: {
    marginLeft: 8,
  },
  newChallengeButton: {
    marginBottom: 24,
  },
  newChallengeText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  dailyCard: {
    marginBottom: 24,
  },
  dailyCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  dailyInfo: {
    flex: 1,
    marginLeft: 16,
  },
  dailyTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  dailySubtitle: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#000000",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 4,
    color: "#000000",
  },
  gamesSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
  },
  viewAllLink: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
    color: "#000000",
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
  turnIcon: {
    marginTop: 8,
    borderWidth: 2,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
    color: "#000000",
  },
})
