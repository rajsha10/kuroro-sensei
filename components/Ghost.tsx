"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshTransmissionMaterial } from "@react-three/drei"
import { Vector3 } from "three"
import { motion } from "framer-motion-3d"

export default function Ghost({ progress = 0 }) {
  const ghostRef = useRef()
  const eyeLeftRef = useRef()
  const eyeRightRef = useRef()

  // Ghost body vertices for the bottom part (tentacles)
  const tentacleVertices = useMemo(() => {
    const vertices = []
    const segments = 5
    const radius = 0.8

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI
      const x = Math.cos(angle) * radius
      const y = -1.2
      const z = Math.sin(angle) * radius
      vertices.push(new Vector3(x, y, z))
    }

    return vertices
  }, [])

  // Animation
  useFrame((state, delta) => {
    if (ghostRef.current) {
      // Subtle floating movement
      ghostRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1

      // Subtle rotation
      ghostRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }

    // Eye movement
    if (eyeLeftRef.current && eyeRightRef.current) {
      const eyeMovement = Math.sin(state.clock.elapsedTime * 2) * 0.05
      eyeLeftRef.current.position.x = -0.25 + eyeMovement
      eyeRightRef.current.position.x = 0.25 + eyeMovement

      // Occasional blink
      if (Math.sin(state.clock.elapsedTime * 3) > 0.99) {
        eyeLeftRef.current.scale.y = 0.1
        eyeRightRef.current.scale.y = 0.1
      } else {
        eyeLeftRef.current.scale.y = 1
        eyeRightRef.current.scale.y = 1
      }
    }
  })

  return (
    <motion.group
      ref={ghostRef}
      initial={{ scale: 0, rotateY: 0 }}
      animate={{
        scale: 1,
        rotateY: 2 * Math.PI,
      }}
      transition={{
        duration: 1.5,
        ease: "easeOut",
      }}
    >
      {/* Ghost body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.95}
          chromaticAberration={0.2}
          anisotropy={0.5}
          color="#000000"
          attenuationColor="#ffffff"
          attenuationDistance={0.2}
          opacity={0.8}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
        />
      </mesh>

      {/* Ghost tentacles */}
      {tentacleVertices.map((vertex, i) => (
        <motion.mesh
          key={i}
          position={[vertex.x, vertex.y, vertex.z]}
          initial={{ y: vertex.y - 0.5 }}
          animate={{ y: vertex.y + Math.sin(i * 0.5) * 0.2 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5 + i * 0.2,
            repeatType: "reverse",
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#000000" opacity={0.8} transparent />
        </motion.mesh>
      ))}

      {/* Eyes */}
      <motion.mesh
        ref={eyeLeftRef}
        position={[-0.25, 0.1, 0.85]}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </motion.mesh>

      <motion.mesh
        ref={eyeRightRef}
        position={[0.25, 0.1, 0.85]}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </motion.mesh>

      {/* Progress indicator particles */}
      {Array.from({ length: 10 }).map((_, i) => {
        const showParticle = (progress / 100) * 10 > i
        return (
          <motion.mesh
            key={`particle-${i}`}
            position={[Math.sin((i / 10) * Math.PI * 2) * 1.8, Math.cos((i / 10) * Math.PI * 2) * 1.8, 0]}
            initial={{ scale: 0 }}
            animate={{ scale: showParticle ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#8364ff" emissive="#8364ff" emissiveIntensity={2} />
          </motion.mesh>
        )
      })}
    </motion.group>
  )
}
