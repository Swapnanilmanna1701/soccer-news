"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface DebugInfoProps {
  leagueId: string
}

export function DebugInfo({ leagueId }: DebugInfoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [debugData, setDebugData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/matches/${leagueId}`)
      const data = await response.json()
      setDebugData(data)
    } catch (error) {
      setDebugData({ error: error.message })
    }
    setLoading(false)
  }

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)} className="mb-4">
        Show Debug Info
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Debug Information
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <ChevronUp className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>League ID:</strong> {leagueId}
          </div>
          <div>
            <strong>Date Range:</strong> {new Date().toISOString().split("T")[0]} to{" "}
            {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
          </div>
          <Button onClick={testAPI} disabled={loading}>
            {loading ? "Testing..." : "Test API Connection"}
          </Button>
          {debugData && (
            <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded text-xs overflow-auto">
              {JSON.stringify(debugData, null, 2)}
            </pre>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
