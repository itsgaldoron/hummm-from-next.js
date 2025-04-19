import { View, Text, StyleSheet } from "react-native"

export const StatusBadge = ({ children, color = "#000000", textColor = "#ffffff", style, textStyle, ...props }) => {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: color,
        },
        style,
      ]}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          style={[
            styles.text,
            {
              color: textColor,
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9999,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "#000000",
  },
  text: {
    fontFamily: "Fredoka-Regular",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
  },
})
