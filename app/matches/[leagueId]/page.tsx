import { Suspense } from "react"
import { notFound } from "next/navigation"
import { MatchesList } from "@/components/matches-list"
import { LeagueHeader } from "@/components/league-header"
import { MatchesLoading } from "@/components/matches-loading"
import { DebugInfo } from "@/components/debug-info"
import { getLeagueInfo } from "@/lib/leagues"

export const dynamic = "force-dynamic"
export const revalidate = 300 // Revalidate every 5 minutes

interface MatchesPageProps {
  params: {
    leagueId: string
  }
}

export default function MatchesPage({ params }: MatchesPageProps) {
  const { leagueId } = params
  const leagueInfo = getLeagueInfo(leagueId)

  if (!leagueInfo) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <LeagueHeader league={leagueInfo} />
      <div className="container mx-auto px-4 py-8">
        <DebugInfo leagueId={leagueId} />
        <Suspense fallback={<MatchesLoading />}>
          <MatchesList leagueId={leagueId} />
        </Suspense>
      </div>
    </main>
  )
}
