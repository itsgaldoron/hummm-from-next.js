import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"

// Check if sharing is available on the device
export const isSharingAvailable = async () => {
  return await Sharing.isAvailableAsync()
}

// Share a recording file
export const shareRecording = async (uri, title = "My Humming Recording") => {
  try {
    if (!(await isSharingAvailable())) {
      throw new Error("Sharing is not available on this device")
    }

    // Make sure the file exists
    const fileInfo = await FileSystem.getInfoAsync(uri)
    if (!fileInfo.exists) {
      throw new Error("File does not exist")
    }

    // Share the file
    await Sharing.shareAsync(uri, {
      dialogTitle: title,
      mimeType: "audio/mpeg",
      UTI: "public.audio",
    })

    return { success: true }
  } catch (error) {
    console.error("Error sharing recording:", error)
    return { success: false, error: error.message }
  }
}

// Share a challenge with a deep link
export const shareChallenge = async (challengeId, opponentName) => {
  try {
    if (!(await isSharingAvailable())) {
      throw new Error("Sharing is not available on this device")
    }

    // Create a deep link URL
    const deepLink = `humminggame://challenge/${challengeId}`

    // Share the deep link
    await Sharing.shareAsync(deepLink, {
      dialogTitle: `Challenge from ${opponentName}`,
      mimeType: "text/plain",
      UTI: "public.plain-text",
    })

    return { success: true }
  } catch (error) {
    console.error("Error sharing challenge:", error)
    return { success: false, error: error.message }
  }
}

// Share app invitation
export const shareAppInvitation = async (userName) => {
  try {
    if (!(await isSharingAvailable())) {
      throw new Error("Sharing is not available on this device")
    }

    // Create invitation message
    const message = `${userName} has invited you to play Humming Game! Download the app and challenge your friends to guess songs by humming. https://humminggame.app/download`

    // Share the invitation
    await Sharing.shareAsync(message, {
      dialogTitle: "Invite Friends to Humming Game",
      mimeType: "text/plain",
      UTI: "public.plain-text",
    })

    return { success: true }
  } catch (error) {
    console.error("Error sharing app invitation:", error)
    return { success: false, error: error.message }
  }
}

// Share score or achievement
export const shareAchievement = async (achievementName, score) => {
  try {
    if (!(await isSharingAvailable())) {
      throw new Error("Sharing is not available on this device")
    }

    // Create achievement message
    const message = `I just earned the "${achievementName}" achievement in Humming Game with a score of ${score}! Can you beat me? https://humminggame.app/download`

    // Share the achievement
    await Sharing.shareAsync(message, {
      dialogTitle: "Share Achievement",
      mimeType: "text/plain",
      UTI: "public.plain-text",
    })

    return { success: true }
  } catch (error) {
    console.error("Error sharing achievement:", error)
    return { success: false, error: error.message }
  }
}
