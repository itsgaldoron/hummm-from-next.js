import { View, Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Award, Flame, Music, Star } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"

export default function AchievementsScreen({ navigation }) {
  const { theme } = useTheme()

  // Mock achievements data
  const achievements = [
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
    { id: "4", name: "Social Butterfly", description: "Add 10 friends", completed: false, progress: 4, icon: "users" },
    { id: "5", name: "Melody Maker", description: "Create 5 challenges", completed: true, icon: "mic" },
    {
      id: "6",
      name: "Perfect Pitch",
      description: "Get 10 correct guesses in a row",
      completed: false,
      progress: 7,
      icon: "star",
    },
    {
      id: "7",
      name: "Genre Master",
      description: "Correctly guess songs from 5 different genres",
      completed: false,
      progress: 3,
      icon: "disc",
    },
    {
      id: "8",
      name: "Dedicated Player",
      description: "Play for 7 consecutive days",
      completed: true,
      icon: "calendar",
    },
  ]

  // Count completed achievements
  const completedCount = achievements.filter((a) => a.completed).length

  const getIcon = (iconName) => {
    switch (iconName) {
      case "trophy":
        return <Award width={20} height={20} color="#000000" />
      case "flame":
        return <Flame width={20} height={20} color="#000000" />
      case "music":
        return <Music width={20} height={20} color="#000000" />
      case "star":
        return <Star width={20} height={20} color="#000000" />
      default:
        return <Award width={20} height={20} color="#000000" />
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
        <Text style={styles.title}>Achievements</Text>
      </View>

      <Card variant="white" style={styles.summaryCard}>
        <View style={styles.summaryContent}>
          <Text style={[styles.summaryCount, { color: theme.accent }]}>
            {completedCount}/{achievements.length}
          </Text>
          <Text style={styles.summaryText}>Achievements Completed</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(completedCount / achievements.length) * 100}%`,
                    backgroundColor: theme.accent,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </Card>

      <ScrollView style={styles.achievementsList} showsVerticalScrollIndicator={false}>
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            variant={achievement.completed ? "primary" : "white"}
            style={styles.achievementCard}
          >
            <View style={styles.achievementContent}>
              <IconBubble
                variant={achievement.completed ? "accent" : "secondary"}
                size="small"
                style={styles.achievementIcon}
              >
                {getIcon(achievement.icon)}
              </IconBubble>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.name}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>

                {!achievement.completed && achievement.progress !== undefined && (
                  <View style={styles.achievementProgress}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${(achievement.progress / 10) * 100}%`,
                            backgroundColor: theme.accent,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>{achievement.progress}/10</Text>
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
  summaryCard: {
    marginBottom: 24,
  },
  summaryContent: {
    alignItems: "center",
    padding: 16,
  },
  summaryCount: {
    fontFamily: "Fredoka-Regular",
    fontSize: 32,
    fontWeight: "700",
  },
  summaryText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
    color: "#000000",
  },
  progressContainer: {
    width: "100%",
  },
  progressBar: {
    height: 12,
    backgroundColor: "#e5e5e5",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  achievementsList: {
    flex: 1,
  },
  achievementCard: {
    marginBottom: 16,
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
  achievementProgress: {
    marginTop: 8,
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
})
