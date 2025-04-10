"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, OrbitControls, Environment } from "@react-three/drei"
import type { Group } from "three"

interface ModelProps {
  url: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

function Model({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: ModelProps) {
  const group = useRef<Group>(null)
  const { scene } = useGLTF(url)

  // Simple animation
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1
      group.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

export function CharacterModel({
  url = "/assets/3d/duck.glb",
  scale = 2,
  position = [0, -1, 0],
  rotation = [0, 0, 0],
  className = "",
}: ModelProps & { className?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Model url={url} scale={scale} position={position} rotation={rotation} />
        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
