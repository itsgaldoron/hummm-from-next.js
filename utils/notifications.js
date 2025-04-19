import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import Constants from "expo-constants"
import { Platform } from "react-native"

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

// Get project ID safely
const getProjectId = () => {
  try {
    // Try different paths to find the project ID
    return (
      Constants.expoConfig?.extra?.eas?.projectId ||
      Constants.manifest?.extra?.eas?.projectId ||
      Constants.manifest2?.extra?.eas?.projectId ||
      "unknown"
    )
  } catch (error) {
    console.error("Error getting project ID:", error)
    return "unknown"
  }
}

// Register for push notifications
export const registerForPushNotifications = async () => {
  let token

  if (Platform.OS === "android") {
    try {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF5757",
      })
    } catch (error) {
      console.error("Error setting notification channel:", error)
    }
  }

  if (!Device.isDevice) {
    return { success: false, error: "Must use physical device for push notifications" }
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== "granted") {
      return { success: false, error: "Permission not granted" }
    }

    // Get the project ID
    const projectId = getProjectId()

    // Get the push token
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data
  } catch (error) {
    console.error("Error getting push token:", error)
    return { success: false, error: error.message }
  }

  return { success: true, token }
}

// Schedule a local notification
export const scheduleLocalNotification = async (title, body, data = {}, trigger = null) => {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
        badge: 1,
      },
      trigger: trigger || { seconds: 1 },
    })

    return { success: true, notificationId }
  } catch (error) {
    console.error("Error scheduling notification:", error)
    return { success: false, error: error.message }
  }
}

// Schedule a daily reminder notification
export const scheduleDailyReminder = async (hour = 18, minute = 0) => {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Challenge Available!",
        body: "A new daily challenge is waiting for you. Test your humming skills!",
        data: { screen: "DailyChallenge" },
        sound: true,
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    })

    return { success: true, notificationId }
  } catch (error) {
    console.error("Error scheduling daily reminder:", error)
    return { success: false, error: error.message }
  }
}

// Schedule a notification for when a friend responds to a challenge
export const scheduleChallengeResponseNotification = async (friendName, delay = 60) => {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Challenge Response!",
        body: `${friendName} has responded to your challenge. See if they guessed correctly!`,
        data: { screen: "Game" },
        sound: true,
      },
      trigger: { seconds: delay },
    })

    return { success: true, notificationId }
  } catch (error) {
    console.error("Error scheduling challenge response notification:", error)
    return { success: false, error: error.message }
  }
}

// Cancel all scheduled notifications
export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync()
    return { success: true }
  } catch (error) {
    console.error("Error canceling notifications:", error)
    return { success: false, error: error.message }
  }
}

// Cancel a specific notification
export const cancelNotification = async (notificationId) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId)
    return { success: true }
  } catch (error) {
    console.error("Error canceling notification:", error)
    return { success: false, error: error.message }
  }
}

// Get all scheduled notifications
export const getAllScheduledNotifications = async () => {
  try {
    const notifications = await Notifications.getAllScheduledNotificationsAsync()
    return { success: true, notifications }
  } catch (error) {
    console.error("Error getting scheduled notifications:", error)
    return { success: false, error: error.message }
  }
}

// Set badge count
export const setBadgeCount = async (count) => {
  try {
    await Notifications.setBadgeCountAsync(count)
    return { success: true }
  } catch (error) {
    console.error("Error setting badge count:", error)
    return { success: false, error: error.message }
  }
}

// Clear badge count
export const clearBadgeCount = async () => {
  try {
    await Notifications.setBadgeCountAsync(0)
    return { success: true }
  } catch (error) {
    console.error("Error clearing badge count:", error)
    return { success: false, error: error.message }
  }
}
