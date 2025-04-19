import React, { createContext, useState, useContext, useEffect } from "react"
import NetInfo from "@react-native-community/netinfo"
import * as OfflineStorage from "../utils/offlineStorage"

const OfflineContext = createContext({
  isOnline: true,
  isOfflineMode: false,
  hasOfflineData: false,
  toggleOfflineMode: () => {},
  syncData: () => {},
  lastSyncTime: null,
})

export const useOffline = () => useContext(OfflineContext)

export const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true)
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [hasOfflineData, setHasOfflineData] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState(null)
  const [isSyncing, setIsSyncing] = useState(false)

  // Check network status and offline data on mount
  useEffect(() => {
    const checkOfflineData = async () => {
      const userData = await OfflineStorage.getUserData()
      const songsData = await OfflineStorage.getSongsData()
      const lastSync = await OfflineStorage.getLastSync()

      setHasOfflineData(!!(userData && songsData && songsData.length > 0))
      setLastSyncTime(lastSync)
    }

    checkOfflineData()

    // Subscribe to network status changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected && state.isInternetReachable)

      // If we go offline and have offline data, enable offline mode
      if (!state.isConnected && hasOfflineData) {
        setIsOfflineMode(true)
      }
    })

    return () => unsubscribe()
  }, [hasOfflineData])

  // Toggle offline mode
  const toggleOfflineMode = () => {
    if (!isOnline && !hasOfflineData) {
      // Can't enable offline mode without data
      return false
    }

    setIsOfflineMode(!isOfflineMode)
    return true
  }

  // Sync data with server
  const syncData = async () => {
    if (!isOnline) {
      return { success: false, message: "No internet connection" }
    }

    try {
      setIsSyncing(true)

      // In a real app, you would:
      // 1. Upload any pending recordings
      // 2. Sync game history
      // 3. Download new daily challenges
      // 4. Download new songs data

      // For this demo, we'll just simulate a sync
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update last sync time
      await OfflineStorage.saveLastSync()
      const newSyncTime = await OfflineStorage.getLastSync()
      setLastSyncTime(newSyncTime)

      setIsSyncing(false)
      return { success: true, message: "Data synced successfully" }
    } catch (error) {
      console.error("Error syncing data:", error)
      setIsSyncing(false)
      return { success: false, message: error.message || "Failed to sync data" }
    }
  }

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        isOfflineMode,
        hasOfflineData,
        toggleOfflineMode,
        syncData,
        lastSyncTime,
        isSyncing,
      }}
    >
      {children}
    </OfflineContext.Provider>
  )
}
