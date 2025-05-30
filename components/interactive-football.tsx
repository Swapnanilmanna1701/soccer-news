"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface InteractiveFootballProps {
  size?: number
  className?: string
}

export function InteractiveFootball({ size = 80, className }: InteractiveFootballProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const footballVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      y: 0,
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      y: -10,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        rotate: {
          duration: 2,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        },
      },
    },
    tap: {
      scale: 0.9,
      rotate: 180,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    bounce: {
      y: [0, -20, 0, -10, 0],
      rotate: [0, 180, 360, 540, 720],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  }

  const shadowVariants = {
    initial: {
      scale: 1,
      opacity: 0.3,
    },
    hover: {
      scale: 1.4,
      opacity: 0.6,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className={cn("relative cursor-pointer", className)} style={{ width: size, height: size + 20 }}>
      {/* Shadow */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black rounded-full opacity-30 blur-sm"
        style={{ width: size * 0.8, height: size * 0.2 }}
        variants={shadowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />

      {/* Football */}
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        variants={footballVariants}
        initial="initial"
        animate={isClicked ? "bounce" : isHovered ? "hover" : "initial"}
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTap={() => {
          setIsClicked(true)
          setTimeout(() => setIsClicked(false), 1500)
        }}
      >
        {/* Main football sphere */}
        <div
          className="relative rounded-full bg-gradient-to-br from-white via-gray-100 to-gray-300 shadow-xl"
          style={{
            width: size,
            height: size,
            background: `
              radial-gradient(circle at 25% 25%, #ffffff 0%, #f8f8f8 30%, #e8e8e8 70%, #d0d0d0 100%)
            `,
            boxShadow: `
              0 ${size * 0.1}px ${size * 0.2}px rgba(0,0,0,0.3),
              inset 0 ${size * 0.05}px ${size * 0.1}px rgba(255,255,255,0.8),
              inset 0 -${size * 0.02}px ${size * 0.05}px rgba(0,0,0,0.1)
            `,
          }}
        >
          {/* Football pattern - Pentagons */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Center pentagon */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black"
              style={{
                width: size * 0.2,
                height: size * 0.2,
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
              animate={{
                rotate: isHovered ? 360 : 0,
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              }}
            />

            {/* Surrounding pentagons */}
            {[0, 72, 144, 216, 288].map((angle, index) => (
              <motion.div
                key={index}
                className="absolute bg-black"
                style={{
                  width: size * 0.15,
                  height: size * 0.15,
                  clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                  top: "30%",
                  left: "50%",
                  transformOrigin: `0 ${size * 0.2}px`,
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                }}
                animate={{
                  rotate: isHovered ? angle + 360 : angle,
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                }}
              />
            ))}

            {/* Hexagon lines connecting pentagons */}
            {[30, 102, 174, 246, 318].map((angle, index) => (
              <div
                key={`line-${index}`}
                className="absolute bg-black"
                style={{
                  width: size * 0.25,
                  height: 2,
                  top: "50%",
                  left: "50%",
                  transformOrigin: "0 0",
                  transform: `translateY(-1px) rotate(${angle}deg)`,
                }}
              />
            ))}
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute bg-white rounded-full blur-sm"
            style={{
              width: size * 0.2,
              height: size * 0.2,
              top: size * 0.15,
              left: size * 0.2,
              opacity: 0.7,
            }}
            animate={{
              opacity: isHovered ? [0.7, 1, 0.7] : 0.7,
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            }}
          />

          {/* Additional highlight */}
          <motion.div
            className="absolute bg-white rounded-full blur-xs"
            style={{
              width: size * 0.1,
              height: size * 0.1,
              top: size * 0.25,
              left: size * 0.3,
              opacity: 0.5,
            }}
            animate={{
              opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            }}
          />
        </div>
      </motion.div>

      {/* Hover text */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-green-400 font-medium whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.3 }}
      >
        {isClicked ? "⚽ Goal!" : "Click to kick!"}
      </motion.div>
    </div>
  )
}
