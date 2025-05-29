import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Match } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMatchTime(utcDate: string): string {
  const date = new Date(utcDate)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

export function formatMatchDate(utcDate: string): string {
  const date = new Date(utcDate)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

export function formatDateHeading(dateKey: string): string {
  const date = new Date(dateKey)
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const todayStr = today.toISOString().split("T")[0]
  const tomorrowStr = tomorrow.toISOString().split("T")[0]

  if (dateKey === todayStr) {
    return "Today"
  } else if (dateKey === tomorrowStr) {
    return "Tomorrow"
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }
}

export function groupMatchesByDate(matches: Match[]): Record<string, Match[]> {
  return matches.reduce(
    (groups, match) => {
      const date = new Date(match.utcDate).toISOString().split("T")[0]
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(match)
      return groups
    },
    {} as Record<string, Match[]>,
  )
}
