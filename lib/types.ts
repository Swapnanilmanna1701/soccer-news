export interface Team {
  id: number
  name: string
  shortName?: string
}

export interface Match {
  id: number
  status: string
  utcDate: string
  homeTeam: Team
  awayTeam: Team
  competition?: string
}

export interface League {
  id: string
  name: string
  shortName?: string
  country?: string
}
