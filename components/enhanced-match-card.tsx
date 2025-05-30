"use client"

import { Card, CardContent } from "@/components/ui/card"
import { formatMatchTime, formatMatchDate } from "@/lib/utils"
import type { Match } from "@/lib/types"
import { Calendar, Clock, Radio } from "lucide-react"
import { OfficialLogo } from "@/components/official-logo"
import { getOfficialTeamLogo, getAlternativeTeamLogo, generateBackupLogo } from "@/lib/logo-service"
import { motion } from "framer-motion"

interface EnhancedMatchCardProps {
  match: Match
}

export function EnhancedMatchCard({ match }: EnhancedMatchCardProps) {
  const { homeTeam, awayTeam, utcDate, status, score } = match
  const formattedTime = formatMatchTime(utcDate)
  const formattedDate = formatMatchDate(utcDate)

  const isLive = status === "IN_PLAY" || status === "PAUSED"
  const isFinished = status === "FINISHED"
  const hasScore = score && (score.home !== null || score.away !== null)

  const getStatusColor = () => {
    switch (status) {
      case "IN_PLAY":
      case "PAUSED":
        return "bg-red-600/20 text-red-300 border-red-500/30"
      case "FINISHED":
        return "bg-gray-600/20 text-gray-300 border-gray-500/30"
      case "SCHEDULED":
      case "TIMED":
        return "bg-green-600/20 text-green-300 border-green-500/30"
      default:
        return "bg-yellow-600/20 text-yellow-300 border-yellow-500/30"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "IN_PLAY":
        return "LIVE"
      case "PAUSED":
        return "HT"
      case "FINISHED":
        return "FT"
      case "SCHEDULED":
      case "TIMED":
        return formattedTime
      default:
        return status
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card
        className={`bg-gray-800/50 border-green-700/30 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 ${isLive ? "ring-2 ring-red-500/50" : ""}`}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col space-y-1">
              {!isLive && !isFinished && (
                <>
                  <div className="flex items-center text-sm text-green-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {formattedTime}
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formattedDate}
                  </div>
                </>
              )}
              {isFinished && (
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formattedDate}
                </div>
              )}
            </div>
            <div className={`text-xs px-2 py-1 rounded-full border ${getStatusColor()}`}>
              {isLive && <Radio className="w-3 h-3 inline mr-1" />}
              {getStatusText()}
            </div>
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

            <div className="flex items-center space-x-2 mx-3">
              {hasScore ? (
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-bold text-white">{score?.home ?? 0}</span>
                  <span className="text-sm text-gray-400">-</span>
                  <span className="text-lg font-bold text-white">{score?.away ?? 0}</span>
                </div>
              ) : (
                <span className="text-sm font-bold text-green-400">vs</span>
              )}
            </div>

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

          {isLive && (
            <motion.div
              className="mt-3 text-center"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-xs text-red-400 font-medium">● LIVE MATCH</span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
