import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withRepeat, withTiming, withDelay } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext'; // Optional: if color depends on theme

const AnimatedMusicNote = ({ delay, initialTop, initialLeft, noteCharacter }) => {
  // const { theme } = useTheme(); // Use if note color should adapt to theme

  // Call hook at the top level
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withRepeat(withDelay(delay, withTiming(-20, { duration: 2000 })), -1, true),
        },
        {
          rotate: withRepeat(withDelay(delay, withTiming('10deg', { duration: 2000 })), -1, true),
        },
      ],
      // You might want to move opacity animation here too if needed
      // opacity: withRepeat(withDelay(delay, withTiming(0.2, { duration: 2000 })), -1, true), // Example
    };
  });

  return (
    <Animated.Text
      style={[
        styles.musicNote,
        { top: initialTop, left: initialLeft, color: '#000000' /* Or theme.someColor */ },
        animatedStyle, // Apply the animated style
      ]}
    >
      {noteCharacter}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  musicNote: {
    position: 'absolute',
    fontSize: 30,
    opacity: 0.2, // Keep base opacity here
    // Color is set inline based on theme or default
  },
});

export default AnimatedMusicNote; 