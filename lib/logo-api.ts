// Free logo APIs for sports teams and leagues
const LOGO_APIS = {
  // API-Football provides comprehensive sports logos
  teams: (teamName: string) => `https://media.api-sports.io/football/teams/${encodeURIComponent(teamName)}.png`,

  // Alternative: ESPN API for team logos
  espnTeams: (teamName: string) => {
    const cleanName = teamName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
    return `https://a.espncdn.com/i/teamlogos/soccer/500/${cleanName}.png`
  },

  // TheSportsDB API (free)
  sportsDbTeam: (teamName: string) => {
    const searchName = encodeURIComponent(teamName.replace(/FC|CF/gi, "").trim())
    return `https://www.thesportsdb.com/images/media/team/badge/${searchName}.png`
  },

  // League logos from various sources
  leagues: {
    PL: "https://logos.footystats.org/england-premier-league.png",
    PD: "https://logos.footystats.org/spain-la-liga.png",
    SA: "https://logos.footystats.org/italy-serie-a.png",
    BL1: "https://logos.footystats.org/germany-bundesliga.png",
    FL1: "https://logos.footystats.org/france-ligue-1.png",
    CL: "https://logos.footystats.org/uefa-champions-league.png",
    SPL: "https://logos.footystats.org/saudi-arabia-saudi-professional-league.png",
  },
}

// Team name to API-compatible format
export function formatTeamNameForAPI(teamName: string): string {
  return teamName
    .replace(/FC$|CF$|SFC$|AFC$/gi, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

// Get team logo with multiple fallback APIs
export function getTeamLogoFromAPI(teamName: string): string {
  // Try TheSportsDB first (most reliable for football)
  const formattedName = formatTeamNameForAPI(teamName)
  return `https://www.thesportsdb.com/images/media/team/badge/${formattedName}.png`
}

// Alternative team logo sources
export function getAlternativeTeamLogo(teamName: string): string {
  const formattedName = formatTeamNameForAPI(teamName)
  return `https://a.espncdn.com/i/teamlogos/soccer/500/${formattedName}.png`
}

// Get league logo from API
export function getLeagueLogoFromAPI(leagueId: string): string {
  return (
    LOGO_APIS.leagues[leagueId as keyof typeof LOGO_APIS.leagues] ||
    `https://logos.footystats.org/${leagueId.toLowerCase()}.png`
  )
}

// Backup logo generator
export function generateBackupLogo(name: string, type: "team" | "league" = "team"): string {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 3)
    .toUpperCase()

  const colors =
    type === "team"
      ? ["22c55e", "16a34a", "15803d", "166534", "14532d"] // Green variants
      : ["000000", "1f2937", "374151", "4b5563", "6b7280"] // Dark variants

  const colorIndex = name.length % colors.length
  const bgColor = colors[colorIndex]

  return `https://ui-avatars.com/api/?name=${initials}&background=${bgColor}&color=fff&size=128&font-size=0.4&bold=true`
}
