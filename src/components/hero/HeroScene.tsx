"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const RING_RADIUS = 1.5;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aRand;
  attribute float aAccent;
  varying float vMix;
  varying float vDepth;

  void main() {
    vec3 p = position;
    // Slow travelling swell across the surface.
    float wave = sin(p.y * 3.0 + uTime * 0.6) * cos(p.x * 2.5 - uTime * 0.4);
    p *= 1.0 + 0.06 * wave * (1.0 - aAccent);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float twinkle = 0.75 + 0.25 * sin(uTime * 1.5 + aRand * 6.2831);
    gl_PointSize = uSize * twinkle * (1.0 / -mv.z);

    vMix = max(aAccent, smoothstep(0.55, 1.0, wave * 0.5 + 0.5) * aRand);
    // Points on the far side of the orb fade back.
    vDepth = smoothstep(-7.4, -4.6, mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying float vMix;
  varying float vDepth;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.36, d) * (0.14 + 0.86 * vDepth);
    gl_FragColor = vec4(mix(uColor, uAccent, vMix), alpha);
  }
`;

/** Shell of dots on a Fibonacci sphere plus one orbiting ring, in one buffer. */
function buildGeometry(shellCount: number, ringCount: number) {
  const total = shellCount + ringCount;
  const position = new Float32Array(total * 3);
  const rand = new Float32Array(total);
  const accent = new Float32Array(total);

  for (let i = 0; i < shellCount; i++) {
    const y = 1 - (2 * (i + 0.5)) / shellCount;
    const r = Math.sqrt(1 - y * y);
    const theta = i * GOLDEN_ANGLE;
    position.set([Math.cos(theta) * r, y, Math.sin(theta) * r], i * 3);
    // Deterministic pseudo-random phase per point.
    rand[i] = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
  }
  for (let j = 0; j < ringCount; j++) {
    const i = shellCount + j;
    const a = (j / ringCount) * Math.PI * 2;
    position.set([Math.cos(a) * RING_RADIUS, 0, Math.sin(a) * RING_RADIUS], i * 3);
    rand[i] = j / ringCount;
    accent[i] = 1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
  geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
  geometry.setAttribute("aAccent", new THREE.BufferAttribute(accent, 1));
  return geometry;
}

function Orb({ compact }: { compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const spin = useRef(0);

  const geometry = useMemo(
    () => (compact ? buildGeometry(1400, 90) : buildGeometry(3200, 160)),
    [compact],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 18 },
      uColor: { value: new THREE.Color("#ecebe6") },
      uAccent: { value: new THREE.Color("#a78bfa") },
    }),
    [],
  );

  // The canvas ignores pointer events, so follow the pointer at window level.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    const m = material.current;
    if (!g || !m) return;

    m.uniforms.uTime.value = state.clock.elapsedTime;
    m.uniforms.uSize.value = (compact ? 15 : 18) * state.gl.getPixelRatio();

    spin.current += delta * 0.12;
    const targetY = spin.current + pointer.current.x * 0.45 + window.scrollY * 0.0016;
    const targetX = 0.35 + pointer.current.y * 0.25;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.3]}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function HeroScene({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <Canvas
      className="animate-fade-in"
      style={{ pointerEvents: "none" }}
      dpr={[1, compact ? 1.5 : 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6], fov: 34 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <Orb compact={compact} />
    </Canvas>
  );
}
