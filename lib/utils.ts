import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { Match } from "./types"

export function formatMatchTime(utcDateString: string): string {
  const date = new Date(utcDateString)
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })
}

export function formatMatchDate(utcDateString: string): string {
  const date = new Date(utcDateString)
  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

export function formatDateHeading(dateKey: string): string {
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const todayStr = today.toISOString().split("T")[0]
  const tomorrowStr = tomorrow.toISOString().split("T")[0]

  if (dateKey === todayStr) {
    return "Today's Matches"
  } else if (dateKey === tomorrowStr) {
    return "Tomorrow's Matches"
  } else {
    // Format the date as "Day, Month Date"
    const date = new Date(dateKey)
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }
}

export function groupMatchesByDate(matches: Match[]): Record<string, Match[]> {
  return matches.reduce((groups: Record<string, Match[]>, match) => {
    // Extract the date part from the UTC date string
    const dateKey = match.utcDate.split("T")[0]

    if (!groups[dateKey]) {
      groups[dateKey] = []
    }

    groups[dateKey].push(match)
    return groups
  }, {})
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
