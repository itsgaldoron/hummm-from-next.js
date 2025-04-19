import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Music, User, UserPlus } from "react-native-feather"
import { useTheme } from "../../context/ThemeContext"
import { BackgroundShapes } from "../../components/BackgroundShapes"
import { BackgroundMusicElements } from "../../components/BackgroundMusicElements"
import { Toast } from "../../components/Toast"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { IconBubble } from "../../components/ui/IconBubble"

export default function RegisterScreen({ navigation }) {
  const { theme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    // Mock validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    setShowToast(true)

    // Mock registration - in a real app this would create an account
    setTimeout(() => {
      navigation.navigate("Main")
    }, 1500)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {showToast && (
        <Toast message="Account created successfully!" type="success" onClose={() => setShowToast(false)} />
      )}

      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.navigate("Login")}>
          <ArrowLeft width={24} height={24} color="#000000" />
        </IconBubble>
        <Text style={styles.title}>Create Account</Text>
      </View>

      <View style={styles.logoContainer}>
        <IconBubble variant="primary" size="large" style={styles.logoIcon}>
          <Music width={32} height={32} color="#000000" />
        </IconBubble>
        <Text style={styles.logoSubtitle}>Join the Humming Game community</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Username</Text>
          <Input
            placeholder="Choose a username"
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
            leftIcon={<User width={20} height={20} color="#9ca3af" />}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <Input
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            leftIcon={<Mail width={20} height={20} color="#9ca3af" />}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <Input
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={!showPassword}
            leftIcon={<Lock width={20} height={20} color="#9ca3af" />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff width={20} height={20} color="#9ca3af" />
                ) : (
                  <Eye width={20} height={20} color="#9ca3af" />
                )}
              </TouchableOpacity>
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <Input
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry={!showConfirmPassword}
            leftIcon={<Lock width={20} height={20} color="#9ca3af" />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff width={20} height={20} color="#9ca3af" />
                ) : (
                  <Eye width={20} height={20} color="#9ca3af" />
                )}
              </TouchableOpacity>
            }
          />
        </View>

        <Button variant="accent" style={styles.registerButton} onPress={handleSubmit}>
          <UserPlus width={24} height={24} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.registerButtonText}>Create Account</Text>
        </Button>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Button variant="secondary" style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
          <User width={20} height={20} color="#000000" style={{ marginRight: 8 }} />
          <Text style={styles.loginButtonText}>Sign In</Text>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoIcon: {
    marginBottom: 16,
  },
  logoSubtitle: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    color: "#000000",
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#000000",
  },
  registerButton: {
    height: 56,
    marginTop: 8,
  },
  registerButtonText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  loginContainer: {
    alignItems: "center",
  },
  loginText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    marginBottom: 16,
    color: "#000000",
  },
  loginButton: {
    paddingHorizontal: 24,
  },
  loginButtonText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
})
