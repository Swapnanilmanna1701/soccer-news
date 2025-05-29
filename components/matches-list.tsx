import { getMatchesByLeague } from "@/lib/api"
import { MatchesGroup } from "@/components/matches-group"
import { groupMatchesByDate } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface MatchesListProps {
  leagueId: string
}

export async function MatchesList({ leagueId }: MatchesListProps) {
  try {
    const matches = await getMatchesByLeague(leagueId)

    if (!matches || matches.length === 0) {
      return (
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No upcoming matches found for this league in the next 7 days. This could be due to:
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>The league is currently in off-season</li>
                <li>No matches scheduled for the selected period</li>
                <li>API rate limiting (free tier has limited requests)</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-slate-600 dark:text-slate-400">No upcoming matches found</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-500">
              League ID: {leagueId} | Please try another league or check back later
            </p>
          </div>
        </div>
      )
    }

    const groupedMatches = groupMatchesByDate(matches)

    return (
      <div className="space-y-8">
        <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">Found {matches.length} upcoming matches</div>

        {Object.entries(groupedMatches).map(([dateKey, dateMatches]) => (
          <MatchesGroup key={dateKey} dateKey={dateKey} matches={dateMatches} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error in MatchesList:", error)

    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load matches. This might be due to:
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>API rate limiting (free tier allows 10 requests per minute)</li>
              <li>Network connectivity issues</li>
              <li>Invalid league ID: {leagueId}</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-slate-600 dark:text-slate-400">Unable to load matches</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-500">
            Please try refreshing the page or selecting another league
          </p>
        </div>
      </div>
    )
  }
}
