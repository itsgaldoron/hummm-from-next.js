import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Camera, Save } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { Toast } from "../components/Toast"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"
import { Avatar } from "../components/ui/Avatar"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"

export default function EditProfileScreen({ navigation }) {
  const { theme } = useTheme()
  const [showToast, setShowToast] = useState(false)

  // Mock user data
  const [user, setUser] = useState({
    name: "Alex Johnson",
    username: "alexj",
    email: "alex@example.com",
    avatarUrl: null,
  })

  const handleChange = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    })
  }

  const handleSave = () => {
    setShowToast(true)
    setTimeout(() => {
      navigation.goBack()
    }, 1500)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {showToast && (
        <Toast message="Profile updated successfully!" type="success" onClose={() => setShowToast(false)} />
      )}

      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.goBack()}>
          <ArrowLeft width={24} height={24} color="#000000" />
        </IconBubble>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <Card variant="white" style={styles.profileCard}>
        <View style={styles.profileContent}>
          <View style={styles.avatarContainer}>
            <Avatar name={user.name} size="large" style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera width={20} height={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <Input value={user.name} onChangeText={(text) => handleChange("name", text)} style={styles.input} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <Input
                value={user.username}
                onChangeText={(text) => handleChange("username", text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <Input
                value={user.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
          </View>
        </View>
      </Card>

      <Button variant="accent" style={styles.saveButton} onPress={handleSave}>
        <Save width={24} height={24} color="#ffffff" style={{ marginRight: 8 }} />
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </Button>
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
  profileCard: {
    flex: 1,
    marginBottom: 24,
  },
  profileContent: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  avatar: {
    marginBottom: 8,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: "#FF5757",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  form: {
    gap: 16,
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
  input: {
    marginBottom: 0,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
})
