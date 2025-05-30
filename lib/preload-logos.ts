import { popularTeamLogos, popularLeagueLogos } from "./logos"

// Preload popular logos to improve performance
export function preloadPopularLogos() {
  if (typeof window !== "undefined") {
    // Preload league logos
    Object.values(popularLeagueLogos).forEach((url) => {
      const img = new Image()
      img.src = url
    })

    // Preload team logos
    Object.values(popularTeamLogos).forEach((url) => {
      const img = new Image()
      img.src = url
    })
  }
}
