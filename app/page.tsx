"use client"

import { useState } from "react"
import { LeagueSidebar } from "@/components/league-sidebar-new"
import { MatchesDisplay } from "@/components/matches-display-new"
import { Header } from "@/components/header-new"

export default function Home() {
  const [selectedLeague, setSelectedLeague] = useState("PL")

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <LeagueSidebar selectedLeague={selectedLeague} onSelectLeague={setSelectedLeague} />
        <main className="flex-1 p-6">
          <MatchesDisplay leagueId={selectedLeague} />
        </main>
      </div>
    </div>
  )
}
