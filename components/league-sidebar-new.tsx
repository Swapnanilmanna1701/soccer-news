"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { OfficialLogo } from "@/components/official-logo"
import { getOfficialLeagueLogo, getAlternativeLeagueLogo, generateBackupLogo } from "@/lib/logo-service"
import { InteractiveFootball } from "@/components/interactive-football"

interface League {
  id: string
  name: string
  country?: string
}

interface LeagueSidebarProps {
  selectedLeague: string
  onSelectLeague: (leagueId: string) => void
}

export function LeagueSidebar({ selectedLeague, onSelectLeague }: LeagueSidebarProps) {
  const leagues: League[] = [
    {
      id: "PL",
      name: "Premier League",
      country: "England",
    },
    {
      id: "PD",
      name: "La Liga",
      country: "Spain",
    },
    {
      id: "SA",
      name: "Serie A",
      country: "Italy",
    },
    {
      id: "BL1",
      name: "Bundesliga",
      country: "Germany",
    },
    {
      id: "FL1",
      name: "Ligue 1",
      country: "France",
    },
    {
      id: "CL",
      name: "Champions League",
    },
    {
      id: "SPL",
      name: "Saudi Pro League",
      country: "Saudi Arabia",
    },
  ]

  return (
    <aside className="w-80 bg-gray-900/50 backdrop-blur-sm border-r border-green-800/30 p-4">
      <Card className="bg-gray-800/50 border-green-700/30 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Select League</h2>
            <InteractiveFootball size={70} />
          </div>
          <div className="space-y-1">
            {leagues.map((league) => (
              <Button
                key={league.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start p-3 h-auto transition-all duration-200 hover:bg-green-800/30",
                  selectedLeague === league.id
                    ? "bg-green-700/50 text-white border border-green-500/50"
                    : "text-gray-300 hover:text-white",
                )}
                onClick={() => onSelectLeague(league.id)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-6 h-6 relative flex-shrink-0">
                    <OfficialLogo
                      name={league.name}
                      type="league"
                      primarySrc={getOfficialLeagueLogo(league.id)}
                      alternativeSrc={getAlternativeLeagueLogo(league.id)}
                      backupSrc={generateBackupLogo(league.name, "league")}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{league.name}</div>
                    {league.country && <div className="text-xs text-gray-400">{league.country}</div>}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </aside>
  )
}
