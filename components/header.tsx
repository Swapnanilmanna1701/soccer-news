import { Play } from "lucide-react"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-black to-green-800 text-white py-4 px-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Play className="w-5 h-5 text-black fill-current" />
          </div>
          <h1 className="text-2xl font-bold">FootballTracker</h1>
        </div>
        <div className="text-sm text-green-200">Live Football Matches & Schedules</div>
      </div>
    </header>
  )
}
