"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);
  const targetRotation = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const targetScale = useRef(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollProgress.current = scrollY / maxScroll;

      const progress = scrollProgress.current;

      // Section 1 (0-25%): Hero - center, full size
      if (progress < 0.25) {
        const t = progress / 0.25;
        targetPosition.current.x = t * 2.5;
        targetPosition.current.y = t * 0.5;
        targetRotation.current.y = t * Math.PI;
        targetScale.current = 1 - t * 0.1;
      }
      // Section 2 (25-50%): About - move right
      else if (progress < 0.5) {
        const t = (progress - 0.25) / 0.25;
        targetPosition.current.x = 2.5 - t * 5;
        targetPosition.current.y = 0.5 - t * 0.5;
        targetRotation.current.y = Math.PI + t * Math.PI;
        targetScale.current = 0.9;
      }
      // Section 3 (50-75%): Projects - move left
      else if (progress < 0.75) {
        const t = (progress - 0.5) / 0.25;
        targetPosition.current.x = -2.5 + t * 2.5;
        targetPosition.current.y = t * -1;
        targetRotation.current.y = Math.PI * 2 + t * Math.PI;
        targetScale.current = 0.9 + t * 0.2;
      }
      // Section 4 (75-100%): Contact - center bottom
      else {
        const t = (progress - 0.75) / 0.25;
        targetPosition.current.x = 0;
        targetPosition.current.y = -1 + t * 0.5;
        targetRotation.current.y = Math.PI * 3 + t * Math.PI;
        targetScale.current = 1.1 - t * 0.1;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const lerpFactor = 1 - Math.pow(0.05, delta);

    // Smooth lerp position
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetPosition.current.x,
      lerpFactor
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetPosition.current.y,
      lerpFactor
    );

    // Smooth lerp rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      lerpFactor
    );

    // Smooth lerp scale
    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(
      currentScale,
      targetScale.current,
      lerpFactor
    );
    groupRef.current.scale.setScalar(newScale);

    // Auto rotation when idle
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef} castShadow>
          <torusKnotGeometry args={[1, 0.35, 200, 32]} />
          <MeshDistortMaterial
            color="#6c63ff"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            emissive="#2d1b8e"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}
