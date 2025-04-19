import { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Search, User } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { IconBubble } from "../components/ui/IconBubble"
import { Input } from "../components/ui/Input"
import { Avatar } from "../components/ui/Avatar"

export default function NewGameScreen({ navigation }) {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("friends")

  // Mock data for friends
  const friends = [
    { id: "1", name: "Sarah", avatarUrl: null, lastPlayed: "2 days ago" },
    { id: "2", name: "Mike", avatarUrl: null, lastPlayed: "1 week ago" },
    { id: "3", name: "Alex", avatarUrl: null, lastPlayed: "3 days ago" },
    { id: "4", name: "Jamie", avatarUrl: null, lastPlayed: "Just now" },
  ]

  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.goBack()}>
          <ArrowLeft width={24} height={24} color="#000000" />
        </IconBubble>
        <Text style={styles.title}>New Challenge</Text>
      </View>

      <View style={styles.tabs}>
        <Button
          variant={activeTab === "friends" ? "accent" : "white"}
          style={styles.tabButton}
          onPress={() => setActiveTab("friends")}
        >
          Friends
        </Button>
        <Button
          variant={activeTab === "self" ? "accent" : "white"}
          style={styles.tabButton}
          onPress={() => setActiveTab("self")}
        >
          Self Challenge
        </Button>
      </View>

      {activeTab === "friends" ? (
        <View style={styles.friendsContainer}>
          <Input
            placeholder="Search friends..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search width={20} height={20} color="#9ca3af" />}
            style={styles.searchInput}
          />

          <ScrollView showsVerticalScrollIndicator={false} style={styles.friendsList}>
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <Card
                  key={friend.id}
                  variant="white"
                  style={styles.friendCard}
                  onPress={() => navigation.navigate("SongSelection", { opponent: friend.id })}
                >
                  <View style={styles.friendCardContent}>
                    <Avatar name={friend.name} size="medium" style={styles.avatar} />
                    <View style={styles.friendInfo}>
                      <Text style={styles.friendName}>{friend.name}</Text>
                      <Text style={styles.lastPlayed}>Last played: {friend.lastPlayed}</Text>
                    </View>
                  </View>
                </Card>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No friends found</Text>
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <Card variant="white" style={styles.selfChallengeCard}>
          <View style={styles.selfChallengeContent}>
            <IconBubble variant="secondary" size="large" style={styles.selfIcon}>
              <User width={32} height={32} color="#000000" />
            </IconBubble>
            <Text style={styles.selfTitle}>Self Challenge Mode</Text>
            <Text style={styles.selfDescription}>Practice your humming skills and test yourself</Text>
            <Button
              variant="accent"
              style={styles.startButton}
              onPress={() => navigation.navigate("SongSelection", { mode: "self" })}
            >
              Start Self Challenge
            </Button>
          </View>
        </Card>
      )}
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
  tabs: {
    flexDirection: "row",
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  friendsContainer: {
    flex: 1,
  },
  searchInput: {
    marginBottom: 16,
  },
  friendsList: {
    flex: 1,
  },
  friendCard: {
    marginBottom: 16,
  },
  friendCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    marginRight: 16,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  lastPlayed: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#666666",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
  },
  selfChallengeCard: {
    flex: 1,
  },
  selfChallengeContent: {
    alignItems: "center",
    padding: 24,
  },
  selfIcon: {
    marginBottom: 16,
  },
  selfTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000000",
  },
  selfDescription: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#000000",
  },
  startButton: {
    width: "100%",
  },
})
