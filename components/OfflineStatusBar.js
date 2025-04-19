import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { WifiOff, RefreshCw } from "react-native-feather"
import { useOffline } from "../context/OfflineContext"
import { useTheme } from "../context/ThemeContext"
import { useResponsiveSize } from "../hooks/useResponsiveSize"

export const OfflineStatusBar = () => {
  const { isOnline, isOfflineMode, syncData, lastSyncTime, isSyncing } = useOffline()
  const { theme } = useTheme()
  const { size, fontSize } = useResponsiveSize()
  const [showBar, setShowBar] = useState(false)
  const [animatedHeight] = useState(new Animated.Value(0))

  useEffect(() => {
    // Show the bar if we're offline or in offline mode
    const shouldShow = !isOnline || isOfflineMode

    Animated.timing(animatedHeight, {
      toValue: shouldShow ? 40 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()

    setShowBar(shouldShow)
  }, [isOnline, isOfflineMode, animatedHeight])

  const formatLastSync = () => {
    if (!lastSyncTime) return "Never"

    const lastSync = new Date(lastSyncTime)
    const now = new Date()
    const diffMs = now - lastSync
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  const handleSync = () => {
    if (!isSyncing) {
      syncData()
    }
  }

  if (!showBar) return null

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isOfflineMode ? theme.primary : "#ef4444",
          height: animatedHeight,
        },
      ]}
    >
      <View style={styles.content}>
        <WifiOff width={size(16)} height={size(16)} color={isOfflineMode ? "#000000" : "#ffffff"} />
        <Text
          style={[
            styles.text,
            {
              color: isOfflineMode ? "#000000" : "#ffffff",
              fontSize: fontSize(12),
            },
          ]}
        >
          {isOfflineMode ? "Offline Mode" : "No Internet Connection"}
        </Text>

        {isOfflineMode && (
          <View style={styles.syncInfo}>
            <Text style={[styles.syncText, { color: "#000000", fontSize: fontSize(12) }]}>
              Last sync: {formatLastSync()}
            </Text>
            {isOnline && (
              <TouchableOpacity style={styles.syncButton} onPress={handleSync} disabled={isSyncing}>
                <RefreshCw
                  width={size(16)}
                  height={size(16)}
                  color="#000000"
                  style={isSyncing ? styles.rotating : null}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 40,
  },
  text: {
    fontFamily: "Rubik-Medium",
    marginLeft: 8,
  },
  syncInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  syncText: {
    fontFamily: "Rubik-Regular",
    marginRight: 8,
  },
  syncButton: {
    padding: 4,
  },
  rotating: {
    transform: [{ rotate: "45deg" }],
  },
})
