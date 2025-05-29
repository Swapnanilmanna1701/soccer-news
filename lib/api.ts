import type { Match } from "./types"

const API_BASE_URL = "https://api.football-data.org/v4"

export async function getMatchesByLeague(leagueId: string): Promise<Match[]> {
  try {
    const apiKey = process.env.FOOTBALL_API_KEY

    if (!apiKey) {
      throw new Error("Football API key is not defined")
    }

    // Get current date and next 7 days
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)

    // Format dates as YYYY-MM-DD
    const dateFrom = today.toISOString().split("T")[0]
    const dateTo = nextWeek.toISOString().split("T")[0]

    console.log(`Fetching matches for league ${leagueId} from ${dateFrom} to ${dateTo}`)

    // For Saudi Pro League, we'll try to get all matches and filter
    if (leagueId === "SPL") {
      const allMatchesResponse = await fetch(`${API_BASE_URL}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
        headers: {
          "X-Auth-Token": apiKey,
        },
        next: { revalidate: 300 },
      })

      if (!allMatchesResponse.ok) {
        throw new Error(`Failed to fetch matches: ${allMatchesResponse.status}`)
      }

      const allData = await allMatchesResponse.json()

      // Filter for Saudi matches (this might need adjustment based on actual API response)
      const saudiMatches = allData.matches.filter(
        (match: any) => match.competition.name?.toLowerCase().includes("saudi") || match.competition.code === "SPL",
      )

      return saudiMatches.map((match: any) => ({
        id: match.id,
        status: match.status,
        utcDate: match.utcDate,
        homeTeam: {
          id: match.homeTeam.id,
          name: match.homeTeam.name,
          shortName: match.homeTeam.shortName || match.homeTeam.tla,
        },
        awayTeam: {
          id: match.awayTeam.id,
          name: match.awayTeam.name,
          shortName: match.awayTeam.shortName || match.awayTeam.tla,
        },
        competition: match.competition.name,
      }))
    }

    const response = await fetch(
      `${API_BASE_URL}/competitions/${leagueId}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: {
          "X-Auth-Token": apiKey,
        },
        next: { revalidate: 300 },
      },
    )

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`)

      // Fallback to all matches
      const allMatchesResponse = await fetch(`${API_BASE_URL}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
        headers: {
          "X-Auth-Token": apiKey,
        },
        next: { revalidate: 300 },
      })

      if (!allMatchesResponse.ok) {
        throw new Error(`Failed to fetch matches: ${allMatchesResponse.status}`)
      }

      const allData = await allMatchesResponse.json()
      const filteredMatches = allData.matches.filter((match: any) => match.competition.code === leagueId)

      return filteredMatches.map((match: any) => ({
        id: match.id,
        status: match.status,
        utcDate: match.utcDate,
        homeTeam: {
          id: match.homeTeam.id,
          name: match.homeTeam.name,
          shortName: match.homeTeam.shortName || match.homeTeam.tla,
        },
        awayTeam: {
          id: match.awayTeam.id,
          name: match.awayTeam.name,
          shortName: match.awayTeam.shortName || match.awayTeam.tla,
        },
        competition: match.competition.name,
      }))
    }

    const data = await response.json()
    console.log(`Found ${data.matches?.length || 0} matches for ${leagueId}`)

    if (!data.matches || data.matches.length === 0) {
      return []
    }

    return data.matches.map((match: any) => ({
      id: match.id,
      status: match.status,
      utcDate: match.utcDate,
      homeTeam: {
        id: match.homeTeam.id,
        name: match.homeTeam.name,
        shortName: match.homeTeam.shortName || match.homeTeam.tla,
      },
      awayTeam: {
        id: match.awayTeam.id,
        name: match.awayTeam.name,
        shortName: match.awayTeam.shortName || match.awayTeam.tla,
      },
      competition: data.competition?.name || "Unknown Competition",
    }))
  } catch (error) {
    console.error("Error fetching matches:", error)
    return []
  }
}
