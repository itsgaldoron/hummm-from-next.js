import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from 'react-native'
import { CheckCircle, AlertCircle, X } from "lucide-react-native"

interface ToastProps {
  message: string
  type: "success" | "error"
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  return (
    <View className="toast-container">
      <View className={`toast toast-${type}`}>
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-500" />
        )}
        <Text className="flex-1">{message}</Text>
        <TouchableOpacity onPress={() => setVisible(false)} className="text-gray-500 hover:text-black">
          <X className="h-4 w-4" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
