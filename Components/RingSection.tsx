"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import "./RingSection.css"
import Image from "next/image"
import { openEmail } from '../lib/utils';
import { GlowingEffect } from "./GlowingEffect"

function ParticleSphere() {
  const PARTICLE_COUNT = 1500
  const PARTICLE_SIZE_MIN = 0.005
  const PARTICLE_SIZE_MAX = 0.010
  const SPHERE_RADIUS = 9
  const POSITION_RANDOMNESS = 4
  const ROTATION_SPEED_X = 0.0
  const ROTATION_SPEED_Y = 0.0005
  const PARTICLE_OPACITY = 1

  const IMAGE_COUNT = 24
  const IMAGE_SIZE = 1.5

  const groupRef = useRef<THREE.Group>(null)

  const textures = useMemo(() => {
    const urls = [
      "/project1.webp",
      "/project1.webp",
      "/project2.webp",
      "/project3.webp",
      "/project3.webp",
      "/project3.webp",
      "/project2.webp",
      "/project2.webp",
      "/project3.webp",
      "/project3.webp",
      "/project2.webp",
      "/project2.webp",
      "/project2.webp",
      "/project1.webp",
      "/project1.webp",
      "/project3.webp",
      "/project3.webp",
      "/project2.webp",
      "/project1.webp",
      "/project2.webp",
      "/project1.webp",
      "/project1.webp",
      "/project2.webp",
      "/project1.webp",
    ]

    const loader = new THREE.TextureLoader()
    const loaded = urls.map((u) => {
      const tx = loader.load(u)
      tx.wrapS = THREE.ClampToEdgeWrapping
      tx.wrapT = THREE.ClampToEdgeWrapping
      tx.flipY = false
      return tx
    })

    return loaded
  }, [])

  useMemo(() => {
    textures.forEach((texture) => {
      if (texture) {
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping
        texture.flipY = false
      }
    })
  }, [textures])

  const particles = useMemo(() => {
    const particles = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi

      const radiusVariation = SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS

      const x = radiusVariation * Math.cos(theta) * Math.sin(phi)
      const y = radiusVariation * Math.cos(phi)
      const z = radiusVariation * Math.sin(theta) * Math.sin(phi)

      particles.push({
        position: [x, y, z],
        scale: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
        color: new THREE.Color().setHSL(
          Math.random() * 0.1 + 0.05,
          0.8,
          0.6 + Math.random() * 0.3,
        ),
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      })
    }

    return particles
  }, [PARTICLE_COUNT, SPHERE_RADIUS, POSITION_RANDOMNESS, PARTICLE_SIZE_MIN, PARTICLE_SIZE_MAX])

  const orbitingImages = useMemo(() => {
    const images = []

    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2
      const x = SPHERE_RADIUS * Math.cos(angle)
      const y = 0
      const z = SPHERE_RADIUS * Math.sin(angle)

      const position = new THREE.Vector3(x, y, z)
      const center = new THREE.Vector3(0, 0, 0)
      const outwardDirection = position.clone().sub(center).normalize()

      const euler = new THREE.Euler()
      const matrix = new THREE.Matrix4()
      matrix.lookAt(position, position.clone().add(outwardDirection), new THREE.Vector3(0, 1, 0))
      euler.setFromRotationMatrix(matrix)

      euler.z += Math.PI

      images.push({
        position: [x, y, z],
        rotation: [euler.x, euler.y, euler.z],
        textureIndex: i % textures.length,
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
      })
    }

    return images
  }, [IMAGE_COUNT, SPHERE_RADIUS, textures.length])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED_Y
      groupRef.current.rotation.x += ROTATION_SPEED_X
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position as [number, number, number]} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={particle.color} transparent opacity={PARTICLE_OPACITY} />
        </mesh>
      ))}

      {orbitingImages.map((image, index) => (
        <mesh key={`image-${index}`} position={image.position as [number, number, number]} rotation={image.rotation as [number, number, number]}>
          <planeGeometry args={[IMAGE_SIZE, IMAGE_SIZE]} />
          <meshBasicMaterial map={textures[image.textureIndex]} opacity={1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

export function RingSection() {
  const projectCount = 24

  const stats = [
    { number: '24+', label: 'Projectos' },
    { number: '2+', label: 'Anos' },
    { number: '100%', label: 'Satisfação' },
  ]

  return (
    <div className="ring-section-container">
      <h2 className="ring-section-title mt-88">
        Projectos que impactam
        <br />
        <span className="fade-text">Angola</span>
      </h2>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 20], fov: 50 }}
      >
        <ParticleSphere />
      </Canvas>

      <div className="ring-section-counter">+{projectCount}</div>

      <div className="ring-section-content">
        <div className="ring-section-description">
          <h3>Transformando Ideias em Realidade</h3>
          <p>Desenvolvemos soluções digitais inovadoras que impulsionam negócios em Angola e além.</p>
          <p>Com foco em qualidade, design e tecnologia de ponta, criamos experiências digitais memoráveis.</p>
        </div>

        <div className="ring-stats-grid">
          {stats.map((stat, idx) => (
            <GlowingEffect key={idx} className="ring-stat-card">
              <div className="ring-stat-number">{stat.number}</div>
              <div className="ring-stat-label">{stat.label}</div>
            </GlowingEffect>
          ))}
        </div>

        <div className="ring-cta-buttons">
          <button className="button" onClick={() => openEmail()}>
            <span className="blob1" aria-hidden />
            <span className="inner flex items-center gap-2">
              Pedir um software
              <Image
                src="/right-up1.png"
                alt="arrow"
                width={80}
                height={80}
                className="w-4 h-4"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
