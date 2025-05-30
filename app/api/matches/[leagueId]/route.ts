import { type NextRequest, NextResponse } from "next/server"
import { getMatchesByLeague, getLiveMatches } from "@/lib/api"

export const dynamic = "force-dynamic"
export const revalidate = 0 // No caching for real-time data

export async function GET(request: NextRequest, { params }: { params: { leagueId: string } }) {
  try {
    const { leagueId } = params
    const url = new URL(request.url)
    const isLiveOnly = url.searchParams.get("live") === "true"

    console.log(`API request for league: ${leagueId}, live only: ${isLiveOnly}`)

    let matches
    if (isLiveOnly) {
      // Get only live matches
      const allLiveMatches = await getLiveMatches()
      matches = allLiveMatches.filter((match) => {
        if (leagueId === "SPL") {
          return match.competition?.toLowerCase().includes("saudi")
        }
        return true // For now, return all live matches regardless of league
      })
    } else {
      // Get all matches for the league
      matches = await getMatchesByLeague(leagueId)
    }

    const response = {
      matches,
      count: matches.length,
      leagueId,
      timestamp: new Date().toISOString(),
      hasLiveMatches: matches.some((match) => match.status === "IN_PLAY" || match.status === "PAUSED"),
      liveCount: matches.filter((match) => match.status === "IN_PLAY" || match.status === "PAUSED").length,
    }

    console.log(`Returning ${matches.length} matches for ${leagueId}, ${response.liveCount} live`)

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("API Route Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch matches",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
