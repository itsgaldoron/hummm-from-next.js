import { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Search, UserPlus } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { Toast } from "../components/Toast"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"
import { Avatar } from "../components/ui/Avatar"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"

export default function AddFriendScreen({ navigation }) {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [usernameInput, setUsernameInput] = useState("")

  // Mock data for suggested friends
  const suggestedFriends = [
    { id: "5", name: "Taylor", username: "taylor_music", avatarUrl: null },
    { id: "6", name: "Jordan", username: "jordan123", avatarUrl: null },
    { id: "7", name: "Casey", username: "casey_beats", avatarUrl: null },
  ]

  const filteredFriends = suggestedFriends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddFriend = () => {
    setShowToast(true)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {showToast && <Toast message="Friend request sent!" type="success" onClose={() => setShowToast(false)} />}

      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.goBack()}>
          <ArrowLeft width={24} height={24} color="#000000" />
        </IconBubble>
        <Text style={styles.title}>Add Friends</Text>
      </View>

      <Input
        placeholder="Search by name or username..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Search width={20} height={20} color="#9ca3af" />}
        style={styles.searchInput}
      />

      <Card variant="white" style={styles.usernameCard}>
        <View style={styles.usernameCardContent}>
          <Text style={styles.usernameTitle}>Add by Username</Text>
          <View style={styles.usernameInputContainer}>
            <Input
              placeholder="Enter username..."
              value={usernameInput}
              onChangeText={setUsernameInput}
              style={styles.usernameInput}
            />
            <IconBubble variant="accent" size="small" onPress={handleAddFriend}>
              <UserPlus width={20} height={20} color="#ffffff" />
            </IconBubble>
          </View>
        </View>
      </Card>

      <View style={styles.suggestedSection}>
        <Text style={styles.sectionTitle}>Suggested Friends</Text>

        <ScrollView style={styles.suggestedList} showsVerticalScrollIndicator={false}>
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <Card key={friend.id} variant="white" style={styles.friendCard}>
                <View style={styles.friendCardContent}>
                  <Avatar name={friend.name} size="medium" style={styles.avatar} />
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{friend.name}</Text>
                    <Text style={styles.friendUsername}>@{friend.username}</Text>
                  </View>
                  <Button variant="primary" style={styles.addButton} onPress={handleAddFriend}>
                    <UserPlus width={16} height={16} color="#000000" style={{ marginRight: 4 }} />
                    Add
                  </Button>
                </View>
              </Card>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No users found</Text>
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
  usernameCard: {
    marginBottom: 24,
  },
  usernameCardContent: {
    padding: 16,
  },
  usernameTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#000000",
  },
  usernameInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  usernameInput: {
    flex: 1,
    marginRight: 8,
    marginBottom: 0,
  },
  suggestedSection: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000000",
  },
  suggestedList: {
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
  friendUsername: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#666666",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
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
})
