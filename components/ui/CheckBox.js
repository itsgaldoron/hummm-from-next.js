import { TouchableOpacity, View, StyleSheet } from "react-native"
import { Check } from "react-native-feather"
import { useTheme } from "../../context/ThemeContext"

export const CheckBox = ({ checked = false, onCheckedChange, disabled = false, style }) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        {
          backgroundColor: checked ? theme.accent : "#ffffff",
          borderColor: checked ? theme.accent : "#000000",
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={() => !disabled && onCheckedChange && onCheckedChange(!checked)}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {checked && <Check width={16} height={16} color="#ffffff" />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
})
