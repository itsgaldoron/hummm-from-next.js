import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native"
import { useTheme } from "../../context/ThemeContext"

export const Input = ({ style, inputStyle, leftIcon, rightIcon, ...props }) => {
  const { theme } = useTheme()

  return (
    <View style={[styles.container, style]}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: "#ffffff",
            color: theme.foreground,
            paddingLeft: leftIcon ? 48 : 16,
            paddingRight: rightIcon ? 48 : 16,
          },
          inputStyle,
        ]}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  input: {
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: "#000000",
    paddingVertical: 12,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
  },
  leftIcon: {
    position: "absolute",
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
  },
  rightIcon: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
  },
})
