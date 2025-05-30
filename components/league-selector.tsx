"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Loader2 } from "lucide-react"
import Image from "next/image"

type League = {
  id: string
  name: string
  logo: string
  country?: string
}

export function LeagueSelector() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const leagues: League[] = [
    {
      id: "PL",
      name: "Premier League",
      logo: "https://logodownload.org/wp-content/uploads/2016/03/premier-league-logo-escudo.png",
      country: "England",
    },
    {
      id: "PD",
      name: "La Liga",
      logo: "https://logodownload.org/wp-content/uploads/2018/11/la-liga-logo.png",
      country: "Spain",
    },
    {
      id: "SA",
      name: "Serie A",
      logo: "https://logodownload.org/wp-content/uploads/2017/11/serie-a-tim-logo.png",
      country: "Italy",
    },
    {
      id: "FL1",
      name: "Ligue 1",
      logo: "https://logodownload.org/wp-content/uploads/2019/10/ligue-1-logo.png",
      country: "France",
    },
    {
      id: "CL",
      name: "Champions League",
      logo: "https://logodownload.org/wp-content/uploads/2017/05/uefa-champions-league-logo-1.png",
    },
    {
      id: "SPL",
      name: "Saudi Pro League",
      logo: "https://logodownload.org/wp-content/uploads/2023/01/saudi-pro-league-logo-0.png",
      country: "Saudi Arabia",
    },
  ]

  const handleSelectLeague = (leagueId: string) => {
    setLoading(leagueId)
    router.push(`/matches/${leagueId}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leagues.map((league) => (
        <Card
          key={league.id}
          className="overflow-hidden hover:shadow-lg transition-shadow bg-gray-800/50 border-green-700/30 backdrop-blur-sm"
        >
          <CardContent className="p-6 flex flex-col items-center">
            <div className="mb-4 w-20 h-20 relative">
              <Image
                src={league.logo || "/placeholder.svg"}
                alt={league.name}
                width={80}
                height={80}
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=80&width=80"
                }}
              />
            </div>
            <h2 className="text-xl font-bold mb-1 text-white">{league.name}</h2>
            {league.country && <p className="text-sm text-gray-400 mb-4">{league.country}</p>}
            <Button
              onClick={() => handleSelectLeague(league.id)}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={loading === league.id}
            >
              {loading === league.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Trophy className="mr-2 h-4 w-4" />
                  View Matches
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
