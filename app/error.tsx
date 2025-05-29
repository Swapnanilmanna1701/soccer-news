"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">We encountered an error while loading the page.</p>
      <div className="flex gap-4">
        <Button onClick={reset}>Try again</Button>
        <Link href="/" passHref>
          <Button variant="outline">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}
