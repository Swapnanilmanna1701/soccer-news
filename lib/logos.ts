// Constants for logo APIs
const LOGO_API_BASE = "https://api.sportlogos.net/v1/logos"
const TEAM_LOGO_API = `${LOGO_API_BASE}/football/team`
const LEAGUE_LOGO_API = `${LOGO_API_BASE}/football/league`

// League ID mapping to official IDs
export const leagueApiMapping: Record<string, string> = {
  PL: "premier-league",
  PD: "la-liga",
  SA: "serie-a",
  BL1: "bundesliga",
  FL1: "ligue-1",
  CL: "champions-league",
  SPL: "saudi-pro-league",
}

// Team name normalization for API
export function normalizeTeamName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+fc$/i, "")
    .replace(/\s+cf$/i, "")
    .replace(/^fc\s+/i, "")
    .replace(/\s+/g, "-")
}

// Get official league logo
export function getLeagueLogo(leagueId: string): string {
  const mappedId = leagueApiMapping[leagueId] || leagueId.toLowerCase()

  // Use a reliable sports logo CDN
  return `https://sportlogos.net/cdn/logos/football/leagues/${mappedId}.png`
}

// Get official team logo
export function getTeamLogo(teamName: string): string {
  const normalizedName = normalizeTeamName(teamName)

  // Use a reliable sports logo CDN
  return `https://sportlogos.net/cdn/logos/football/teams/${normalizedName}.png`
}

// Backup API for logos
export function getBackupTeamLogo(teamName: string): string {
  // API-Football has comprehensive logo coverage
  return `https://media.api-sports.io/football/teams/${encodeURIComponent(teamName)}.png`
}

// Backup API for league logos
export function getBackupLeagueLogo(leagueId: string): string {
  const mappedId = leagueApiMapping[leagueId] || leagueId.toLowerCase()
  return `https://media.api-sports.io/football/leagues/${mappedId}.png`
}

// Additional backup for popular teams
export const popularTeamLogos: Record<string, string> = {
  "Manchester United FC": "https://logodownload.org/wp-content/uploads/2016/10/manchester-united-logo-1.png",
  "Manchester City FC": "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png",
  "Liverpool FC": "https://logodownload.org/wp-content/uploads/2017/02/liverpool-fc-logo-escudo.png",
  "Chelsea FC": "https://logodownload.org/wp-content/uploads/2017/02/chelsea-fc-logo-escudo.png",
  "Arsenal FC": "https://logodownload.org/wp-content/uploads/2017/02/arsenal-logo-escudo.png",
  "Tottenham Hotspur FC": "https://logodownload.org/wp-content/uploads/2018/11/tottenham-logo-escudo.png",
  "FC Barcelona": "https://logodownload.org/wp-content/uploads/2015/05/barcelona-logo-escudo.png",
  "Real Madrid CF": "https://logodownload.org/wp-content/uploads/2016/05/real-madrid-logo-escudo.png",
  "Atlético de Madrid": "https://logodownload.org/wp-content/uploads/2019/02/atletico-madrid-logo.png",
  "Juventus FC": "https://logodownload.org/wp-content/uploads/2017/02/juventus-logo-0.png",
  "AC Milan": "https://logodownload.org/wp-content/uploads/2016/09/ac-milan-logo-escudo.png",
  "FC Internazionale Milano": "https://logodownload.org/wp-content/uploads/2016/10/inter-milan-logo-escudo.png",
  "FC Bayern München": "https://logodownload.org/wp-content/uploads/2017/02/bayern-munchen-logo-escudo.png",
  "Borussia Dortmund": "https://logodownload.org/wp-content/uploads/2017/02/bvb-borussia-dortmund-logo.png",
  "Paris Saint-Germain FC":
    "https://logodownload.org/wp-content/uploads/2018/07/paris-saint-germain-logo-psg-escudo.png",
  "Al-Nassr FC": "https://logodownload.org/wp-content/uploads/2023/01/al-nassr-fc-logo-0.png",
  "Al-Hilal SFC": "https://logodownload.org/wp-content/uploads/2023/01/al-hilal-sfc-logo-0.png",
}

// Additional backup for popular leagues
export const popularLeagueLogos: Record<string, string> = {
  PL: "https://logodownload.org/wp-content/uploads/2016/03/premier-league-logo-escudo.png",
  PD: "https://logodownload.org/wp-content/uploads/2018/11/la-liga-logo.png",
  SA: "https://logodownload.org/wp-content/uploads/2017/11/serie-a-tim-logo.png",
  BL1: "https://logodownload.org/wp-content/uploads/2017/10/bundesliga-logo.png",
  FL1: "https://logodownload.org/wp-content/uploads/2019/10/ligue-1-logo.png",
  CL: "https://logodownload.org/wp-content/uploads/2017/05/uefa-champions-league-logo-1.png",
  SPL: "https://logodownload.org/wp-content/uploads/2023/01/saudi-pro-league-logo-0.png",
}

// Get the best available logo for a team
export function getBestTeamLogo(teamName: string): string {
  // First check our popular teams mapping
  if (popularTeamLogos[teamName]) {
    return popularTeamLogos[teamName]
  }

  // Then try the primary API
  return getTeamLogo(teamName)
}

// Get the best available logo for a league
export function getBestLeagueLogo(leagueId: string): string {
  // First check our popular leagues mapping
  if (popularLeagueLogos[leagueId]) {
    return popularLeagueLogos[leagueId]
  }

  // Then try the primary API
  return getLeagueLogo(leagueId)
}
