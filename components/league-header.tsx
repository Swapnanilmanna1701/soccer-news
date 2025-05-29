import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { League } from "@/lib/types"

interface LeagueHeaderProps {
  league: League
}

export function LeagueHeader({ league }: LeagueHeaderProps) {
  return (
    <div className="bg-slate-800 text-white py-6">
      <div className="container mx-auto px-4">
        <Link href="/" passHref>
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leagues
          </Button>
        </Link>
        <div className="flex items-center">
          <div className="mr-4">
            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
              {league.shortName || league.name.substring(0, 2)}
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{league.name}</h1>
            {league.country && <p className="text-slate-300">{league.country}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
