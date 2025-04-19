import { View, Text } from "react-native";
import { Award, Flame, Music, Trophy } from "lucide-react-native";

interface AchievementProps {
  achievement: {
    id: string
    name: string
    description: string
    completed: boolean
    progress?: number
    icon: string
  }
}

export function AchievementCard({ achievement }: AchievementProps) {
  const getIcon = () => {
    switch (achievement.icon) {
      case "trophy":
        return <Trophy className="h-6 w-6" />
      case "flame":
        return <Flame className="h-6 w-6" />
      case "music":
        return <Music className="h-6 w-6" />
      default:
        return <Award className="h-6 w-6" />
    }
  }

  return (
    <View className={`game-card ${achievement.completed ? "bg-primary" : "game-card-white"}`}>
      <View className="p-4 flex flex-row items-center gap-3">
        <View className={`icon-bubble ${achievement.completed ? "icon-bubble-accent" : "icon-bubble-secondary"} p-2`}>
          {getIcon()}
        </View>
        <View className="flex-1">
          <Text className="font-display text-lg font-bold">{achievement.name}</Text>
          <Text className="text-sm">{achievement.description}</Text>

          {!achievement.completed && achievement.progress !== undefined && (
            <View className="mt-2">
              <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <View className="h-full bg-accent" style={{ width: `${(achievement.progress / 20) * 100}%` }}></View>
              </View>
              <Text className="text-xs text-right mt-1">{achievement.progress}/20</Text>
            </View>
          )}
        </View>

        {achievement.completed && <Text className="status-badge bg-black text-white">Completed</Text>}
      </View>
    </View>
  )
}
