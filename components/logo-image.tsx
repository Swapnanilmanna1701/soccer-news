"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoImageProps {
  src: string
  fallbackSrc: string
  alt: string
  width: number
  height: number
  className?: string
}

export function LogoImage({ src, fallbackSrc, alt, width, height, className }: LogoImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [hasErrored, setHasErrored] = useState(false)

  const handleError = () => {
    if (!hasErrored) {
      setCurrentSrc(fallbackSrc)
      setHasErrored(true)
    }
  }

  return (
    <Image
      src={currentSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-contain", className)}
      onError={handleError}
      unoptimized
    />
  )
}
