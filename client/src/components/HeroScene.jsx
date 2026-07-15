import { Float, PerspectiveCamera, Stars, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

const frames = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=700&q=80'
];

function PhotoFrame({ url, position, rotation, scale = 1 }) {
  const texture = useTexture(url);
  const mesh = useRef();

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = rotation[1] + pointer.x * 0.12 + Math.sin(clock.elapsedTime + position[0]) * 0.035;
    mesh.current.rotation.x = rotation[0] - pointer.y * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.65}>
      <group ref={mesh} position={position} rotation={rotation} scale={scale}>
        <mesh position={[0, 0, -0.03]}>
          <boxGeometry args={[2.18, 2.82, 0.08]} />
          <meshStandardMaterial color="#f4d690" metalness={0.65} roughness={0.18} />
        </mesh>
        <mesh>
          <planeGeometry args={[2, 2.64]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  const ref = useRef();
  const positions = useMemo(() => {
    const array = new Float32Array(900);
    for (let i = 0; i < array.length; i += 3) {
      array[i] = (Math.random() - 0.5) * 15;
      array[i + 1] = (Math.random() - 0.5) * 9;
      array[i + 2] = (Math.random() - 0.5) * 8;
    }
    return array;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#f4d690" size={0.018} transparent opacity={0.65} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
      <ambientLight intensity={0.9} />
      <pointLight position={[4, 3, 5]} color="#f4d690" intensity={3.5} />
      <pointLight position={[-4, -1, 3]} color="#a889ff" intensity={2.2} />
      <Particles />
      <Stars radius={40} depth={22} count={650} factor={3} saturation={0} fade speed={0.45} />
      <PhotoFrame url={frames[0]} position={[-2.6, 0.2, 0]} rotation={[0.04, 0.34, -0.08]} scale={1.08} />
      <PhotoFrame url={frames[1]} position={[0.45, -0.05, -0.65]} rotation={[0.02, -0.06, 0.04]} scale={1.22} />
      <PhotoFrame url={frames[2]} position={[3.1, 0.25, -0.15]} rotation={[-0.04, -0.38, 0.09]} scale={1.02} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.6]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/50 to-ink" />
    </div>
  );
}
