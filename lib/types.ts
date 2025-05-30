export interface Team {
  id: number
  name: string
  shortName?: string
}

export interface Score {
  home: number | null
  away: number | null
}

export interface Match {
  id: number
  status: string
  utcDate: string
  homeTeam: Team
  awayTeam: Team
  competition?: string
  score?: Score | null
}

export interface League {
  id: string
  name: string
  shortName?: string
  country?: string
}

export type MatchStatus =
  | "SCHEDULED"
  | "TIMED"
  | "IN_PLAY"
  | "PAUSED"
  | "FINISHED"
  | "POSTPONED"
  | "SUSPENDED"
  | "CANCELLED"
