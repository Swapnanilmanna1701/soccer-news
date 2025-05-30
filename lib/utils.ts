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

// Helper function to check if a date is today
export function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

// Helper function to check if a date is tomorrow
export function isTomorrow(date: Date): boolean {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  )
}

// Helper function to format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((date.getTime() - now.getTime()) / (1000 * 60))

  if (diffInMinutes < 0) {
    return "Started"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours}h`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days}d`
  }
}
