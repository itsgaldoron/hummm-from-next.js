import { useState } from "react"
import { View, Text, StyleSheet, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft, Bell, Moon, Sun, Volume2 } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"
import { BackgroundShapes } from "../components/BackgroundShapes"
import { BackgroundMusicElements } from "../components/BackgroundMusicElements"
import { Toast } from "../components/Toast"
import { IconBubble } from "../components/ui/IconBubble"
import { Card } from "../components/ui/Card"

export default function SettingsScreen({ navigation }) {
  const { theme, toggleTheme, isDark } = useTheme()
  const [showToast, setShowToast] = useState(false)
  const [settings, setSettings] = useState({
    darkMode: isDark,
    notifications: true,
    soundEffects: true,
  })

  const handleToggle = (setting) => {
    if (setting === "darkMode") {
      toggleTheme()
    }

    setSettings({
      ...settings,
      [setting]: !settings[setting],
    })
    setShowToast(true)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {showToast && <Toast message="Settings updated!" type="success" onClose={() => setShowToast(false)} />}

      <BackgroundShapes />
      <BackgroundMusicElements />

      <View style={styles.header}>
        <IconBubble variant="white" size="small" onPress={() => navigation.goBack()}>
          <ArrowLeft width={24} height={24} color="#000000" />
        </IconBubble>
        <Text style={styles.title}>Settings</Text>
      </View>

      <Card variant="white" style={styles.settingsCard}>
        <View style={styles.settingsContent}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconBubble variant="secondary" size="small" style={styles.settingIcon}>
                {settings.darkMode ? (
                  <Moon width={20} height={20} color="#000000" />
                ) : (
                  <Sun width={20} height={20} color="#000000" />
                )}
              </IconBubble>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingDescription}>Switch between light and dark theme</Text>
              </View>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={() => handleToggle("darkMode")}
              trackColor={{ false: "#e5e5e5", true: theme.accent }}
              thumbColor="#ffffff"
              ios_backgroundColor="#e5e5e5"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconBubble variant="secondary" size="small" style={styles.settingIcon}>
                <Bell width={20} height={20} color="#000000" />
              </IconBubble>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingDescription}>Get notified about game updates</Text>
              </View>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={() => handleToggle("notifications")}
              trackColor={{ false: "#e5e5e5", true: theme.accent }}
              thumbColor="#ffffff"
              ios_backgroundColor="#e5e5e5"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconBubble variant="secondary" size="small" style={styles.settingIcon}>
                <Volume2 width={20} height={20} color="#000000" />
              </IconBubble>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Sound Effects</Text>
                <Text style={styles.settingDescription}>Play sounds during gameplay</Text>
              </View>
            </View>
            <Switch
              value={settings.soundEffects}
              onValueChange={() => handleToggle("soundEffects")}
              trackColor={{ false: "#e5e5e5", true: theme.accent }}
              thumbColor="#ffffff"
              ios_backgroundColor="#e5e5e5"
            />
          </View>
        </View>
      </Card>

      <Card variant="white" style={styles.aboutCard}>
        <View style={styles.aboutContent}>
          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.aboutVersion}>Humming Game v1.0.0</Text>
          <Text style={styles.aboutDescription}>
            A fun social music game where players challenge each other to guess songs by humming.
          </Text>
          <View style={styles.linksContainer}>
            <Text style={[styles.link, { color: theme.accent }]} onPress={() => {}}>
              Terms of Service
            </Text>
            <Text style={styles.separator}>•</Text>
            <Text style={[styles.link, { color: theme.accent }]} onPress={() => {}}>
              Privacy Policy
            </Text>
          </View>
        </View>
      </Card>
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
  settingsCard: {
    marginBottom: 24,
  },
  settingsContent: {
    padding: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  settingDescription: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#666666",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e5e5",
  },
  aboutCard: {
    flex: 1,
  },
  aboutContent: {
    padding: 16,
  },
  aboutTitle: {
    fontFamily: "Fredoka-Regular",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000000",
  },
  aboutVersion: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    marginBottom: 8,
    color: "#666666",
  },
  aboutDescription: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    marginBottom: 16,
    color: "#000000",
  },
  linksContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    fontWeight: "500",
  },
  separator: {
    marginHorizontal: 8,
    color: "#666666",
  },
})
