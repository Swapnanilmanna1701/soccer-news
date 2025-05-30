import { Card, CardContent } from "@/components/ui/card"
import { formatMatchTime, formatMatchDate } from "@/lib/utils"
import type { Match } from "@/lib/types"
import { Calendar, Clock } from "lucide-react"
import { OfficialLogo } from "@/components/official-logo"
import { getOfficialTeamLogo, getAlternativeTeamLogo, generateBackupLogo } from "@/lib/logo-service"

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const { homeTeam, awayTeam, utcDate, status } = match
  const formattedTime = formatMatchTime(utcDate)
  const formattedDate = formatMatchDate(utcDate)

  return (
    <Card className="bg-gray-800/50 border-green-700/30 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center text-sm text-green-400">
              <Clock className="w-3 h-3 mr-1" />
              {formattedTime}
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="w-3 h-3 mr-1" />
              {formattedDate}
            </div>
          </div>
          <span className="text-xs px-2 py-1 bg-green-600/20 text-green-300 rounded-full border border-green-500/30">
            {status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-8 h-8 relative">
              <OfficialLogo
                name={homeTeam.name}
                type="team"
                primarySrc={getOfficialTeamLogo(homeTeam.name, homeTeam.id)}
                alternativeSrc={getAlternativeTeamLogo(homeTeam.name)}
                backupSrc={generateBackupLogo(homeTeam.name, "team")}
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <span className="font-medium text-white text-sm truncate">{homeTeam.name}</span>
          </div>

          <span className="text-sm font-bold mx-3 text-green-400">vs</span>

          <div className="flex items-center space-x-3 flex-1 justify-end">
            <span className="font-medium text-white text-sm truncate">{awayTeam.name}</span>
            <div className="w-8 h-8 relative">
              <OfficialLogo
                name={awayTeam.name}
                type="team"
                primarySrc={getOfficialTeamLogo(awayTeam.name, awayTeam.id)}
                alternativeSrc={getAlternativeTeamLogo(awayTeam.name)}
                backupSrc={generateBackupLogo(awayTeam.name, "team")}
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
