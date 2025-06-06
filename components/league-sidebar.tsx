"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProfessionalLogo } from "@/components/professional-logo"
import { getBestLeagueLogo, getBackupLeagueLogo } from "@/lib/logos"

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
          <h2 className="text-lg font-semibold text-white mb-4">Select League</h2>
          <div className="space-y-2">
            {leagues.map((league) => (
              <Button
                key={league.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start p-3 h-auto transition-all duration-300 hover:scale-105 hover:bg-green-800/30",
                  selectedLeague === league.id
                    ? "bg-green-700/50 text-white border border-green-500/50"
                    : "text-gray-300 hover:text-white",
                )}
                onClick={() => onSelectLeague(league.id)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-8 h-8 relative flex-shrink-0">
                    <ProfessionalLogo
                      primarySrc={getBestLeagueLogo(league.id)}
                      backupSrc={getBackupLeagueLogo(league.id)}
                      alt={league.name}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{league.name}</div>
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
