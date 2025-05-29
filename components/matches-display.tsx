"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MatchCard } from "@/components/match-card"
import { MatchesLoading } from "@/components/matches-loading"
import { getLeagueInfo } from "@/lib/leagues"
import { groupMatchesByDate } from "@/lib/utils"
import type { Match } from "@/lib/types"
import { Calendar, Clock, CalendarDays } from "lucide-react"

interface MatchesDisplayProps {
  leagueId: string
}

export function MatchesDisplay({ leagueId }: MatchesDisplayProps) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const leagueInfo = getLeagueInfo(leagueId)

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/matches/${leagueId}`)
        const data = await response.json()

        if (response.ok) {
          setMatches(data.matches || [])
        } else {
          setError(data.error || "Failed to fetch matches")
        }
      } catch (err) {
        setError("Network error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [leagueId])

  const groupedMatches = groupMatchesByDate(matches)
  const today = new Date().toISOString().split("T")[0]
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  const todayMatches = groupedMatches[today] || []
  const tomorrowMatches = groupedMatches[tomorrow] || []
  const upcomingMatches = Object.entries(groupedMatches)
    .filter(([date]) => date !== today && date !== tomorrow)
    .flatMap(([, matches]) => matches)

  if (loading) {
    return <MatchesLoading />
  }

  return (
    <Card className="bg-gray-800/30 border-green-700/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-xl">{leagueInfo?.name || "League"} Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-700/50">
            <TabsTrigger
              value="today"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <Clock className="w-4 h-4 mr-2" />
              Today
            </TabsTrigger>
            <TabsTrigger
              value="tomorrow"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Tomorrow
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Next 7 Days
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-6">
            {todayMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todayMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                No matches found for today. Try selecting a different time frame.
              </div>
            )}
          </TabsContent>

          <TabsContent value="tomorrow" className="mt-6">
            {tomorrowMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tomorrowMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                No matches found for tomorrow. Try selecting a different time frame.
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                No matches found for this time period. Try selecting a different time frame.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
