"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface DynamicLogoProps {
  name: string
  type: "team" | "league"
  primarySrc: string
  alternativeSrc?: string
  width: number
  height: number
  className?: string
}

export function DynamicLogo({ name, type, primarySrc, alternativeSrc, width, height, className }: DynamicLogoProps) {
  const [currentSrc, setCurrentSrc] = useState(primarySrc)
  const [isLoading, setIsLoading] = useState(true)
  const [errorCount, setErrorCount] = useState(0)

  useEffect(() => {
    setCurrentSrc(primarySrc)
    setErrorCount(0)
    setIsLoading(true)
  }, [primarySrc])

  const handleError = () => {
    if (errorCount === 0 && alternativeSrc) {
      // Try alternative source
      setCurrentSrc(alternativeSrc)
      setErrorCount(1)
    } else {
      // Generate backup logo
      const initials = name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .substring(0, 3)
        .toUpperCase()

      const colors =
        type === "team"
          ? ["22c55e", "16a34a", "15803d", "166534", "14532d"]
          : ["000000", "1f2937", "374151", "4b5563", "6b7280"]

      const colorIndex = name.length % colors.length
      const bgColor = colors[colorIndex]

      setCurrentSrc(
        `https://ui-avatars.com/api/?name=${initials}&background=${bgColor}&color=fff&size=${width}&fontSize=0.4&bold=true`,
      )
      setErrorCount(2)
    }
  }

  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      {isLoading && <div className="absolute inset-0 bg-gray-700 rounded-full animate-pulse" />}
      <Image
        src={currentSrc || "/placeholder.svg"}
        alt={name}
        width={width}
        height={height}
        className={cn("object-contain transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
        unoptimized
      />
    </div>
  )
}
