import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// 1. The Black & White Earth
const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null)

  // Auto-rotate the Earth
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001
    }
  })

  // Load a map texture from a remote URL to show the city lights / continents
  const map = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png')

  return (
    <group>
      {/* Black solid core */}
      <Sphere args={[1.98, 32, 32]}>
        <meshBasicMaterial color="#000000" />
      </Sphere>
      
      {/* City lights map layer */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshBasicMaterial 
          map={map}
          blending={THREE.AdditiveBlending}
          transparent={true}
          opacity={0.8}
        />
      </Sphere>

      {/* Subtle outer wireframe */}
      <Sphere args={[2.02, 32, 32]}>
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.1} />
      </Sphere>
    </group>
  )
}

// 2. The Neural Network / Node Constellation
const ParticleNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Create random points distributed around the Earth
  const particlesCount = 400
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 2.2 + Math.random() * 1.5 // Distance from globe

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [])

  // Rotate constellation & react slightly to mouse position
  const { mouse } = useThree()
  useFrame((_) => {
    if (pointsRef.current) {
      // Auto-rotation
      pointsRef.current.rotation.y -= 0.0005
      pointsRef.current.rotation.x -= 0.0002
      
      // Mouse interaction (subtle attraction/shift based on mouse)
      const targetX = (mouse.x * Math.PI) / 10
      const targetY = (mouse.y * Math.PI) / 10
      
      pointsRef.current.rotation.x += 0.05 * (targetY - pointsRef.current.rotation.x)
      pointsRef.current.rotation.y += 0.05 * (targetX - pointsRef.current.rotation.y)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// 3. Main Scene Container
export default function EarthNetwork() {
  return (
    <div className="absolute inset-0 w-full h-full bg-transparent cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <fog attach="fog" args={['#161616', 4.2, 12]} />
        <ambientLight intensity={0.5} />
        
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
        <ParticleNetwork />
        
        {/* Allows user to drag/rotate the globe with their mouse */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.5}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
