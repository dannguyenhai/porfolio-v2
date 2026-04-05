"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 20000;
const BRANCHES = 3;

const vertexShader = /* glsl */ `
  attribute float aBranchAngle;
  attribute float aRadiusRatio;
  attribute vec3  aRandomOffset;
  attribute float aSize;

  uniform float uTime;
  uniform float uParticleSize;

  varying float vRadiusRatio;

  void main() {
    vRadiusRatio = aRadiusRatio;

    // Spiral: inner particles orbit faster (matches TSL original)
    float radius = pow(aRadiusRatio, 1.5) * 5.0;
    float angle  = aBranchAngle + uTime * (1.0 - aRadiusRatio);

    vec3 pos = vec3(
      cos(angle) * radius,
      0.0,
      sin(angle) * radius
    ) + aRandomOffset * (aRadiusRatio + 0.2);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position  = projectionMatrix * mvPos;

    // Screen-space point size with distance attenuation
    gl_PointSize = uParticleSize * aSize * (200.0 / -mvPos.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 12.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorInner;
  uniform vec3 uColorOuter;

  varying float vRadiusRatio;

  void main() {
    // Soft glow: same formula as TSL original  0.1/dist - 0.2
    vec2  uv   = gl_PointCoord - 0.5;
    float dist = length(uv);
    float alpha = 0.1 / dist - 0.2;
    if (alpha <= 0.0) discard;

    vec3 color = mix(uColorInner, uColorOuter, vRadiusRatio);
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`;

export default function GalaxyEffect() {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, uniforms } = useMemo(() => {
    const branchAngles   = new Float32Array(PARTICLE_COUNT);
    const radiusRatios   = new Float32Array(PARTICLE_COUNT);
    const randomOffsets  = new Float32Array(PARTICLE_COUNT * 3);
    const sizes          = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const branch      = i % BRANCHES;
      const branchAngle = (branch / BRANCHES) * Math.PI * 2;

      // Distribute radii: bias toward outer ring for visual density
      const r = Math.random();
      branchAngles[i]  = branchAngle;
      radiusRatios[i]  = r;
      sizes[i]         = Math.random();

      // pow3 distribution (matches TSL range().pow3()) — biased toward center
      const rx = Math.pow((Math.random() * 2 - 1), 3);
      const ry = Math.pow((Math.random() * 2 - 1), 3);
      const rz = Math.pow((Math.random() * 2 - 1), 3);
      randomOffsets[i * 3]     = rx;
      randomOffsets[i * 3 + 1] = ry;
      randomOffsets[i * 3 + 2] = rz;
    }

    const geo = new THREE.BufferGeometry();
    // Dummy position buffer (position computed entirely in vertex shader)
    geo.setAttribute("position",      new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3));
    geo.setAttribute("aBranchAngle",  new THREE.BufferAttribute(branchAngles,  1));
    geo.setAttribute("aRadiusRatio",  new THREE.BufferAttribute(radiusRatios,  1));
    geo.setAttribute("aRandomOffset", new THREE.BufferAttribute(randomOffsets, 3));
    geo.setAttribute("aSize",         new THREE.BufferAttribute(sizes, 1));

    const uni = {
      uTime:         { value: 0 },
      uParticleSize: { value: 0.6 },
      uColorInner:   { value: new THREE.Color("#ffa575") },
      uColorOuter:   { value: new THREE.Color("#311599") },
    };

    return { geometry: geo, uniforms: uni };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        blending:     THREE.AdditiveBlending,
        depthWrite:   false,
        transparent:  true,
      }),
    [uniforms]
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime * 0.2;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      rotation={[-Math.PI * 0.15, 0, 0]}
    />
  );
}
