import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Plus, Search, UserPlus } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"
import { Avatar } from "../components/ui/Avatar"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { Feather } from "@expo/vector-icons"

export default function FriendsScreen({ navigation }) {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for friends
  const friends = [
    { id: "1", name: "Sarah", avatarUrl: null, status: "online" },
    { id: "2", name: "Mike", avatarUrl: null, status: "offline" },
    { id: "3", name: "Alex", avatarUrl: null, status: "online" },
    { id: "4", name: "Jamie", avatarUrl: null, status: "offline" },
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
        <Text style={styles.title}>Friends</Text>
      </View>

      <Input
        placeholder="Search friends..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Search width={20} height={20} color="#9ca3af" />}
        style={styles.searchInput}
      />

      <Button variant="primary" style={styles.addFriendButton} onPress={() => navigation.navigate("AddFriend")}>
        <UserPlus width={24} height={24} color="#000000" style={{ marginRight: 8 }} />
        <Text style={styles.addFriendText}>Add New Friend</Text>
      </Button>

      <View style={styles.friendsSection}>
        <Text style={styles.sectionTitle}>Your Friends ({filteredFriends.length})</Text>

        <ScrollView style={styles.friendsList} showsVerticalScrollIndicator={false}>
          {filteredFriends.map((friend) => (
            <Card key={friend.id} variant="white" style={styles.friendCard}>
              <View style={styles.friendCardContent}>
                <View style={styles.avatarContainer}>
                  <Avatar name={friend.name} size="medium" style={styles.avatar} />
                  <View
                    style={[
                      styles.statusIndicator,
                      {
                        backgroundColor: friend.status === "online" ? "#10b981" : "#d1d5db",
                      },
                    ]}
                  />
                </View>
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendStatus}>{friend.status}</Text>
                </View>
                <View style={styles.friendActions}>
                  <Button
                    variant="accent"
                    style={styles.challengeButton}
                    onPress={() => navigation.navigate("Play", { screen: "NewGameMain", params: { friend: friend.id } })}
                  >
                    <Plus width={16} height={16} color="#ffffff" style={{ marginRight: 4 }} />
                    Challenge
                  </Button>
                </View>
              </View>
            </Card>
          ))}
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
  addFriendButton: {
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addFriendText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  friendsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000000",
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
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    marginRight: 16,
  },
  statusIndicator: {
    position: "absolute",
    bottom: 0,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#000000",
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
  friendStatus: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    textTransform: "capitalize",
    color: "#666666",
  },
  friendActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  challengeButton: {
    padding: 8,
  },
})
