import { initializeApp, getApps } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged,
  GoogleAuthProvider as FirebaseGoogleAuthProvider,
  signInWithCredential as signInWithFirebaseCredential,
  OAuthProvider,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as updateFirebasePassword,
  updateEmail as updateFirebaseEmail,
  deleteUser,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth"
import * as Google from "expo-auth-session/providers/google"
import * as AppleAuthentication from "expo-apple-authentication"
import * as SecureStore from "expo-secure-store"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
let app
let auth

// Ensure Firebase initializes only once
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
  // Initialize Auth with persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  })
} else {
  app = getApps()[0]
  // Get auth instance if already initialized
  auth = getAuth(app)
}

// Secure storage keys
const SECURE_STORE_KEYS = {
  USER_DATA: "user_data",
  AUTH_TOKEN: "auth_token",
}

// Save user data to secure storage
const saveUserToSecureStore = async (user) => {
  try {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
    await SecureStore.setItemAsync(SECURE_STORE_KEYS.USER_DATA, JSON.stringify(userData))
    return true
  } catch (error) {
    console.error("Error saving user to secure store:", error)
    return false
  }
}

// Get user data from secure storage
export const getUserFromSecureStore = async () => {
  try {
    const userDataJson = await SecureStore.getItemAsync(SECURE_STORE_KEYS.USER_DATA)
    return userDataJson ? JSON.parse(userDataJson) : null
  } catch (error) {
    console.error("Error getting user from secure store:", error)
    return null
  }
}

// Clear user data from secure storage
const clearUserFromSecureStore = async () => {
  try {
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.USER_DATA)
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.AUTH_TOKEN)
    return true
  } catch (error) {
    console.error("Error clearing user from secure store:", error)
    return false
  }
}

// Register with email and password
export const registerWithEmail = async (email, password, displayName) => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase auth not initialized" }
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    await updateFirebaseProfile(user, { displayName })

    // Save user data to secure storage
    await saveUserToSecureStore(user)

    return { success: true, user }
  } catch (error) {
    console.error("Error registering with email:", error)
    return { success: false, error: error.message }
  }
}

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase auth not initialized" }
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Save user data to secure storage
    await saveUserToSecureStore(user)

    return { success: true, user }
  } catch (error) {
    console.error("Error signing in with email:", error)
    return { success: false, error: error.message }
  }
}

// Sign in with Google
export const signInWithGoogle = async (promptAsync) => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase auth not initialized" }
    }

    if (!promptAsync) {
      return { success: false, error: "Google authentication not initialized" }
    }

    const result = await promptAsync()

    if (result.type === "success") {
      const { id_token } = result.params
      const credential = FirebaseGoogleAuthProvider.credential(id_token)
      const userCredential = await signInWithFirebaseCredential(auth, credential)
      const user = userCredential.user

      // Save user data to secure storage
      await saveUserToSecureStore(user)

      return { success: true, user }
    } else {
      return { success: false, error: "Google sign in was cancelled or failed" }
    }
  } catch (error) {
    console.error("Error signing in with Google:", error)
    return { success: false, error: error.message }
  }
}

// Sign in with Apple
export const signInWithApple = async () => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase auth not initialized" }
    }

    if (Platform.OS !== "ios") {
      return { success: false, error: "Apple Sign In is only available on iOS devices" }
    }

    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    })

    if (credential) {
      const { identityToken, fullName } = credential
      const provider = new OAuthProvider("apple.com")
      const authCredential = provider.credential({
        idToken: identityToken,
      })

      const userCredential = await signInWithFirebaseCredential(auth, authCredential)
      const user = userCredential.user

      // Update display name if not set and fullName is available
      if (!user.displayName && fullName) {
        const displayName = `${fullName.givenName || ""} ${fullName.familyName || ""}`.trim()
        if (displayName) {
          await updateFirebaseProfile(user, { displayName })
        }
      }

      // Save user data to secure storage
      await saveUserToSecureStore(user)

      return { success: true, user }
    } else {
      return { success: false, error: "Apple sign in was cancelled or failed" }
    }
  } catch (error) {
    console.error("Error signing in with Apple:", error)
    return { success: false, error: error.message }
  }
}

// Sign out
export const signOutUser = async () => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase auth not initialized" }
    }

    await signOut(auth)
    await clearUserFromSecureStore()
    return { success: true }
  } catch (error) {
    console.error("Error signing out:", error)
    return { success: false, error: error.message }
  }
}

// Send password reset email
export const sendPasswordReset = async (email) => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase auth not initialized" }
    }

    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error) {
    console.error("Error sending password reset email:", error)
    return { success: false, error: error.message }
  }
}

// Update user profile
export const updateUserProfile = async (displayName, photoURL) => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase auth not initialized" }
    }

    const user = auth.currentUser
    if (!user) {
      return { success: false, error: "No user is signed in" }
    }

    await updateFirebaseProfile(user, { displayName, photoURL })

    // Update user data in secure storage
    await saveUserToSecureStore(user)

    return { success: true, user }
  } catch (error) {
    console.error("Error updating user profile:", error)
    return { success: false, error: error.message }
  }
}

// Update user email
export const updateUserEmail = async (newEmail, password) => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase auth not initialized" }
    }

    const user = auth.currentUser
    if (!user) {
      return { success: false, error: "No user is signed in" }
    }

    // Re-authenticate user before updating email
    const credential = EmailAuthProvider.credential(user.email, password)
    await reauthenticateWithCredential(user, credential)

    await updateFirebaseEmail(user, newEmail)

    // Update user data in secure storage
    await saveUserToSecureStore(user)

    return { success: true, user }
  } catch (error) {
    console.error("Error updating user email:", error)
    return { success: false, error: error.message }
  }
}

// Update user password
export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase auth not initialized" }
    }

    const user = auth.currentUser
    if (!user) {
      return { success: false, error: "No user is signed in" }
    }

    // Re-authenticate user before updating password
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    await updateFirebasePassword(user, newPassword)

    return { success: true }
  } catch (error) {
    console.error("Error updating user password:", error)
    return { success: false, error: error.message }
  }
}

// Delete user account
export const deleteUserAccount = async (password) => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase auth not initialized" }
    }

    const user = auth.currentUser
    if (!user) {
      return { success: false, error: "No user is signed in" }
    }

    // Re-authenticate user before deleting account
    const credential = EmailAuthProvider.credential(user.email, password)
    await reauthenticateWithCredential(user, credential)

    await deleteUser(user)
    await clearUserFromSecureStore()

    return { success: true }
  } catch (error) {
    console.error("Error deleting user account:", error)
    return { success: false, error: error.message }
  }
}

// Listen for auth state changes
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, save to SecureStore
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
      await saveUserToSecureStore(userData)
      callback(user)
    } else {
      // User is signed out, remove from SecureStore
      await clearUserFromSecureStore()
      callback(null)
    }
  })
}

// Get current user
export const getCurrentUser = () => {
  if (!auth) {
    console.error("Firebase auth not initialized")
    return null
  }

  return auth.currentUser
}
