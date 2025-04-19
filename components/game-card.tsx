import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Clock, Music } from "lucide-react-native"

interface GameCardProps {
  game: {
    id: string
    opponent: string
    status: "your-turn" | "their-turn" | "completed"
    lastPlayed: string
    avatarUrl: string
  }
}

export function GameCard({ game }: GameCardProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    // Adjust 'GameScreen' and the param name { gameId: game.id }
    // based on your actual navigator setup.
    // @ts-ignore - Add proper typing for navigation stack if possible
    navigation.navigate('GameScreen', { gameId: game.id });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className={`game-card p-4 ${game.status === "your-turn" ? "" : "game-card-white"}`}>
        <View className="flex flex-row items-center gap-4">
          <Image
            className="h-14 w-14 rounded-full border-4 border-black"
            source={{ uri: game.avatarUrl || undefined }}
            alt={game.opponent}
          />
          <View className="flex-1">
            <Text className="font-display text-xl font-bold">{game.opponent}</Text>
            <View className="flex flex-row items-center text-sm gap-1 font-medium">
              <Clock className="h-4 w-4" />
              <Text>{game.lastPlayed}</Text>
            </View>
          </View>
          <View className="flex flex-col items-end">
            {game.status === "your-turn" ? (
              <Text className="status-badge bg-black text-white">Your turn</Text>
            ) : game.status === "their-turn" ? (
              <Text className="status-badge bg-secondary">Their turn</Text>
            ) : (
              <Text className="status-badge bg-green-500 text-white">Completed</Text>
            )}
            {game.status === "your-turn" && (
              <View className="mt-2 icon-bubble icon-bubble-accent p-2 border-2">
                <Music className="h-5 w-5" />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
