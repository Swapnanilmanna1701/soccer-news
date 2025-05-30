import type { Match } from "./types"

// Real-time polling intervals
const LIVE_MATCH_INTERVAL = 15000 // 15 seconds for live matches
const SCHEDULED_MATCH_INTERVAL = 60000 // 1 minute for scheduled matches

// Store for active subscriptions
const subscriptions = new Map<
  string,
  {
    callback: (matches: Match[]) => void
    interval: NodeJS.Timeout
    lastUpdate: Date
  }
>()

// Start real-time updates for a specific league
export function startEnhancedRealtime(leagueId: string, callback: (matches: Match[]) => void) {
  // Stop existing subscription if any
  stopEnhancedRealtime(leagueId)

  // Determine polling interval based on whether there are live matches
  const pollMatches = async () => {
    try {
      const response = await fetch(`/api/matches/${leagueId}?t=${Date.now()}`)
      if (response.ok) {
        const data = await response.json()
        const matches = data.matches || []

        // Check if there are any live matches
        const hasLiveMatches = matches.some((match: Match) => match.status === "IN_PLAY" || match.status === "PAUSED")

        // Update callback
        callback(matches)

        // Adjust polling interval based on live matches
        const currentInterval = hasLiveMatches ? LIVE_MATCH_INTERVAL : SCHEDULED_MATCH_INTERVAL
        const subscription = subscriptions.get(leagueId)

        if (subscription && subscription.interval._idleTimeout !== currentInterval) {
          // Restart with new interval if needed
          clearInterval(subscription.interval)
          const newInterval = setInterval(pollMatches, currentInterval)
          subscriptions.set(leagueId, {
            ...subscription,
            interval: newInterval,
            lastUpdate: new Date(),
          })
        }

        console.log(
          `Updated matches for ${leagueId}: ${matches.length} matches, ${hasLiveMatches ? "live" : "scheduled"} mode`,
        )
      }
    } catch (error) {
      console.error(`Error polling matches for ${leagueId}:`, error)
    }
  }

  // Start polling
  const interval = setInterval(pollMatches, SCHEDULED_MATCH_INTERVAL)

  // Store subscription
  subscriptions.set(leagueId, {
    callback,
    interval,
    lastUpdate: new Date(),
  })

  // Initial fetch
  pollMatches()
}

// Stop real-time updates for a specific league
export function stopEnhancedRealtime(leagueId: string) {
  const subscription = subscriptions.get(leagueId)
  if (subscription) {
    clearInterval(subscription.interval)
    subscriptions.delete(leagueId)
    console.log(`Stopped real-time updates for ${leagueId}`)
  }
}

// Stop all real-time updates
export function stopAllRealtime() {
  subscriptions.forEach((subscription, leagueId) => {
    clearInterval(subscription.interval)
    console.log(`Stopped real-time updates for ${leagueId}`)
  })
  subscriptions.clear()
}

// Get subscription status
export function getRealtimeStatus(leagueId: string) {
  const subscription = subscriptions.get(leagueId)
  return subscription
    ? {
        active: true,
        lastUpdate: subscription.lastUpdate,
      }
    : {
        active: false,
        lastUpdate: null,
      }
}
