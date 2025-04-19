import { View, Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Award, Crown, Settings, User, LogOut, Music, Flame } from "lucide-react-native"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"
import { Avatar } from "../components/ui/Avatar"
import { Button } from "../components/ui/Button"

export default function ProfileScreen({ navigation }) {
  const { theme } = useTheme()

  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "alexj",
    avatarUrl: null,
    stats: {
      gamesPlayed: 42,
      gamesWon: 28,
      winRate: "67%",
      longestStreak: 5,
      currentStreak: 3,
      favoriteSong: "Bohemian Rhapsody",
    },
    achievements: [
      { id: "1", name: "First Win", description: "Win your first game", completed: true, icon: "trophy" },
      { id: "2", name: "Streak Master", description: "Win 5 games in a row", completed: true, icon: "flame" },
      {
        id: "3",
        name: "Music Expert",
        description: "Correctly guess 20 songs",
        completed: false,
        progress: 15,
        icon: "music",
      },
    ],
  }

  const handleSignOut = () => {
    // Mock sign out - redirect to login page
    navigation.navigate("Login")
  }

  const renderAchievement = (achievement) => {
    let icon
    switch (achievement.icon) {
      case "trophy":
        icon = <Award width={20} height={20} color="#000000" />
        break
      case "flame":
        icon = <Flame width={20} height={20} color="#000000" />
        break
      case "music":
        icon = <Music width={20} height={20} color="#000000" />
        break
      default:
        icon = <Award width={20} height={20} color="#000000" />
    }

    return (
      <Card key={achievement.id} variant={achievement.completed ? "primary" : "white"} style={styles.achievementCard}>
        <View style={styles.achievementContent}>
          <IconBubble
            variant={achievement.completed ? "accent" : "secondary"}
            size="small"
            style={styles.achievementIcon}
          >
            {icon}
          </IconBubble>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>{achievement.name}</Text>
            <Text style={styles.achievementDescription}>{achievement.description}</Text>

            {!achievement.completed && achievement.progress !== undefined && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(achievement.progress / 20) * 100}%`,
                        backgroundColor: theme.accent,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{achievement.progress}/20</Text>
              </View>
            )}
          </View>

          {achievement.completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          )}
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
        <Text style={styles.title}>Profile</Text>
        <IconBubble variant="white" size="small" onPress={() => navigation.navigate("Settings")}>
          <Settings width={24} height={24} color="#000000" />
        </IconBubble>
      </View>

      <View style={styles.profileHeader}>
        <Avatar name={user.name} size="large" style={styles.avatar} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userHandle}>@{user.username}</Text>
      </View>

      <View style={styles.statsGrid}>
        <Card variant="white" style={styles.statCard}>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{user.stats.gamesWon}</Text>
            <Text style={styles.statLabel}>Games Won</Text>
          </View>
        </Card>
        <Card variant="white" style={styles.statCard}>
          <View style={styles.statContent}>
            <View style={styles.streakContainer}>
              <Flame width={24} height={24} color={theme.accent} />
              <Text style={[styles.statValue, { color: theme.accent }]}>{user.stats.currentStreak}</Text>
            </View>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
        </Card>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Card variant="white" style={[styles.statsCard, { backgroundColor: theme.muted }]}>
          <View style={styles.statsCardContent}>
            <Text style={styles.sectionTitle}>Stats</Text>
            <View style={styles.statsList}>
              <View style={styles.statItem}>
                <IconBubble variant="primary" size="small" style={styles.statItemIcon}>
                  <Music width={20} height={20} color="#000000" />
                </IconBubble>
                <View style={styles.statItemInfo}>
                  <Text style={styles.statItemTitle}>Games Played</Text>
                  <Text style={styles.statItemValue}>{user.stats.gamesPlayed} games</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <IconBubble variant="primary" size="small" style={styles.statItemIcon}>
                  <Crown width={20} height={20} color="#000000" />
                </IconBubble>
                <View style={styles.statItemInfo}>
                  <Text style={styles.statItemTitle}>Longest Streak</Text>
                  <Text style={styles.statItemValue}>{user.stats.longestStreak} wins in a row</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <IconBubble variant="primary" size="small" style={styles.statItemIcon}>
                  <Award width={20} height={20} color="#000000" />
                </IconBubble>
                <View style={styles.statItemInfo}>
                  <Text style={styles.statItemTitle}>Favorite Song</Text>
                  <Text style={styles.statItemValue}>{user.stats.favoriteSong}</Text>
                </View>
              </View>
            </View>
          </View>
        </Card>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsList}>{user.achievements.map(renderAchievement)}</View>
          <Text 
            style={[styles.viewAllLink, { color: theme.accent }]} 
            onPress={() => navigation.navigate("Achievements")}
          >
            View All Achievements
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button variant="primary" style={styles.profileButton} onPress={() => navigation.navigate("EditProfile")}>
            <User width={20} height={20} color="#000000" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </Button>
          <Button variant="accent" style={styles.profileButton} onPress={handleSignOut}>
            <LogOut width={20} height={20} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={[styles.buttonText, { color: "#ffffff" }]}>Sign Out</Text>
          </Button>
        </View>
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
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    fontFamily: "Fredoka-Regular",
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  userName: {
    fontFamily: "Fredoka-Regular",
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
  },
  userHandle: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#666666",
  },
  statsGrid: {
    flexDirection: "row",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  statContent: {
    alignItems: "center",
    padding: 16,
  },
  statValue: {
    fontFamily: "Fredoka-Regular",
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
  },
  statLabel: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#000000",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  statsCard: {
    marginBottom: 24,
  },
  statsCardContent: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000000",
  },
  statsList: {
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItemIcon: {
    marginRight: 12,
  },
  statItemInfo: {
    flex: 1,
  },
  statItemTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  statItemValue: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#666666",
  },
  achievementsSection: {
    marginBottom: 24,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    marginBottom: 8,
  },
  achievementContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  achievementIcon: {
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  achievementDescription: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#666666",
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e5e5e5",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  progressText: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
    color: "#666666",
  },
  completedBadge: {
    backgroundColor: "#000000",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  completedText: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
  },
  viewAllLink: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 16,
    fontWeight: "700",
  },
})
