"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text } from "@react-three/drei"
import { motion } from "framer-motion"
import Ghost from "./Ghost"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#050510"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} color="#8364ff" intensity={0.5} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Ghost progress={progress} />
        </Float>

        <Text
          position={[0, -2, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Regular.json"
        >
          {`Loading... ${progress}%`}
        </Text>

        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <motion.div
        className="absolute bottom-10 left-0 right-0 h-1 bg-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </div>
  )
}
