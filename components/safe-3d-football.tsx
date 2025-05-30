"use client"

import { Suspense, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { CSSFootball } from "./css-football"

// Dynamically import Three.js components to avoid SSR issues
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
  loading: () => <CSSFootball />,
})

const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => mod.OrbitControls), {
  ssr: false,
})

function SimpleFootball() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} map={null} />
      {/* Add some black patches to make it look like a football */}
      <mesh position={[0.3, 0.3, 0.8]}>
        <circleGeometry args={[0.2, 6]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.3, -0.3, 0.8]}>
        <circleGeometry args={[0.2, 6]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.5, -0.2, 0.6]}>
        <circleGeometry args={[0.15, 5]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </mesh>
  )
}

function AnimatedFootball() {
  const [rotation, setRotation] = useState([0, 0, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => [prev[0], prev[1] + 0.02, prev[2]])
    }, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <mesh rotation={rotation}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      {/* Football pattern */}
      <mesh position={[0.3, 0.3, 0.8]}>
        <circleGeometry args={[0.2, 6]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.3, -0.3, 0.8]}>
        <circleGeometry args={[0.2, 6]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </mesh>
  )
}

interface Safe3DFootballProps {
  size?: number
  className?: string
}

export function Safe3DFootball({ size = 60, className }: Safe3DFootballProps) {
  const [hasError, setHasError] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || hasError) {
    return <CSSFootball size={size} className={className} />
  }

  return (
    <div className={className} style={{ width: size, height: size }}>
      <Suspense fallback={<CSSFootball size={size} />}>
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }} onError={() => setHasError(true)}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <AnimatedFootball />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </Suspense>
    </div>
  )
}
