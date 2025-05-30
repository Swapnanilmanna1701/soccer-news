import type { Match } from "./types"

// Polling interval in milliseconds (30 seconds)
const POLLING_INTERVAL = 30000

// Store for callbacks
type MatchUpdateCallback = (matches: Match[]) => void
const subscribers: MatchUpdateCallback[] = []

// Track if polling is active
let isPolling = false
let currentLeagueId: string | null = null

// Start polling for a specific league
export function startRealtimeUpdates(leagueId: string) {
  currentLeagueId = leagueId

  if (!isPolling) {
    isPolling = true
    pollForUpdates()
  }
}

// Stop polling
export function stopRealtimeUpdates() {
  isPolling = false
  currentLeagueId = null
}

// Subscribe to updates
export function subscribeToMatchUpdates(callback: MatchUpdateCallback) {
  subscribers.push(callback)

  // Return unsubscribe function
  return () => {
    const index = subscribers.indexOf(callback)
    if (index !== -1) {
      subscribers.splice(index, 1)
    }
  }
}

// Polling function
async function pollForUpdates() {
  while (isPolling && currentLeagueId) {
    try {
      const response = await fetch(`/api/matches/${currentLeagueId}?t=${Date.now()}`)
      if (response.ok) {
        const data = await response.json()

        // Notify all subscribers
        subscribers.forEach((callback) => callback(data.matches || []))
      }
    } catch (error) {
      console.error("Error polling for match updates:", error)
    }

    // Wait for next poll
    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL))
  }
}
