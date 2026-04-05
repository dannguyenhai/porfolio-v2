"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import GalaxyEffect from "./GalaxyEffect";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [4, 2, 5], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#100818"]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.4}
      />
      <Suspense fallback={null}>
        <GalaxyEffect />
      </Suspense>
    </Canvas>
  );
}
