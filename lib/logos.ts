// Map of league IDs to reliable logo URLs
export const leagueLogos: Record<string, string> = {
  PL: "/images/leagues/premier-league.png",
  PD: "/images/leagues/la-liga.png",
  SA: "/images/leagues/serie-a.png",
  BL1: "/images/leagues/bundesliga.png",
  FL1: "/images/leagues/ligue-1.png",
  CL: "/images/leagues/champions-league.png",
  SPL: "/images/leagues/saudi-pro-league.png",
}

// Common team logos mapping
export const teamLogos: Record<string, string> = {
  // Premier League
  "Manchester United FC": "/images/teams/manchester-united.png",
  "Manchester City FC": "/images/teams/manchester-city.png",
  "Liverpool FC": "/images/teams/liverpool.png",
  "Chelsea FC": "/images/teams/chelsea.png",
  "Arsenal FC": "/images/teams/arsenal.png",
  "Tottenham Hotspur FC": "/images/teams/tottenham.png",

  // La Liga
  "FC Barcelona": "/images/teams/barcelona.png",
  "Real Madrid CF": "/images/teams/real-madrid.png",
  "Atlético de Madrid": "/images/teams/atletico-madrid.png",
  "Sevilla FC": "/images/teams/sevilla.png",

  // Serie A
  "Juventus FC": "/images/teams/juventus.png",
  "AC Milan": "/images/teams/ac-milan.png",
  "FC Internazionale Milano": "/images/teams/inter-milan.png",
  "AS Roma": "/images/teams/roma.png",
  "SSC Napoli": "/images/teams/napoli.png",

  // Bundesliga
  "FC Bayern München": "/images/teams/bayern.png",
  "Borussia Dortmund": "/images/teams/dortmund.png",
  "RB Leipzig": "/images/teams/leipzig.png",

  // Ligue 1
  "Paris Saint-Germain FC": "/images/teams/psg.png",
  "Olympique de Marseille": "/images/teams/marseille.png",
  "Olympique Lyonnais": "/images/teams/lyon.png",

  // Saudi Pro League
  "Al-Nassr FC": "/images/teams/al-nassr.png",
  "Al-Hilal SFC": "/images/teams/al-hilal.png",
  "Al-Ahli SFC": "/images/teams/al-ahli.png",
  "Al-Ittihad Club": "/images/teams/al-ittihad.png",
}

// Get team logo with fallback
export function getTeamLogo(teamName: string): string {
  // First check our mapping
  if (teamLogos[teamName]) {
    return teamLogos[teamName]
  }

  // Try to generate a logo from a reliable source
  // For this example, we'll use a football API that has team logos
  return `https://api.sofascore.app/api/v1/team/${encodeURIComponent(teamName)}/image`
}

// Get league logo with fallback
export function getLeagueLogo(leagueId: string): string {
  return leagueLogos[leagueId] || `/images/leagues/generic-league.png`
}
