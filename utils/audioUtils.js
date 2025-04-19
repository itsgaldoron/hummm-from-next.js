import { Audio } from "expo-av"
import * as FileSystem from "expo-file-system"

// Request microphone permissions
export const requestMicrophonePermissions = async () => {
  const { status } = await Audio.requestPermissionsAsync()
  return status === "granted"
}

// Configure audio mode for recording
export const configureAudioForRecording = async () => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
    staysActiveInBackground: true,
  })
}

// Configure audio mode for playback
export const configureAudioForPlayback = async () => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
    staysActiveInBackground: true,
  })
}

// Start recording with metering
export const startRecording = async () => {
  await configureAudioForRecording()

  const options = {
    ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
    android: {
      ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
      extension: ".m4a",
      outputFormat: Audio.AndroidOutputFormat.MPEG_4,
      audioEncoder: Audio.AndroidAudioEncoder.AAC,
    },
    ios: {
      ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
      extension: ".m4a",
      outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
      audioQuality: Audio.IOSAudioQuality.MAX,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: "audio/webm",
      bitsPerSecond: 128000,
    },
  }

  const recording = new Audio.Recording()
  await recording.prepareToRecordAsync(options)
  await recording.startAsync()

  // Enable metering for visualization
  recording.setOnRecordingStatusUpdate((status) => {
    if (status.metering !== undefined && status.isRecording) {
      // status.metering contains the current input level in dB
      // You can use this for audio visualization
      // console.log('Metering:', status.metering)
    }
  })

  return recording
}

// Stop recording and get the sound object
export const stopRecording = async (recording) => {
  if (!recording) return null

  await recording.stopAndUnloadAsync()
  const uri = recording.getURI()

  await configureAudioForPlayback()
  const { sound } = await Audio.Sound.createAsync({ uri })

  return { sound, uri }
}

// Play sound
export const playSound = async (sound) => {
  if (!sound) return

  await configureAudioForPlayback()
  await sound.playAsync()
}

// Pause sound
export const pauseSound = async (sound) => {
  if (!sound) return

  await sound.pauseAsync()
}

// Unload sound
export const unloadSound = async (sound) => {
  if (!sound) return

  await sound.unloadAsync()
}

// Get audio file duration
export const getAudioDuration = async (uri) => {
  try {
    const { sound } = await Audio.Sound.createAsync({ uri })
    const status = await sound.getStatusAsync()
    await sound.unloadAsync()
    return status.durationMillis / 1000 // Return duration in seconds
  } catch (error) {
    console.error("Error getting audio duration:", error)
    return 0
  }
}

// Save recording to app's documents directory with a custom name
export const saveRecording = async (uri, filename) => {
  try {
    const documentsDirectory = FileSystem.documentDirectory
    const newUri = `${documentsDirectory}${filename}`

    await FileSystem.copyAsync({
      from: uri,
      to: newUri,
    })

    return newUri
  } catch (error) {
    console.error("Error saving recording:", error)
    return null
  }
}

// List all saved recordings
export const listRecordings = async () => {
  try {
    const documentsDirectory = FileSystem.documentDirectory
    const files = await FileSystem.readDirectoryAsync(documentsDirectory)
    return files.filter((file) => file.endsWith(".m4a") || file.endsWith(".mp3"))
  } catch (error) {
    console.error("Error listing recordings:", error)
    return []
  }
}

// Delete a recording
export const deleteRecording = async (uri) => {
  try {
    await FileSystem.deleteAsync(uri)
    return true
  } catch (error) {
    console.error("Error deleting recording:", error)
    return false
  }
}

// Get waveform data from audio file (simplified version)
export const getWaveformData = async (uri, samples = 100) => {
  // This is a simplified version that returns random data
  // In a real app, you would use a library like react-native-audio-toolkit
  // or process the audio file on a server

  const waveform = []
  for (let i = 0; i < samples; i++) {
    waveform.push(Math.random())
  }

  return waveform
}
