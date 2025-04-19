import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Home, Music, Trophy, User } from "lucide-react-native";

export function BottomNavigation() {
  const navigation: any = useNavigation();
  const route = useRoute();

  const screenMapping: { [key: string]: string } = {
    HomeScreen: '/',
    NewGameScreen: '/new-game',
    LeaderboardScreen: '/leaderboard',
    ProfileScreen: '/profile',
  };

  const currentPath = screenMapping[route.name] || '';

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View className="bottom-nav flex-row justify-around items-center p-2 border-t border-gray-200 bg-white">
      <TouchableOpacity onPress={() => navigateTo('HomeScreen')} className="bottom-nav-item flex-1 flex-col items-center">
        <View className={`bottom-nav-icon p-1 ${isActive('/') ? 'active' : ''}`}>
          <Home className={`h-6 w-6 ${isActive('/') ? 'text-blue-600' : 'text-gray-500'}`} />
        </View>
        <Text className={`text-xs ${isActive('/') ? 'font-bold text-blue-600' : 'text-gray-500'}`}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo('NewGameScreen')} className="bottom-nav-item flex-1 flex-col items-center">
         <View className={`bottom-nav-icon p-1 ${isActive('/new-game') ? 'active' : ''}`}>
           <Music className={`h-6 w-6 ${isActive('/new-game') ? 'text-blue-600' : 'text-gray-500'}`} />
         </View>
         <Text className={`text-xs ${isActive('/new-game') ? 'font-bold text-blue-600' : 'text-gray-500'}`}>Play</Text>
      </TouchableOpacity>

       <TouchableOpacity onPress={() => navigateTo('LeaderboardScreen')} className="bottom-nav-item flex-1 flex-col items-center">
         <View className={`bottom-nav-icon p-1 ${isActive('/leaderboard') ? 'active' : ''}`}>
           <Trophy className={`h-6 w-6 ${isActive('/leaderboard') ? 'text-blue-600' : 'text-gray-500'}`} />
         </View>
         <Text className={`text-xs ${isActive('/leaderboard') ? 'font-bold text-blue-600' : 'text-gray-500'}`}>Leaderboard</Text>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => navigateTo('ProfileScreen')} className="bottom-nav-item flex-1 flex-col items-center">
         <View className={`bottom-nav-icon p-1 ${isActive('/profile') ? 'active' : ''}`}>
           <User className={`h-6 w-6 ${isActive('/profile') ? 'text-blue-600' : 'text-gray-500'}`} />
         </View>
         <Text className={`text-xs ${isActive('/profile') ? 'font-bold text-blue-600' : 'text-gray-500'}`}>Profile</Text>
       </TouchableOpacity>
    </View>
  );
}
