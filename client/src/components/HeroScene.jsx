import { Float, PerspectiveCamera, Stars, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const frames = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=700&q=80'
];

function PhotoFrame({ url, position, rotation, scale = 1, floatSpeed = 1.4 }) {
  const texture = useTexture(url);
  const mesh = useRef();
  const borderRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    // Smooth interactive cursor tracking & gentle tidal floating math
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, rotation[1] + pointer.x * 0.18 + Math.sin(t + position[0]) * 0.04, 0.05);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, rotation[0] - pointer.y * 0.12 + Math.cos(t * 0.8 + position[1]) * 0.03, 0.05);
    
    // Pulse gold border emissive intensity
    if (borderRef.current) {
      borderRef.current.emissiveIntensity = 0.35 + Math.sin(t * 2 + position[0]) * 0.25;
    }
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.25} floatIntensity={0.85}>
      <group ref={mesh} position={position} rotation={rotation} scale={scale}>
        {/* Outer Champagne Gold Frame with luxury rim glow */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[2.24, 2.88, 0.1]} />
          <meshStandardMaterial
            ref={borderRef}
            color="#f4d690"
            metalness={0.85}
            roughness={0.15}
            emissive="#f4d690"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Inner shadow backplate */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[2.08, 2.72]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* High-definition rendered photo */}
        <mesh>
          <planeGeometry args={[2, 2.64]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingBokeh() {
  const group = useRef();
  const bokehCount = 15;
  
  const items = useMemo(() => {
    return Array.from({ length: bokehCount }).map(() => ({
      pos: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 - 1
      ],
      scale: 0.25 + Math.random() * 0.45,
      speed: 0.3 + Math.random() * 0.6,
      offset: Math.random() * Math.PI * 2
    }));
  }, [bokehCount]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const data = items[i];
      if (data) {
        child.position.y = data.pos[1] + Math.sin(t * data.speed + data.offset) * 0.6;
        child.rotation.z = t * (data.speed * 0.3);
      }
    });
  });

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <mesh key={i} position={item.pos} scale={[item.scale, item.scale, 1]}>
          <ringGeometry args={[0.3, 0.45, 16]} />
          <meshBasicMaterial
            color={i % 2 ? '#f4d690' : '#a889ff'}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const ref = useRef();
  const positions = useMemo(() => {
    const array = new Float32Array(1200);
    for (let i = 0; i < array.length; i += 3) {
      array[i] = (Math.random() - 0.5) * 18;
      array[i + 1] = (Math.random() - 0.5) * 12;
      array[i + 2] = (Math.random() - 0.5) * 10;
    }
    return array;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.02;
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#f4d690" size={0.022} transparent opacity={0.75} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Scene({ isMobile }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7.2]} fov={45} />
      <ambientLight intensity={1.1} />
      <pointLight position={[5, 4, 6]} color="#f4d690" intensity={4.5} distance={15} />
      <pointLight position={[-5, -2, 4]} color="#a889ff" intensity={3.0} distance={12} />
      <pointLight position={[0, 3, -2]} color="#ffffff" intensity={2.0} distance={10} />
      <Particles />
      <FloatingBokeh />
      <Stars radius={45} depth={25} count={850} factor={3.5} saturation={1} fade speed={0.6} />
      {/* Only render 3D PhotoFrames on desktop screens so no dark boxes obstruct mobile typography */}
      {!isMobile && (
        <>
          <PhotoFrame url={frames[0]} position={[-2.7, 0.25, 0.1]} rotation={[0.05, 0.36, -0.07]} scale={1.1} floatSpeed={1.5} />
          <PhotoFrame url={frames[1]} position={[0.45, -0.08, -0.75]} rotation={[0.02, -0.06, 0.04]} scale={1.25} floatSpeed={1.2} />
          <PhotoFrame url={frames[2]} position={[3.2, 0.3, -0.2]} rotation={[-0.05, -0.4, 0.08]} scale={1.05} floatSpeed={1.7} />
        </>
      )}
    </>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas gl={{ antialias: !isMobile, alpha: true }} dpr={isMobile ? [1, 1.25] : [1, 2]}>
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/50 to-ink pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink via-ink/80 to-transparent pointer-events-none" />
    </div>
  );
}
