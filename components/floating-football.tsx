"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingFootballProps {
  size?: number
  className?: string
}

export function FloatingFootball({ size = 60, className }: FloatingFootballProps) {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={{
          y: [0, -8, 0],
          rotate: [0, 360],
        }}
        transition={{
          y: {
            duration: 3,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          },
          rotate: {
            duration: 8,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          },
        }}
      >
        {/* Football sphere */}
        <div
          className="relative rounded-full bg-gradient-to-br from-white via-gray-100 to-gray-300 shadow-lg"
          style={{
            width: size,
            height: size,
            background: `
              radial-gradient(circle at 25% 25%, #ffffff 0%, #f8f8f8 30%, #e8e8e8 70%, #d0d0d0 100%)
            `,
            boxShadow: `
              0 ${size * 0.08}px ${size * 0.15}px rgba(0,0,0,0.2),
              inset 0 ${size * 0.03}px ${size * 0.08}px rgba(255,255,255,0.6)
            `,
          }}
        >
          {/* Football pattern */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Center pentagon */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black"
              style={{
                width: size * 0.18,
                height: size * 0.18,
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
            />

            {/* Surrounding pattern */}
            {[0, 60, 120, 180, 240, 300].map((angle, index) => (
              <div
                key={index}
                className="absolute bg-black"
                style={{
                  width: size * 0.12,
                  height: size * 0.12,
                  clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                  top: "25%",
                  left: "50%",
                  transformOrigin: `0 ${size * 0.25}px`,
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                }}
              />
            ))}
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute bg-white rounded-full blur-sm"
            style={{
              width: size * 0.15,
              height: size * 0.15,
              top: size * 0.15,
              left: size * 0.2,
              opacity: 0.6,
            }}
            animate={{
              opacity: [0.6, 0.9, 0.6],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}
