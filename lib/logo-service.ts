// Official logo sources for football teams and leagues
const OFFICIAL_LOGO_SOURCES = {
  // Football-data.org API (matches our data source)
  footballData: {
    team: (teamId: number) => `https://crests.football-data.org/${teamId}.svg`,
    league: (leagueId: string) => `https://crests.football-data.org/competitions/${leagueId}.png`,
  },

  // API-Football (comprehensive sports data provider)
  apiFootball: {
    team: (teamId: number) => `https://media.api-sports.io/football/teams/${teamId}.png`,
    league: (leagueId: string) => `https://media.api-sports.io/football/leagues/${leagueId}.png`,
  },

  // FIFA/UEFA official sources
  official: {
    leagues: {
      PL: "https://www.premierleague.com/resources/rebrand/v7.121.0/i/elements/competition-badges/t0.svg",
      PD: "https://www.laliga.com/assets/logos/laliga-v-negativo.svg",
      SA: "https://media.api-sports.io/football/leagues/135.png",
      BL1: "https://www.bundesliga.com/assets/Bundesliga/Images/Bundesliga_logo.svg",
      FL1: "https://www.ligue1.com/-/media/Project/LFP/shared/Images/logos/L1U_Dark.png",
      CL: "https://img.uefa.com/imgml/uefacom/ucl/social/og-default.jpg",
      SPL: "https://spl.sa/assets/images/logo.png",
    },
  },

  // Team mapping for popular teams (ID-based for reliability)
  popularTeams: {
    // Premier League
    "Manchester United FC": {
      id: 66,
      logo: "https://crests.football-data.org/66.svg",
    },
    "Manchester City FC": {
      id: 65,
      logo: "https://crests.football-data.org/65.svg",
    },
    "Liverpool FC": {
      id: 64,
      logo: "https://crests.football-data.org/64.svg",
    },
    "Chelsea FC": {
      id: 61,
      logo: "https://crests.football-data.org/61.svg",
    },
    "Arsenal FC": {
      id: 57,
      logo: "https://crests.football-data.org/57.svg",
    },
    "Tottenham Hotspur FC": {
      id: 73,
      logo: "https://crests.football-data.org/73.svg",
    },

    // La Liga
    "FC Barcelona": {
      id: 81,
      logo: "https://crests.football-data.org/81.svg",
    },
    "Real Madrid CF": {
      id: 86,
      logo: "https://crests.football-data.org/86.svg",
    },
    "Atlético de Madrid": {
      id: 78,
      logo: "https://crests.football-data.org/78.svg",
    },

    // Serie A
    "Juventus FC": {
      id: 109,
      logo: "https://crests.football-data.org/109.svg",
    },
    "AC Milan": {
      id: 98,
      logo: "https://crests.football-data.org/98.svg",
    },
    "FC Internazionale Milano": {
      id: 108,
      logo: "https://crests.football-data.org/108.svg",
    },

    // Bundesliga
    "FC Bayern München": {
      id: 5,
      logo: "https://crests.football-data.org/5.svg",
    },
    "Borussia Dortmund": {
      id: 4,
      logo: "https://crests.football-data.org/4.svg",
    },

    // Ligue 1
    "Paris Saint-Germain FC": {
      id: 524,
      logo: "https://crests.football-data.org/524.svg",
    },

    // Saudi Pro League
    "Al-Nassr FC": {
      id: 937,
      logo: "https://media.api-sports.io/football/teams/937.png",
    },
    "Al-Hilal SFC": {
      id: 939,
      logo: "https://media.api-sports.io/football/teams/939.png",
    },
  },
}

// League ID mapping to API IDs
export const leagueApiMapping: Record<string, { id: string; name: string }> = {
  PL: { id: "PL", name: "Premier League" },
  PD: { id: "PD", name: "La Liga" },
  SA: { id: "SA", name: "Serie A" },
  BL1: { id: "BL1", name: "Bundesliga" },
  FL1: { id: "FL1", name: "Ligue 1" },
  CL: { id: "CL", name: "Champions League" },
  SPL: { id: "SPL", name: "Saudi Pro League" },
}

// Get official team logo
export function getOfficialTeamLogo(teamName: string, teamId?: number): string {
  // Check if it's a popular team with known ID
  const popularTeam = OFFICIAL_LOGO_SOURCES.popularTeams[teamName as keyof typeof OFFICIAL_LOGO_SOURCES.popularTeams]
  if (popularTeam) {
    return popularTeam.logo
  }

  // If we have the team ID, use the football-data.org API
  if (teamId) {
    return OFFICIAL_LOGO_SOURCES.footballData.team(teamId)
  }

  // Fallback to API-Football with team name
  const formattedName = teamName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
  return `https://media.api-sports.io/football/teams/${formattedName}.png`
}

// Get alternative team logo
export function getAlternativeTeamLogo(teamName: string): string {
  // Use ESPN's API as an alternative
  const formattedName = teamName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
  return `https://a.espncdn.com/i/teamlogos/soccer/500/${formattedName}.png`
}

// Get official league logo
export function getOfficialLeagueLogo(leagueId: string): string {
  // Check official sources first
  if (OFFICIAL_LOGO_SOURCES.official.leagues[leagueId as keyof typeof OFFICIAL_LOGO_SOURCES.official.leagues]) {
    return OFFICIAL_LOGO_SOURCES.official.leagues[leagueId as keyof typeof OFFICIAL_LOGO_SOURCES.official.leagues]
  }

  // Fallback to football-data.org
  return OFFICIAL_LOGO_SOURCES.footballData.league(leagueId)
}

// Get alternative league logo
export function getAlternativeLeagueLogo(leagueId: string): string {
  // Use API-Football as alternative
  const mappedId = leagueApiMapping[leagueId]?.id || leagueId
  return OFFICIAL_LOGO_SOURCES.apiFootball.league(mappedId)
}

// Generate a professional backup logo
export function generateBackupLogo(name: string, type: "team" | "league" = "team"): string {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 3)
    .toUpperCase()

  const colors = type === "team" ? ["22c55e", "16a34a"] : ["1e293b", "0f172a"]
  const colorIndex = name.length % colors.length
  const bgColor = colors[colorIndex]

  return `https://ui-avatars.com/api/?name=${initials}&background=${bgColor}&color=fff&size=128&bold=true`
}
