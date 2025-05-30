"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProfessionalLogoProps {
  primarySrc: string
  backupSrc?: string
  alt: string
  width: number
  height: number
  className?: string
}

export function ProfessionalLogo({ primarySrc, backupSrc, alt, width, height, className }: ProfessionalLogoProps) {
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
    if (errorCount === 0 && backupSrc) {
      // Try backup source
      setCurrentSrc(backupSrc)
      setErrorCount(1)
    } else if (errorCount === 1) {
      // If backup also fails, use a generic placeholder
      const initials = alt
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .substring(0, 3)
        .toUpperCase()

      // Create a generic placeholder with initials
      setCurrentSrc(`https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff&size=${width}`)
      setErrorCount(2)
    }
  }

  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      {isLoading && <div className="absolute inset-0 bg-gray-800 rounded-full animate-pulse" />}
      <Image
        src={currentSrc || "/placeholder.svg"}
        alt={alt}
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
