import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
// Uncomment icons if you plan to use them in the restored fallback
// import { AlertTriangle, RefreshCw } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { useResponsiveSize } from "../hooks/useResponsiveSize"

// --- ErrorBoundaryClass (Lifecycle methods are active) ---
class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    console.log("ErrorBoundary getDerivedStateFromError caught:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary componentDidCatch caught:", error, errorInfo);
    // TODO: Log to error reporting service (Sentry, etc.)
  }

  // --- Re-enable resetError method ---
  resetError = () => {
    console.log("Resetting error boundary state...");
    this.setState({ hasError: false, error: null })
    // Optionally trigger a reload or navigation action if needed
    // props.onReset?.(); // If you want to notify parent
  }

  render() {
    if (this.state.hasError) {
      // Pass resetError handler to the fallback
      return <this.props.FallbackComponent error={this.state.error} resetError={this.resetError} />
    }
    return this.props.children
  }
}

// --- Restore original ErrorFallback component --- 
const ErrorFallback = ({ error, resetError, theme, size, fontSize }) => {
  // Add basic default values or checks for robustness, though shouldn't be needed now
  const safeTheme = theme || { background: '#f0f0f0', foreground: '#333', mutedForeground: '#777', accent: '#007bff' };
  const safeSize = size || ((val) => val); // Default size function returns input
  const safeFontSize = fontSize || ((val) => val); // Default fontSize function returns input

  return (
    <View style={[styles.container, { backgroundColor: safeTheme.background }]}>
      <View style={styles.content}>
        {/* Optional: Restore Icon 
        <View style={[styles.iconContainer, { backgroundColor: safeTheme.accent }]}>
          <AlertTriangle width={safeSize(40)} height={safeSize(40)} color="#ffffff" />
        </View> 
        */}

        <Text style={[styles.title, { color: safeTheme.foreground, fontSize: safeFontSize(24) }]}>
          Oops! Something went wrong
        </Text>

        <Text style={[styles.message, { color: safeTheme.foreground, fontSize: safeFontSize(16) }]}>
          We encountered an unexpected issue.
        </Text>

        {/* Restore error details view */}
        <View style={styles.errorDetails}>
          <Text style={[styles.errorText, { color: safeTheme.mutedForeground, fontSize: safeFontSize(12) }]}>
            Error: {error?.message || "Unknown error"}
          </Text>
        </View>

        {/* Restore button and connect resetError */}
        <TouchableOpacity style={[styles.button, { backgroundColor: safeTheme.accent }]} onPress={resetError}>
          {/* Optional: Restore Icon
          <RefreshCw width={safeSize(20)} height={safeSize(20)} color="#ffffff" style={styles.buttonIcon} /> 
          */}
          <Text style={[styles.buttonText, { fontSize: safeFontSize(16) }]}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// --- Restore functional wrapper with prop passing ---
export const ErrorBoundary = ({ children }) => {
  const { theme } = useTheme()
  const { size, fontSize } = useResponsiveSize()

  // Intermediate component to pass props to the fallback
  const FallbackWithProps = ({ error, resetError }) => (
    <ErrorFallback
      error={error}
      resetError={resetError}
      theme={theme} // Pass theme from hook
      size={size} // Pass size from hook
      fontSize={fontSize} // Pass fontSize from hook
    />
  );

  // Pass FallbackWithProps to the class component
  return <ErrorBoundaryClass FallbackComponent={FallbackWithProps}>{children}</ErrorBoundaryClass>
}

// --- Restore original styles --- 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    maxWidth: 400,
    padding: 20,
    borderRadius: 8,
    // Optional: Add a subtle background for the content box if desired
    // backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  iconContainer: {
    width: 60, // Adjusted size
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold", // Make title bold
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    marginBottom: 20,
    textAlign: "center",
  },
  errorDetails: {
    backgroundColor: 'rgba(0,0,0,0.05)', // Subtle background for error
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
    width: '100%', // Take full width of content area
  },
  errorText: {
    fontFamily: 'monospace', // Use monospace for error
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
})
