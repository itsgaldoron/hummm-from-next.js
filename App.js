import 'react-native-gesture-handler'; // MUST BE AT THE TOP

import { useState, useEffect, useCallback, useRef } from "react"
import { View, Text, StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import { ThemeProvider } from "./context/ThemeContext"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { OfflineProvider } from "./context/OfflineContext"
import { LoadingScreen } from "./components/LoadingScreen"
import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./navigation/AppNavigator"
// import * as Linking from "expo-linking"
// import { parseDeepLink, setupNotificationHandler } from "./utils/deepLinking"

// Comment out or remove other imports not needed for basic view
// import { NavigationContainer } from "@react-navigation/native"
// import * as SplashScreen from "expo-splash-screen"
// import { useFonts } from "expo-font"
// import AppNavigator from "./navigation/AppNavigator"
// import { ThemeProvider } from "./context/ThemeContext"
// import { OfflineProvider } from "./context/OfflineContext"
// import { AuthProvider, useAuth } from "./context/AuthContext"
// import { ErrorBoundary } from "./components/ErrorBoundary"
// import { NetworkStatusMonitor } from "./components/NetworkStatusMonitor"
// import { OfflineStatusBar } from "./components/OfflineStatusBar"
// import { LoadingScreen } from "./components/LoadingScreen"
// import * as Analytics from "./utils/analytics"
// import * as Linking from "expo-linking"
// import { parseDeepLink, setupNotificationHandler } from "./utils/deepLinking"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync() // Re-enable splash screen

// Define minimal screen here
const MinimalAppScreen = () => (
  <View style={{ flex: 1, backgroundColor: 'seagreen', alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: 'white', fontSize: 20 }}>Navigation Container Test</Text>
  </View>
);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  // --- Uncomment useFonts hook ---
  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
    "Fredoka-Regular": require("./assets/fonts/Fredoka-Regular.ttf"),
    "Fredoka-Medium": require("./assets/fonts/Fredoka-Medium.ttf"),
    "Fredoka-Bold": require("./assets/fonts/Fredoka-Bold.ttf"),
  })

  // --- Keep prepare useEffect ---
  useEffect(() => {
    async function prepare() {
      try {
        console.log("Prepare function running...");
        // Basic synchronous prep
      } catch (e) {
        console.warn("Prepare error:", e)
      } finally {
        console.log("Prepare function finished, setting appIsReady = true");
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  // --- Update onLayoutRootView condition ---
  const onLayoutRootView = useCallback(async () => {
    // Hide splash only when BOTH basic prep is done AND fonts are resolved
    if (appIsReady && (fontsLoaded || fontError)) {
      console.log(`SplashScreen Hide: appIsReady=${appIsReady}, fontsLoaded=${fontsLoaded}, fontError=${!!fontError}. Hiding.`);
      await SplashScreen.hideAsync()
    } else {
       console.log(`SplashScreen Hide: Not ready yet (appIsReady=${appIsReady}, fontsLoaded=${fontsLoaded}, fontError=${!!fontError}).`);
    }
  }, [appIsReady, fontsLoaded, fontError]) // Add font dependencies

  // --- Temporarily comment out listener useEffects ---
  // // Set up notification handler when navigation is ready
  // useEffect(() => {
  //   if (navigationRef.current) {
  //     notificationSubscriptionRef.current = setupNotificationHandler(navigationRef.current)
  //   }
  //
  //   return () => {
  //     if (notificationSubscriptionRef.current) {
  //       notificationSubscriptionRef.current.remove()
  //     }
  //   }
  // }, [navigationRef.current])
  //
  // // Handle deep links listener
  // useEffect(() => {
  //   const subscription = Linking.addEventListener("url", ({ url }) => {
  //     const parsedLink = parseDeepLink(url)
  //     if (parsedLink && navigationRef.current) {
  //       handleNavigation(parsedLink, navigationRef.current)
  //     }
  //   })
  //
  //   return () => {
  //     subscription.remove()
  //   }
  // }, [])
  // --- End temporary comment ---

  // --- Keep definitions commented out ---
  // // Function to handle navigation based on deep link
  // const handleNavigation = (parsedLink, navigation) => { ... }
  //
  // // Linking configuration
  // const linking = { ... }
  // --- End definitions --- 

  const AppContent = () => {
    // Restore Navigation Container and App Navigator
    // Note: Deep linking initialRoute/linking props are not passed yet
    return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
  }

  // --- Update rendering condition to wait for fonts ---
  const isLoading = !appIsReady || (!fontsLoaded && !fontError);

  useEffect(() => {
    // Log loading state changes
    console.log(`Loading state: appIsReady=${appIsReady}, fontsLoaded=${fontsLoaded}, fontError=${!!fontError}, isLoading=${isLoading}`);
  }, [appIsReady, fontsLoaded, fontError, isLoading]);

  if (isLoading) {
     console.log("App loading (waiting for prepare and/or fonts), returning null");
     // Optionally return a basic loading indicator view instead of null
     return null; // Render nothing until basic prep AND fonts are resolved
  }

  if (fontError) {
    // Handle font loading error - Render a message or specific error screen
    console.error("Font loading error:", fontError);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Failed to load fonts.</Text>
        <Text style={{ color: 'white', fontSize: 12 }}>{fontError.message}</Text>
      </View>
    );
  }

  console.log("App is ready AND fonts resolved, rendering main view with Navigator");
  return (
    <ErrorBoundary>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <SafeAreaProvider>
          <ThemeProvider>
            <AuthProvider>
              <OfflineProvider>
                <AppContent />
              </OfflineProvider>
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </View>
    </ErrorBoundary>
  )
}

// Add basic styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue", // Use a visible color
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});
