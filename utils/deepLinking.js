import * as Notifications from "expo-notifications"

// Define deep link prefixes
const APP_SCHEME = "humminggame://"
const WEB_URL = "https://humminggame.app"

// Parse deep link URL
export const parseDeepLink = (url) => {
  if (!url) return null

  // Remove the scheme/domain part
  let path
  if (url.startsWith(APP_SCHEME)) {
    path = url.substring(APP_SCHEME.length)
  } else if (url.startsWith(WEB_URL)) {
    path = url.substring(WEB_URL.length)
    if (path.startsWith("/")) {
      path = path.substring(1)
    }
  } else {
    return null
  }

  // Parse the path
  const parts = path.split("/")

  // Handle different deep link types
  if (parts[0] === "challenge" && parts.length > 1) {
    return {
      type: "challenge",
      id: parts[1],
      params: parseQueryParams(url),
    }
  } else if (parts[0] === "game" && parts.length > 1) {
    return {
      type: "game",
      id: parts[1],
      params: parseQueryParams(url),
    }
  } else if (parts[0] === "profile" && parts.length > 1) {
    return {
      type: "profile",
      id: parts[1],
      params: parseQueryParams(url),
    }
  } else if (parts[0] === "daily-challenge") {
    return {
      type: "daily-challenge",
      params: parseQueryParams(url),
    }
  } else {
    return {
      type: "unknown",
      path,
      params: parseQueryParams(url),
    }
  }
}

// Parse query parameters from URL
const parseQueryParams = (url) => {
  const params = {}
  const queryIndex = url.indexOf("?")

  if (queryIndex !== -1) {
    const queryString = url.substring(queryIndex + 1)
    const pairs = queryString.split("&")

    for (const pair of pairs) {
      const [key, value] = pair.split("=")
      if (key) {
        // Ensure key exists before adding to params
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : ""
      }
    }
  }

  return params
}

// Create a deep link URL
export const createDeepLink = (type, id = null, params = {}) => {
  let path

  switch (type) {
    case "challenge":
      path = `challenge/${id}`
      break

    case "game":
      path = `game/${id}`
      break

    case "profile":
      path = `profile/${id}`
      break

    case "daily-challenge":
      path = "daily-challenge"
      break

    default:
      return null
  }

  // Add query parameters
  const queryParams = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null) // Filter out undefined/null values
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&")

  const queryString = queryParams ? `?${queryParams}` : ""

  return `${APP_SCHEME}${path}${queryString}`
}

// Handle notification deep links
export const setupNotificationHandler = (navigation) => {
  try {
    const notificationSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const { data } = response.notification.request.content

      if (data && data.screen) {
        // Handle navigation based on the notification data
        switch (data.screen) {
          case "Game":
            navigation.navigate("Home", {
              screen: "Game",
              params: data.params || {},
            })
            break
          case "DailyChallenge":
            navigation.navigate("Home", {
              screen: "DailyChallenge",
              params: data.params || {},
            })
            break
          default:
            // Try to navigate directly to the screen if it exists
            try {
              navigation.navigate(data.screen, data.params || {})
            } catch (error) {
              console.error(`Error navigating to ${data.screen}:`, error)
            }
        }
      }
    })

    return notificationSubscription
  } catch (error) {
    console.error("Error setting up notification handler:", error)
    return { remove: () => {} } // Return a dummy object with remove method
  }
}
