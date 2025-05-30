"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedMatchCard } from "@/components/enhanced-match-card"
import { MatchesLoading } from "@/components/matches-loading"
import { getLeagueInfo } from "@/lib/leagues"
import { groupMatchesByDate } from "@/lib/utils"
import type { Match } from "@/lib/types"
import { Calendar, Clock, CalendarDays, RefreshCw, Radio } from "lucide-react"
import { startEnhancedRealtime, stopEnhancedRealtime } from "@/lib/enhanced-realtime"
import { FloatingFootball } from "@/components/floating-football"
import { InteractiveFootball } from "@/components/interactive-football"

interface MatchesDisplayProps {
  leagueId: string
}

export function MatchesDisplay({ leagueId }: MatchesDisplayProps) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [liveMatchCount, setLiveMatchCount] = useState(0)

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
          setLiveMatchCount(data.liveCount || 0)
          setLastUpdated(new Date())
        } else {
          setError(data.error || "Failed to fetch matches")
        }
      } catch (err) {
        setError("Network error occurred")
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()

    // Start enhanced real-time updates
    startEnhancedRealtime(leagueId, (updatedMatches) => {
      setMatches(updatedMatches)
      setLastUpdated(new Date())
      setLiveMatchCount(updatedMatches.filter((m) => m.status === "IN_PLAY" || m.status === "PAUSED").length)
    })

    return () => {
      stopEnhancedRealtime(leagueId)
    }
  }, [leagueId])

  const groupedMatches = groupMatchesByDate(matches)
  const today = new Date().toISOString().split("T")[0]
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  const todayMatches = groupedMatches[today] || []
  const tomorrowMatches = groupedMatches[tomorrow] || []
  const upcomingMatches = Object.entries(groupedMatches)
    .filter(([date]) => date !== today && date !== tomorrow)
    .flatMap(([, matches]) => matches)

  // Separate live matches
  const liveMatches = matches.filter((match) => match.status === "IN_PLAY" || match.status === "PAUSED")

  if (loading) {
    return <MatchesLoading />
  }

  if (error) {
    return (
      <Card className="bg-gray-800/50 border-red-700/30 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <InteractiveFootball size={80} className="mx-auto mb-4" />
          <p className="text-red-400 text-lg font-medium">Error loading matches</p>
          <p className="text-gray-400 text-sm mt-2">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800/50 border-green-700/30 backdrop-blur-sm">
      <CardHeader className="border-b border-green-700/30 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <CardTitle className="text-white text-xl">{leagueInfo?.name || "League"} Matches</CardTitle>
          <FloatingFootball size={40} />
        </div>
        <div className="flex items-center space-x-4">
          {liveMatchCount > 0 && (
            <div className="flex items-center text-red-400 text-sm">
              <Radio className="w-3 h-3 mr-1" />
              {liveMatchCount} Live
            </div>
          )}
          <div className="text-xs text-gray-400">
            <span className="flex items-center">
              <RefreshCw className="w-3 h-3 mr-1 animate-spin-slow" />
              Live Updates
            </span>
            <span className="text-xs">Last: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue={liveMatches.length > 0 ? "live" : "today"} className="w-full">
          <TabsList className={`grid w-full ${liveMatches.length > 0 ? "grid-cols-4" : "grid-cols-3"} bg-gray-700/50`}>
            {liveMatches.length > 0 && (
              <TabsTrigger
                value="live"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300"
              >
                <Radio className="w-4 h-4 mr-2" />
                Live ({liveMatches.length})
              </TabsTrigger>
            )}
            <TabsTrigger
              value="today"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Clock className="w-4 h-4 mr-2" />
              Today
            </TabsTrigger>
            <TabsTrigger
              value="tomorrow"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Tomorrow
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-300"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Next 14 Days
            </TabsTrigger>
          </TabsList>

          {liveMatches.length > 0 && (
            <TabsContent value="live" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveMatches.map((match) => (
                  <EnhancedMatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>
          )}

          <TabsContent value="today" className="mt-6">
            {todayMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todayMatches.map((match) => (
                  <EnhancedMatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <InteractiveFootball size={100} className="mx-auto mb-6" />
                <p className="text-lg font-medium">No matches scheduled for today</p>
                <p className="text-sm mt-2">Check tomorrow or upcoming matches</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tomorrow" className="mt-6">
            {tomorrowMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tomorrowMatches.map((match) => (
                  <EnhancedMatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <InteractiveFootball size={100} className="mx-auto mb-6" />
                <p className="text-lg font-medium">No matches scheduled for tomorrow</p>
                <p className="text-sm mt-2">Check upcoming matches</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingMatches.map((match) => (
                  <EnhancedMatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <InteractiveFootball size={100} className="mx-auto mb-6" />
                <p className="text-lg font-medium">No upcoming matches found</p>
                <p className="text-sm mt-2">Try selecting a different league</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
