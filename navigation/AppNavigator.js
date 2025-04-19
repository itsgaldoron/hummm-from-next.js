import { Platform, View, Text, StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Home, Music, Trophy, User } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { TransitionPresets } from "@react-navigation/stack"

// Import screens
import HomeScreen from "../screens/HomeScreen"
import NewGameScreen from "../screens/NewGameScreen"
import LeaderboardScreen from "../screens/LeaderboardScreen"
import ProfileScreen from "../screens/ProfileScreen"
import SongSelectionScreen from "../screens/SongSelectionScreen"
import RecordingScreen from "../screens/RecordingScreen"
import ChallengeOptionsScreen from "../screens/ChallengeOptionsScreen"
import GameScreen from "../screens/GameScreen"
import FriendsScreen from "../screens/FriendsScreen"
import AddFriendScreen from "../screens/AddFriendScreen"
import SettingsScreen from "../screens/SettingsScreen"
import EditProfileScreen from "../screens/EditProfileScreen"
import AchievementsScreen from "../screens/AchievementsScreen"
import DailyChallengeScreen from "../screens/DailyChallengeScreen"
import GamesHistoryScreen from "../screens/GamesHistoryScreen"
import LoginScreen from "../screens/auth/LoginScreen"
import RegisterScreen from "../screens/auth/RegisterScreen"
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen"
import OnboardingScreen from "../screens/auth/OnboardingScreen"
import MenuScreen from "../screens/MenuScreen"
import { useResponsiveSize } from "../hooks/useResponsiveSize"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const AuthStack = createStackNavigator()
const HomeStack = createStackNavigator()
const NewGameStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const MainStack = createStackNavigator()

// Default screen options for stack navigators
const screenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerShown: false,
  gestureEnabled: true,
  cardOverlayEnabled: true,
  gestureResponseDistance: {
    horizontal: 300,
  },
}

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={screenOptions} initialRouteName="Onboarding">
    <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    
    <AuthStack.Screen name="Login" component={LoginScreen} />
    
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
)

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={screenOptions}>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen name="Game" component={GameScreen} />
    <HomeStack.Screen name="DailyChallenge" component={DailyChallengeScreen} />
    <HomeStack.Screen name="GamesHistory" component={GamesHistoryScreen} />
  </HomeStack.Navigator>
)

const NewGameStackNavigator = () => (
  <NewGameStack.Navigator screenOptions={screenOptions}>
    <NewGameStack.Screen name="NewGameMain" component={NewGameScreen} />
    <NewGameStack.Screen name="SongSelection" component={SongSelectionScreen} />
    <NewGameStack.Screen name="Recording" component={RecordingScreen} />
    <NewGameStack.Screen name="ChallengeOptions" component={ChallengeOptionsScreen} />
  </NewGameStack.Navigator>
)

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator screenOptions={screenOptions}>
    <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    <ProfileStack.Screen name="Achievements" component={AchievementsScreen} />
    <ProfileStack.Screen name="Friends" component={FriendsScreen} />
    <ProfileStack.Screen name="AddFriend" component={AddFriendScreen} />
  </ProfileStack.Navigator>
)

// --- Define Main Stack Navigator ---
const MainStackNavigator = () => (
  <MainStack.Navigator screenOptions={screenOptions} initialRouteName="Menu">
    <MainStack.Screen name="Menu" component={MenuScreen} />
    <MainStack.Screen name="Home" component={HomeStackNavigator} /> 
    <MainStack.Screen name="Play" component={NewGameStackNavigator} />
    <MainStack.Screen name="Leaderboard" component={LeaderboardScreen} />
    <MainStack.Screen name="Profile" component={ProfileStackNavigator} />
  </MainStack.Navigator>
)

const AppNavigator = ({ initialRoute }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
      return null; 
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // Use MainStackNavigator instead of TabNavigator
        <Stack.Screen name="Main" component={MainStackNavigator} /> 
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator
