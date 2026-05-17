import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function GeometricObject() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.1;
      coreRef.current.position.y = Math.sin(time) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.2;
      ringRef.current.rotation.z = time * 0.15;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -time * 0.25;
      ringRef2.current.rotation.z = -time * 0.1;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        {/* Chrome Core */}
        <Sphere ref={coreRef} args={[0.8, 64, 64]}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.05}
            envMapIntensity={2}
          />
        </Sphere>
        
        {/* Outer Glass Ring 1 */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.5, 0.015, 32, 100]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={1}
            thickness={2}
            roughness={0}
            metalness={0.1}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Outer Glass Ring 2 */}
        <mesh ref={ringRef2}>
          <torusGeometry args={[1.8, 0.005, 32, 100]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            wireframe
          />
        </mesh>

        {/* Ambient Glow */}
        <Sphere args={[0.9, 32, 32]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Hero3DModel() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas gl={{ antialias: true, stencil: false, depth: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <spotLight
          position={[-5, 5, 10]}
          angle={0.2}
          penumbra={1}
          intensity={5}
          color="#ffffff"
        />
        
        <GeometricObject />

        <EffectComposer multisampling={4}>
          <Bloom 
            luminanceThreshold={0.5} 
            mipmapBlur 
            intensity={0.8} 
            radius={0.3}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
