import type { Match } from "./types"

const API_BASE_URL = "https://api.football-data.org/v4"

export async function getMatchesByLeague(leagueId: string): Promise<Match[]> {
  try {
    const apiKey = process.env.FOOTBALL_API_KEY

    if (!apiKey) {
      console.error("Football API key is not defined")
      throw new Error("Football API key is not configured")
    }

    // Get current date and next 14 days for better data coverage
    const today = new Date()
    const futureDate = new Date()
    futureDate.setDate(today.getDate() + 14)

    // Format dates as YYYY-MM-DD
    const dateFrom = today.toISOString().split("T")[0]
    const dateTo = futureDate.toISOString().split("T")[0]

    console.log(`Fetching matches for league ${leagueId} from ${dateFrom} to ${dateTo}`)

    // Special handling for different leagues
    let apiUrl: string
    const headers = {
      "X-Auth-Token": apiKey,
      "Content-Type": "application/json",
    }

    // Try specific league endpoint first
    if (leagueId === "SPL") {
      // For Saudi Pro League, we need to use a different approach
      apiUrl = `${API_BASE_URL}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`
    } else {
      // For major European leagues
      apiUrl = `${API_BASE_URL}/competitions/${leagueId}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}&status=SCHEDULED,TIMED,IN_PLAY,PAUSED,FINISHED`
    }

    console.log(`API URL: ${apiUrl}`)

    const response = await fetch(apiUrl, {
      headers,
      next: { revalidate: 60 }, // Revalidate every minute for real-time data
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`)

      // If specific league fails, try general matches endpoint
      const fallbackUrl = `${API_BASE_URL}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`
      console.log(`Trying fallback URL: ${fallbackUrl}`)

      const fallbackResponse = await fetch(fallbackUrl, {
        headers,
        next: { revalidate: 60 },
      })

      if (!fallbackResponse.ok) {
        throw new Error(`Failed to fetch matches: ${fallbackResponse.status} ${fallbackResponse.statusText}`)
      }

      const fallbackData = await fallbackResponse.json()
      console.log(`Fallback response:`, fallbackData)

      // Filter matches by competition code
      const filteredMatches =
        fallbackData.matches?.filter((match: any) => {
          if (leagueId === "SPL") {
            return match.competition?.name?.toLowerCase().includes("saudi") || match.competition?.code === "SPL"
          }
          return match.competition?.code === leagueId
        }) || []

      return mapMatchesToFormat(filteredMatches)
    }

    const data = await response.json()
    console.log(`API Response for ${leagueId}:`, {
      matchCount: data.matches?.length || 0,
      competition: data.competition?.name,
      filters: data.filters,
    })

    if (!data.matches || data.matches.length === 0) {
      console.log(`No matches found for ${leagueId}`)
      return []
    }

    return mapMatchesToFormat(data.matches)
  } catch (error) {
    console.error("Error fetching matches:", error)
    return []
  }
}

// Helper function to map API response to our format
function mapMatchesToFormat(matches: any[]): Match[] {
  return matches.map((match: any) => ({
    id: match.id,
    status: match.status,
    utcDate: match.utcDate,
    homeTeam: {
      id: match.homeTeam.id,
      name: match.homeTeam.name,
      shortName: match.homeTeam.shortName || match.homeTeam.tla || match.homeTeam.name,
    },
    awayTeam: {
      id: match.awayTeam.id,
      name: match.awayTeam.name,
      shortName: match.awayTeam.shortName || match.awayTeam.tla || match.awayTeam.name,
    },
    competition: match.competition?.name || "Unknown Competition",
    score: match.score
      ? {
          home: match.score.fullTime?.home || match.score.halfTime?.home || null,
          away: match.score.fullTime?.away || match.score.halfTime?.away || null,
        }
      : null,
  }))
}

// Get live matches (currently playing)
export async function getLiveMatches(): Promise<Match[]> {
  try {
    const apiKey = process.env.FOOTBALL_API_KEY
    if (!apiKey) {
      throw new Error("Football API key is not configured")
    }

    const response = await fetch(`${API_BASE_URL}/matches?status=IN_PLAY,PAUSED`, {
      headers: {
        "X-Auth-Token": apiKey,
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 }, // Revalidate every 30 seconds for live matches
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch live matches: ${response.status}`)
    }

    const data = await response.json()
    return mapMatchesToFormat(data.matches || [])
  } catch (error) {
    console.error("Error fetching live matches:", error)
    return []
  }
}
