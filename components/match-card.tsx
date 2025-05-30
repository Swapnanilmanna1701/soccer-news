import { Card, CardContent } from "@/components/ui/card"
import { formatMatchTime, formatMatchDate } from "@/lib/utils"
import type { Match } from "@/lib/types"
import { Calendar, Clock } from "lucide-react"
import Image from "next/image"

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const { homeTeam, awayTeam, utcDate, status } = match
  const formattedTime = formatMatchTime(utcDate)
  const formattedDate = formatMatchDate(utcDate)

  // Function to get team logo URL
  const getTeamLogo = (teamName: string) => {
    // Map popular teams to their official logos
    const teamLogos: Record<string, string> = {
      "Manchester United FC": "https://logodownload.org/wp-content/uploads/2016/10/manchester-united-logo-1.png",
      "Manchester City FC":
        "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png",
      "Liverpool FC": "https://logodownload.org/wp-content/uploads/2017/02/liverpool-fc-logo-escudo.png",
      "Chelsea FC": "https://logodownload.org/wp-content/uploads/2017/02/chelsea-fc-logo-escudo.png",
      "Arsenal FC": "https://logodownload.org/wp-content/uploads/2017/02/arsenal-logo-escudo.png",
      "Tottenham Hotspur FC": "https://logodownload.org/wp-content/uploads/2018/11/tottenham-logo-escudo.png",
      "FC Barcelona": "https://logodownload.org/wp-content/uploads/2015/05/barcelona-logo-escudo.png",
      "Real Madrid CF": "https://logodownload.org/wp-content/uploads/2016/05/real-madrid-logo-escudo.png",
      "Atlético de Madrid": "https://logodownload.org/wp-content/uploads/2019/02/atletico-madrid-logo.png",
      "Juventus FC": "https://logodownload.org/wp-content/uploads/2017/02/juventus-logo-0.png",
      "AC Milan": "https://logodownload.org/wp-content/uploads/2016/09/ac-milan-logo-escudo.png",
      "FC Internazionale Milano": "https://logodownload.org/wp-content/uploads/2016/10/inter-milan-logo-escudo.png",
      "FC Bayern München": "https://logodownload.org/wp-content/uploads/2017/02/bayern-munchen-logo-escudo.png",
      "Borussia Dortmund": "https://logodownload.org/wp-content/uploads/2017/02/bvb-borussia-dortmund-logo.png",
      "Paris Saint-Germain FC":
        "https://logodownload.org/wp-content/uploads/2018/07/paris-saint-germain-logo-psg-escudo.png",
      "Al-Nassr FC": "https://logodownload.org/wp-content/uploads/2023/01/al-nassr-fc-logo-0.png",
      "Al-Hilal SFC": "https://logodownload.org/wp-content/uploads/2023/01/al-hilal-sfc-logo-0.png",
    }

    return teamLogos[teamName] || "/placeholder.svg?height=32&width=32"
  }

  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center text-sm text-blue-600">
              <Clock className="w-3 h-3 mr-1" />
              {formattedTime}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {formattedDate}
            </div>
          </div>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full border border-blue-200">
            {status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-8 h-8 relative">
              <Image
                src={getTeamLogo(homeTeam.name) || "/placeholder.svg"}
                alt={homeTeam.name}
                width={32}
                height={32}
                className="object-contain rounded"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                }}
              />
            </div>
            <span className="font-medium text-gray-900 text-sm truncate">{homeTeam.name}</span>
          </div>

          <span className="text-sm font-bold mx-3 text-blue-600">vs</span>

          <div className="flex items-center space-x-3 flex-1 justify-end">
            <span className="font-medium text-gray-900 text-sm truncate">{awayTeam.name}</span>
            <div className="w-8 h-8 relative">
              <Image
                src={getTeamLogo(awayTeam.name) || "/placeholder.svg"}
                alt={awayTeam.name}
                width={32}
                height={32}
                className="object-contain rounded"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
