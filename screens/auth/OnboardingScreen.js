import { useState, useRef } from "react"
import { View, Text, StyleSheet, FlatList, Animated, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../../context/ThemeContext"
import { Button } from "../../components/ui/Button"
import { useResponsiveSize } from "../../hooks/useResponsiveSize"

const { width } = Dimensions.get("window")

export default function OnboardingScreen({ navigation }) {
  const { theme } = useTheme()
  const { size, fontSize } = useResponsiveSize()
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef(null)

  const slides = [
    {
      id: "1",
      title: "Welcome to Humming Game",
      description: "Challenge your friends to guess songs by humming them!",
      icon: "icon_placeholder_1",
    },
    {
      id: "2",
      title: "Record Your Humming",
      description: "Record yourself humming your favorite songs and challenge friends to guess them.",
      icon: "icon_placeholder_2",
    },
    {
      id: "3",
      title: "Connect with Friends",
      description: "Add friends and challenge them to guess your humming recordings.",
      icon: "icon_placeholder_3",
    },
    {
      id: "4",
      title: "Earn Achievements",
      description: "Complete challenges and earn achievements to show off your skills.",
      icon: "icon_placeholder_4",
    },
  ]

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
    } else {
      navigation.replace("Login")
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width }]}>
              <View style={styles.iconContainer}><Text>Icon Placeholder Text: {item.icon}</Text></View>
              <Text style={[styles.title, { color: theme.foreground, fontSize: fontSize(28) }]}>{item.title}</Text>
              <Text style={[styles.description, { color: theme.foreground, fontSize: fontSize(16) }]}>
                {item.description}
              </Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: "clamp",
            })

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            })

            return (
              <Animated.View
                key={index}
                style={[
                  styles.indicator,
                  {
                    width: dotWidth,
                    opacity,
                    backgroundColor: theme.accent,
                  },
                ]}
              />
            )
          })}
        </View>

        <View style={styles.buttonContainer}>
          <Button variant="accent" style={styles.button} onPress={scrollTo}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Button>

          {currentIndex < slides.length - 1 && (
            <Text
              style={[styles.skipText, { color: theme.mutedForeground }]}
              onPress={() => navigation.replace("Login")}
            >
              Skip
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 3,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  iconContainer: {
    marginBottom: 40,
  },
  title: {
    fontFamily: "Fredoka-Bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontFamily: "Rubik-Regular",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  indicator: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 16,
  },
  skipText: {
    fontFamily: "Rubik-Medium",
    textAlign: "center",
    padding: 10,
  },
})
