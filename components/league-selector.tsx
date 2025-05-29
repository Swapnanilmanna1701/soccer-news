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
      logo: "/placeholder.svg?height=80&width=80",
      country: "England",
    },
    {
      id: "PD",
      name: "La Liga",
      logo: "/placeholder.svg?height=80&width=80",
      country: "Spain",
    },
    {
      id: "SA",
      name: "Serie A",
      logo: "/placeholder.svg?height=80&width=80",
      country: "Italy",
    },
    {
      id: "FL1",
      name: "Ligue 1",
      logo: "/placeholder.svg?height=80&width=80",
      country: "France",
    },
    {
      id: "CL",
      name: "Champions League",
      logo: "/placeholder.svg?height=80&width=80",
    },
  ]

  const handleSelectLeague = (leagueId: string) => {
    setLoading(leagueId)
    router.push(`/matches/${leagueId}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leagues.map((league) => (
        <Card key={league.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="mb-4 w-20 h-20 relative">
              <Image
                src={league.logo || "/placeholder.svg"}
                alt={league.name}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-bold mb-1">{league.name}</h2>
            {league.country && <p className="text-sm text-muted-foreground mb-4">{league.country}</p>}
            <Button onClick={() => handleSelectLeague(league.id)} className="w-full" disabled={loading === league.id}>
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
