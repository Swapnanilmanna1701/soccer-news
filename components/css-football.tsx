"use client"

import { cn } from "@/lib/utils"

interface CSSFootballProps {
  size?: number
  className?: string
}

export function CSSFootball({ size = 60, className }: CSSFootballProps) {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <div
        className="relative rounded-full bg-gradient-to-br from-white via-gray-100 to-gray-300 shadow-lg animate-spin-slow"
        style={{ width: size, height: size }}
      >
        {/* Football pattern */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Pentagon pattern */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-black rounded-sm transform rotate-45"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-black rounded-sm transform rotate-12"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-black rounded-sm transform -rotate-12"></div>
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-black rounded-sm transform rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-sm transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* Hexagon lines */}
          <div className="absolute top-1/4 left-1/4 w-6 h-0.5 bg-black transform rotate-45 origin-left"></div>
          <div className="absolute top-1/3 right-1/4 w-4 h-0.5 bg-black transform rotate-12 origin-left"></div>
          <div className="absolute bottom-1/3 left-1/3 w-4 h-0.5 bg-black transform -rotate-12 origin-left"></div>
        </div>

        {/* Shine effect */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-white opacity-60 rounded-full blur-sm"></div>
      </div>
    </div>
  )
}
