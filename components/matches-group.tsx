import type { Match } from "@/lib/types"
import { MatchCard } from "@/components/match-card"
import { formatDateHeading } from "@/lib/utils"

interface MatchesGroupProps {
  dateKey: string
  matches: Match[]
}

export function MatchesGroup({ dateKey, matches }: MatchesGroupProps) {
  const heading = formatDateHeading(dateKey)

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  )
}
