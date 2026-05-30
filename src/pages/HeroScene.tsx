import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  Environment,
  Float,
  Html,
  Lightformer,
  MeshTransmissionMaterial,
  RoundedBox,
} from '@react-three/drei';
import * as THREE from 'three';
import {
  Atom,
  BrainCircuit,
  Infinity as InfinityIcon,
  Server,
  Smartphone,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { upnextLogo } from '../brand';

type HeroSceneProps = {
  navigate: (path: string) => void;
};

type HeroNode = {
  key: string;
  label: string;
  icon: ReactNode;
  query: string;
  /** 3D position of the floating label, in scene units. */
  position: [number, number, number];
  accent: string;
};

const heroNodes: HeroNode[] = [
  {
    key: 'frontend',
    label: 'Frontend',
    icon: <Atom size={18} />,
    query: 'position=Frontend Developer',
    position: [1.15, 1.75, 0.2],
    accent: '#149eca',
  },
  {
    key: 'backend',
    label: 'Backend',
    icon: <Server size={18} />,
    query: 'position=Backend Developer',
    position: [2.55, 0.1, -0.2],
    accent: '#1f9d55',
  },
  {
    key: 'devops',
    label: 'DevOps',
    icon: <InfinityIcon size={18} />,
    query: 'position=DevOps Engineer',
    position: [1.35, -1.85, 0.1],
    accent: '#2563eb',
  },
  {
    key: 'mobile',
    label: 'Mobile',
    icon: <Smartphone size={18} />,
    query: 'position=Mobile Developer',
    position: [-2.45, -1.7, 0.1],
    accent: '#475569',
  },
  {
    key: 'ai-data',
    label: 'AI / Data',
    icon: <BrainCircuit size={18} />,
    query: 'position=AI%2FML Engineer',
    position: [-2.75, 0.25, -0.2],
    accent: '#b5179e',
  },
];

/** Slow, eased pointer-follow rig so the whole assembly reacts to the cursor. */
function ParallaxRig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetY = state.pointer.x * 0.35;
    const targetX = -state.pointer.y * 0.22;
    // Critically damped lerp toward the pointer for smooth, lag-free motion.
    const damp = 1 - Math.pow(0.0008, delta);
    group.current.rotation.y += (targetY - group.current.rotation.y) * damp;
    group.current.rotation.x += (targetX - group.current.rotation.x) * damp;
  });

  return <group ref={group}>{children}</group>;
}

/** The frosted-glass core tile with the extruded brand mark on its face. */
function GlassCore() {
  const logoTexture = useLoader(THREE.TextureLoader, upnextLogo.icon);

  useMemo(() => {
    logoTexture.anisotropy = 8;
    logoTexture.colorSpace = THREE.SRGBColorSpace;
  }, [logoTexture]);

  return (
    <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.5}>
      <group>
        {/* Real refractive glass slab. */}
        <RoundedBox
          args={[2.5, 2.5, 0.42]}
          radius={0.32}
          smoothness={8}
          castShadow
        >
          <MeshTransmissionMaterial
            transmission={1}
            thickness={0.85}
            roughness={0.12}
            ior={1.42}
            chromaticAberration={0.04}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            backside
            color="#e6fbf2"
            attenuationColor="#bff0db"
            attenuationDistance={1.6}
          />
        </RoundedBox>

        {/* Brand mark, sitting just in front of the glass face. */}
        <mesh position={[0, 0, 0.235]}>
          <planeGeometry args={[1.45, 1.45]} />
          <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

/** Two stacked isometric slabs forming the platform beneath the core. */
function Platform() {
  return (
    <group position={[0, -1.65, -0.2]} rotation={[-0.42, 0, 0]}>
      <RoundedBox
        args={[4.6, 3.2, 0.3]}
        radius={0.18}
        smoothness={6}
        receiveShadow
      >
        <meshStandardMaterial
          color="#d6f5e6"
          roughness={0.45}
          metalness={0.1}
          transparent
          opacity={0.92}
        />
      </RoundedBox>
      <RoundedBox
        args={[3.4, 2.4, 0.3]}
        radius={0.16}
        smoothness={6}
        position={[0.35, 0.55, 0.34]}
      >
        <meshStandardMaterial
          color="#bdeed7"
          roughness={0.4}
          metalness={0.12}
          transparent
          opacity={0.85}
        />
      </RoundedBox>
    </group>
  );
}

/** A clickable tech-stack label floating in 3D, rendered as real DOM via drei Html. */
function HeroLabel({
  node,
  navigate,
}: {
  node: HeroNode;
  navigate: (path: string) => void;
}) {
  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.7}>
      <Html
        position={node.position}
        center
        distanceFactor={8}
        zIndexRange={[20, 0]}
      >
        <button
          type="button"
          className="hero3d-label"
          onClick={() => navigate(`/candidate/jobs?${node.query}`)}
          aria-label={`Xem việc làm ${node.label}`}
        >
          <i style={{ color: node.accent, background: `${node.accent}1a` }}>
            {node.icon}
          </i>
          <span>{node.label}</span>
        </button>
      </Html>
    </Float>
  );
}

export default function HeroScene({ navigate }: HeroSceneProps) {
  return (
    <Canvas
      className="hero3d-canvas"
      shadows
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.3, 7.4], fov: 38 }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-5, 2, -3]}
        intensity={0.5}
        color="#8be3c0"
      />

      <Suspense fallback={null}>
        <ParallaxRig>
          <Platform />
          <GlassCore />
          {heroNodes.map((node) => (
            <HeroLabel key={node.key} node={node} navigate={navigate} />
          ))}
        </ParallaxRig>
        <Environment resolution={256}>
          <Lightformer
            intensity={2.2}
            position={[0, 4, 4]}
            scale={[8, 6, 1]}
            color="#ffffff"
          />
          <Lightformer
            intensity={1.3}
            position={[-5, 1, 2]}
            scale={[4, 8, 1]}
            color="#c9f4df"
          />
          <Lightformer
            intensity={1}
            position={[5, -1, 2]}
            scale={[4, 8, 1]}
            color="#e6fff4"
          />
          <Lightformer
            intensity={1}
            position={[0, -3, 1]}
            scale={[10, 4, 1]}
            color="#ffffff"
          />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
