"use client"

import { useState } from "react"
import { LeagueSidebar } from "@/components/league-sidebar"
import { MatchesDisplay } from "@/components/matches-display"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  const [selectedLeague, setSelectedLeague] = useState("PL")

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Header />
      <div className="flex">
        <LeagueSidebar selectedLeague={selectedLeague} onSelectLeague={setSelectedLeague} />
        <main className="flex-1 p-6">
          <MatchesDisplay leagueId={selectedLeague} />
        </main>
      </div>
      <Footer />
    </div>
  )
}
