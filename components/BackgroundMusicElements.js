import React from "react";
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"
import AnimatedMusicNote from './AnimatedMusicNote';

export const BackgroundMusicElements = () => {
  // const { theme } = useTheme(); // Theme might be used in AnimatedMusicNote now

  // Define notes configuration
  const notes = [
    { delay: 0,    initialTop: '10%', initialLeft: '10%', char: '♪' },
    { delay: 500,  initialTop: '20%', initialLeft: '85%', char: '♫' }, // Adjusted left for right: '15%'
    { delay: 1000, initialTop: '40%', initialLeft: '5%',  char: '♩' },
    { delay: 1500, initialTop: '60%', initialLeft: '90%', char: '♬' }, // Adjusted left for right: '10%'
    { delay: 2000, initialTop: '75%', initialLeft: '20%', char: '♪' },
    { delay: 2500, initialTop: '85%', initialLeft: '75%', char: '♫' }, // Adjusted left for right: '25%'
  ];

  return (
    <View style={styles.container}>
      {notes.map((note, index) => (
        <AnimatedMusicNote
          key={index}
          delay={note.delay}
          initialTop={note.initialTop}
          initialLeft={note.initialLeft}
          noteCharacter={note.char}
        />
      ))}
      <Text style={styles.musicClef}>𝄞</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: -1,
  },
  musicClef: {
    position: "absolute",
    bottom: "10%",
    left: "5%",
    fontSize: 60,
    opacity: 0.1,
    transform: [{ rotate: "-15deg" }],
  },
})
