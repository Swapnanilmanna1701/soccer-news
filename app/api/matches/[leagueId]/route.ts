import { type NextRequest, NextResponse } from "next/server"
import { getMatchesByLeague } from "@/lib/api"

export async function GET(request: NextRequest, { params }: { params: { leagueId: string } }) {
  try {
    const { leagueId } = params
    const matches = await getMatchesByLeague(leagueId)

    return NextResponse.json({
      matches,
      count: matches.length,
      leagueId,
    })
  } catch (error) {
    console.error("API Route Error:", error)
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 })
  }
}
