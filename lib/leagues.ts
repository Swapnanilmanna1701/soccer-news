import type { League } from "./types"

const leagues: Record<string, League> = {
  PL: {
    id: "PL",
    name: "Premier League",
    shortName: "PL",
    country: "England",
  },
  PD: {
    id: "PD",
    name: "La Liga",
    shortName: "La Liga",
    country: "Spain",
  },
  SA: {
    id: "SA",
    name: "Serie A",
    shortName: "SA",
    country: "Italy",
  },
  BL1: {
    id: "BL1",
    name: "Bundesliga",
    shortName: "BL1",
    country: "Germany",
  },
  FL1: {
    id: "FL1",
    name: "Ligue 1",
    shortName: "L1",
    country: "France",
  },
  CL: {
    id: "CL",
    name: "Champions League",
    shortName: "UCL",
  },
  SPL: {
    id: "SPL",
    name: "Saudi Pro League",
    shortName: "SPL",
    country: "Saudi Arabia",
  },
}

export function getLeagueInfo(leagueId: string): League | undefined {
  return leagues[leagueId]
}
