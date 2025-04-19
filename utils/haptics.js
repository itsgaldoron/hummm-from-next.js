import * as Haptics from "expo-haptics"

// Light feedback for UI interactions
export const lightHaptic = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
}

// Medium feedback for more significant interactions
export const mediumHaptic = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}

// Heavy feedback for major interactions
export const heavyHaptic = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
}

// Success feedback
export const successHaptic = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
}

// Error feedback
export const errorHaptic = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
}

// Warning feedback
export const warningHaptic = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
}
