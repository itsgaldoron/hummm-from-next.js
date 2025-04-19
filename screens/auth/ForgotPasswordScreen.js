import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Mail, Send } from "react-native-feather"
import { useTheme } from "../../context/ThemeContext"
import { BackgroundShapes } from "../../components/BackgroundShapes"
import { BackgroundMusicElements } from "../../components/BackgroundMusicElements"
import { Toast } from "../../components/Toast"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { IconBubble } from "../../components/ui/IconBubble"

export default function ForgotPasswordScreen({ navigation }) {
  const { theme } = useTheme()
  const [email, setEmail] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setShowToast(true)
    setSubmitted(true)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {showToast && (
        <Toast message="Password reset link sent to your email!" type="success" onClose={() => setShowToast(false)} />
      )}

      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.navigate("Login")}>
          <ArrowLeft width={24} height={24} color="#000000" />
        </IconBubble>
        <Text style={styles.title}>Reset Password</Text>
      </View>

      <View style={styles.formContainer}>
        {!submitted ? (
          <View style={styles.form}>
            <Text style={styles.description}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                leftIcon={<Mail width={20} height={20} color="#9ca3af" />}
              />
            </View>

            <Button variant="accent" style={styles.resetButton} onPress={handleSubmit}>
              <Send width={24} height={24} color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={styles.resetButtonText}>Send Reset Link</Text>
            </Button>
          </View>
        ) : (
          <View style={styles.successContainer}>
            <IconBubble variant="primary" size="large" style={styles.successIcon}>
              <Mail width={32} height={32} color="#000000" />
            </IconBubble>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successDescription}>
              We've sent a password reset link to <Text style={styles.emailHighlight}>{email}</Text>. Please check your
              inbox.
            </Text>
            <Text style={styles.helpText}>
              Didn't receive an email? Check your spam folder or{" "}
              <Text style={[styles.tryAgainText, { color: theme.accent }]} onPress={() => setSubmitted(false)}>
                try again
              </Text>
              .
            </Text>
          </View>
        )}
      </View>

      <View style={styles.backContainer}>
        <Button variant="secondary" style={styles.backButton} onPress={() => navigation.navigate("Login")}>
          <ArrowLeft width={20} height={20} color="#000000" style={{ marginRight: 8 }} />
          <Text style={styles.backButtonText}>Back to Login</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontFamily: "Fredoka-Regular",
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 16,
    color: "#000000",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "#000000",
    padding: 24,
    marginBottom: 24,
  },
  description: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    marginBottom: 24,
    color: "#000000",
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#000000",
  },
  resetButton: {
    height: 56,
  },
  resetButtonText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  successContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "#000000",
    padding: 24,
    alignItems: "center",
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000000",
  },
  successDescription: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    color: "#000000",
  },
  emailHighlight: {
    fontWeight: "700",
  },
  helpText: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    textAlign: "center",
    color: "#666666",
  },
  tryAgainText: {
    fontWeight: "700",
  },
  backContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  backButton: {
    paddingHorizontal: 24,
  },
  backButtonText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
})
