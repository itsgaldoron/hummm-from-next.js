"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Eye, EyeOff, Lock, LogIn, Music, User } from "react-native-feather"
import { useTheme } from "../../context/ThemeContext"
import { BackgroundShapes } from "../../components/BackgroundShapes"
import { BackgroundMusicElements } from "../../components/BackgroundMusicElements"
import { Toast } from "../../components/Toast"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { IconBubble } from "../../components/ui/IconBubble"
import { useAuth } from "../../context/AuthContext"

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setShowToast(true)
    console.log("Attempting login...");
    
    try {
        await login(formData.username, formData.password);
        console.log("Login function called successfully (mock or real)");
    } catch (error) {
        console.error("Login failed:", error);
        setShowToast(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {showToast && <Toast message="Login successful!" type="success" onClose={() => setShowToast(false)} />}

      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.logoContainer}>
        <IconBubble variant="accent" size="large" style={styles.logoIcon}>
          <Music width={40} height={40} color="#ffffff" />
        </IconBubble>
        <Text style={styles.logoTitle}>Humming Game</Text>
        <Text style={styles.logoSubtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Username</Text>
          <Input
            placeholder="Enter your username"
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
            leftIcon={<User width={20} height={20} color="#9ca3af" />}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <Input
            placeholder="Enter your password"
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

        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={[styles.forgotPasswordText, { color: theme.accent }]}>Forgot password?</Text>
        </TouchableOpacity>

        <Button variant="accent" style={styles.loginButton} onPress={handleSubmit}>
          <LogIn width={24} height={24} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.loginButtonText}>Sign In</Text>
        </Button>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <Button variant="primary" style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
          <User width={20} height={20} color="#000000" style={{ marginRight: 8 }} />
          <Text style={styles.registerButtonText}>Create Account</Text>
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
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logoIcon: {
    marginBottom: 16,
  },
  logoTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
  },
  logoSubtitle: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    color: "#000000",
  },
  formContainer: {
    marginBottom: 32,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    height: 56,
  },
  loginButtonText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  registerContainer: {
    alignItems: "center",
  },
  registerText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    marginBottom: 16,
    color: "#000000",
  },
  registerButton: {
    paddingHorizontal: 24,
  },
  registerButtonText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
})
