"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OfficialLogoProps {
  name: string
  type: "team" | "league"
  primarySrc: string
  alternativeSrc: string
  backupSrc: string
  width: number
  height: number
  className?: string
}

export function OfficialLogo({
  name,
  type,
  primarySrc,
  alternativeSrc,
  backupSrc,
  width,
  height,
  className,
}: OfficialLogoProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(primarySrc)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorCount, setErrorCount] = useState<number>(0)

  useEffect(() => {
    // Reset when primary source changes
    setCurrentSrc(primarySrc)
    setErrorCount(0)
    setIsLoading(true)
  }, [primarySrc])

  const handleError = () => {
    if (errorCount === 0) {
      // Try alternative source
      setCurrentSrc(alternativeSrc)
      setErrorCount(1)
    } else if (errorCount === 1) {
      // Try backup source
      setCurrentSrc(backupSrc)
      setErrorCount(2)
    }
    // If backup also fails, the Image component will show the default error state
  }

  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-700 rounded-full animate-pulse flex items-center justify-center">
          <span className="text-xs text-gray-300 opacity-50">{name.substring(0, 1)}</span>
        </div>
      )}
      <Image
        src={currentSrc || "/placeholder.svg"}
        alt={name}
        width={width}
        height={height}
        className={cn(
          "object-contain transition-opacity duration-300 rounded-full",
          isLoading ? "opacity-0" : "opacity-100",
        )}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
        unoptimized
      />
    </div>
  )
}
