/*
import * as Analytics from "expo-firebase-analytics"

// Track screen view
export const trackScreenView = async (screenName, screenClass = "") => {
  try {
    await Analytics.logScreenView({
      screen_name: screenName,
      screen_class: screenClass || screenName,
    })
    return true
  } catch (error) {
    console.error("Error tracking screen view:", error)
    return false
  }
}

// Track user login
export const trackLogin = async (method) => {
  try {
    await Analytics.logLogin({ method })
    return true
  } catch (error) {
    console.error("Error tracking login:", error)
    return false
  }
}

// Track user registration
export const trackSignUp = async (method) => {
  try {
    await Analytics.logSignUp({ method })
    return true
  } catch (error) {
    console.error("Error tracking sign up:", error)
    return false
  }
}

// Track game started
export const trackGameStarted = async (gameId, songId, opponentId) => {
  try {
    await Analytics.logEvent("game_started", {
      game_id: gameId,
      song_id: songId,
      opponent_id: opponentId,
    })
    return true
  } catch (error) {
    console.error("Error tracking game started:", error)
    return false
  }
}

// Track game completed
export const trackGameCompleted = async (gameId, songId, opponentId, result, score) => {
  try {
    await Analytics.logEvent("game_completed", {
      game_id: gameId,
      song_id: songId,
      opponent_id: opponentId,
      result,
      score,
    })
    return true
  } catch (error) {
    console.error("Error tracking game completed:", error)
    return false
  }
}

// Track recording created
export const trackRecordingCreated = async (songId, duration) => {
  try {
    await Analytics.logEvent("recording_created", {
      song_id: songId,
      duration,
    })
    return true
  } catch (error) {
    console.error("Error tracking recording created:", error)
    return false
  }
}

// Track challenge sent
export const trackChallengeSent = async (challengeId, songId, recipientId) => {
  try {
    await Analytics.logEvent("challenge_sent", {
      challenge_id: challengeId,
      song_id: songId,
      recipient_id: recipientId,
    })
    return true
  } catch (error) {
    console.error("Error tracking challenge sent:", error)
    return false
  }
}

// Track daily challenge completed
export const trackDailyChallengeCompleted = async (challengeId, result, score) => {
  try {
    await Analytics.logEvent("daily_challenge_completed", {
      challenge_id: challengeId,
      result,
      score,
    })
    return true
  } catch (error) {
    console.error("Error tracking daily challenge completed:", error)
    return false
  }
}

// Track achievement unlocked
export const trackAchievementUnlocked = async (achievementId, achievementName) => {
  try {
    await Analytics.logEvent("achievement_unlocked", {
      achievement_id: achievementId,
      achievement_name: achievementName,
    })
    return true
  } catch (error) {
    console.error("Error tracking achievement unlocked:", error)
    return false
  }
}

// Track content shared
export const trackContentShared = async (contentType, contentId) => {
  try {
    await Analytics.logShare({
      content_type: contentType,
      item_id: contentId,
    })
    return true
  } catch (error) {
    console.error("Error tracking content shared:", error)
    return false
  }
}

// Track user property
export const setUserProperty = async (name, value) => {
  try {
    await Analytics.setUserProperty(name, value)
    return true
  } catch (error) {
    console.error("Error setting user property:", error)
    return false
  }
}

// Set user ID
export const setUserId = async (userId) => {
  try {
    await Analytics.setUserId(userId)
    return true
  } catch (error) {
    console.error("Error setting user ID:", error)
    return false
  }
}

// Reset analytics data
export const resetAnalyticsData = async () => {
  try {
    await Analytics.resetAnalyticsData()
    return true
  } catch (error) {
    console.error("Error resetting analytics data:", error)
    return false
  }
}
*/
