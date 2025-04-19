import AsyncStorage from "@react-native-async-storage/async-storage"
import * as FileSystem from "expo-file-system"

// Keys for AsyncStorage
const KEYS = {
  USER_DATA: "user_data",
  GAME_HISTORY: "game_history",
  DAILY_CHALLENGES: "daily_challenges",
  SONGS_DATA: "songs_data",
  RECORDINGS: "recordings",
  LAST_SYNC: "last_sync",
}

// Save user data to AsyncStorage
export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem(KEYS.USER_DATA, JSON.stringify(userData))
    return true
  } catch (error) {
    console.error("Error saving user data:", error)
    return false
  }
}

// Get user data from AsyncStorage
export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER_DATA)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error getting user data:", error)
    return null
  }
}

// Save game history to AsyncStorage
export const saveGameHistory = async (gameHistory) => {
  try {
    await AsyncStorage.setItem(KEYS.GAME_HISTORY, JSON.stringify(gameHistory))
    return true
  } catch (error) {
    console.error("Error saving game history:", error)
    return false
  }
}

// Get game history from AsyncStorage
export const getGameHistory = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.GAME_HISTORY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error getting game history:", error)
    return []
  }
}

// Add a game to history
export const addGameToHistory = async (game) => {
  try {
    const gameHistory = await getGameHistory()
    const updatedHistory = [game, ...gameHistory]
    await saveGameHistory(updatedHistory)
    return true
  } catch (error) {
    console.error("Error adding game to history:", error)
    return false
  }
}

// Save daily challenges to AsyncStorage
export const saveDailyChallenges = async (challenges) => {
  try {
    await AsyncStorage.setItem(KEYS.DAILY_CHALLENGES, JSON.stringify(challenges))
    return true
  } catch (error) {
    console.error("Error saving daily challenges:", error)
    return false
  }
}

// Get daily challenges from AsyncStorage
export const getDailyChallenges = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.DAILY_CHALLENGES)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error getting daily challenges:", error)
    return []
  }
}

// Save songs data to AsyncStorage
export const saveSongsData = async (songs) => {
  try {
    await AsyncStorage.setItem(KEYS.SONGS_DATA, JSON.stringify(songs))
    return true
  } catch (error) {
    console.error("Error saving songs data:", error)
    return false
  }
}

// Get songs data from AsyncStorage
export const getSongsData = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.SONGS_DATA)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error getting songs data:", error)
    return []
  }
}

// Save recording metadata to AsyncStorage
export const saveRecordingMetadata = async (recordings) => {
  try {
    await AsyncStorage.setItem(KEYS.RECORDINGS, JSON.stringify(recordings))
    return true
  } catch (error) {
    console.error("Error saving recording metadata:", error)
    return false
  }
}

// Get recording metadata from AsyncStorage
export const getRecordingMetadata = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.RECORDINGS)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error getting recording metadata:", error)
    return []
  }
}

// Add recording metadata
export const addRecordingMetadata = async (recording) => {
  try {
    const recordings = await getRecordingMetadata()
    const updatedRecordings = [recording, ...recordings]
    await saveRecordingMetadata(updatedRecordings)
    return true
  } catch (error) {
    console.error("Error adding recording metadata:", error)
    return false
  }
}

// Save last sync timestamp
export const saveLastSync = async () => {
  try {
    const timestamp = new Date().toISOString()
    await AsyncStorage.setItem(KEYS.LAST_SYNC, timestamp)
    return true
  } catch (error) {
    console.error("Error saving last sync:", error)
    return false
  }
}

// Get last sync timestamp
export const getLastSync = async () => {
  try {
    return await AsyncStorage.getItem(KEYS.LAST_SYNC)
  } catch (error) {
    console.error("Error getting last sync:", error)
    return null
  }
}

// Download and cache a file
export const downloadAndCacheFile = async (url, filename) => {
  try {
    const documentsDirectory = FileSystem.documentDirectory
    const fileUri = `${documentsDirectory}${filename}`

    // Check if file already exists
    const fileInfo = await FileSystem.getInfoAsync(fileUri)
    if (fileInfo.exists) {
      return fileUri
    }

    // Download the file
    const downloadResult = await FileSystem.downloadAsync(url, fileUri)
    if (downloadResult.status === 200) {
      return fileUri
    } else {
      throw new Error(`Download failed with status ${downloadResult.status}`)
    }
  } catch (error) {
    console.error("Error downloading and caching file:", error)
    return null
  }
}

// Clear all cached data
export const clearAllCachedData = async () => {
  try {
    const keys = Object.values(KEYS)
    await AsyncStorage.multiRemove(keys)

    // Clear cached files
    const documentsDirectory = FileSystem.documentDirectory
    const files = await FileSystem.readDirectoryAsync(documentsDirectory)
    for (const file of files) {
      if (file.endsWith(".mp3") || file.endsWith(".m4a")) {
        await FileSystem.deleteAsync(`${documentsDirectory}${file}`)
      }
    }

    return true
  } catch (error) {
    console.error("Error clearing cached data:", error)
    return false
  }
}

// Check if device is low on storage
export const isLowOnStorage = async () => {
  try {
    const fileInfo = await FileSystem.getFreeDiskStorageAsync()
    // Consider low storage if less than 100MB available
    return fileInfo < 100 * 1024 * 1024
  } catch (error) {
    console.error("Error checking storage:", error)
    return false
  }
}
