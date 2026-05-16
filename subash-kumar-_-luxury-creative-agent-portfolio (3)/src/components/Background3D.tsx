import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Points, PointMaterial, Float, Sphere, Torus, Box, MeshDistortMaterial, MeshWobbleMaterial, Plane, TorusKnot } from '@react-three/drei';

function Aurora() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <MeshDistortMaterial
        color="#ffffff"
        speed={1}
        distort={0.6}
        radius={1}
        transparent
        opacity={0.02}
        wireframe={false}
      />
    </mesh>
  );
}

function ShadowCatcher() {
  return (
    <Plane args={[20, 20]} position={[0, 0, -4]} receiveShadow>
      <shadowMaterial transparent opacity={0.2} />
    </Plane>
  );
}

function FloatingDebris() {
  const count = 40;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -5 + Math.random() * 10;
      const yFactor = -5 + Math.random() * 10;
      const zFactor = -5 + Math.random() * 10;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t = t + speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.02, 0.02, 0.02]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
    </instancedMesh>
  );
}

function DataPulse() {
  const count = 3;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  
  const pulses = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({ speed: 0.2 + Math.random() * 0.2, delay: i * 2 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pulses.forEach((pulse, i) => {
      const { speed, delay } = pulse;
      const progress = ((t * speed + delay) % 4) / 4; // 0 to 1
      const scale = progress * 15;
      const opacity = Math.pow(1 - progress, 2) * 0.1;
      
      dummy.position.set(0, 0, -4);
      dummy.scale.set(scale, scale, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      // Note: Opacity per instance is not easy without custom shaders, 
      // so we use a shared material and accept the uniform fade or just use one mesh.
      // For simplicity in this context, we use the instanced mesh with a low base opacity.
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <ringGeometry args={[0.98, 1, 64]} />
      <meshBasicMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.03} 
        blending={THREE.AdditiveBlending} 
        side={THREE.DoubleSide} 
      />
    </instancedMesh>
  );
}

function ScanningStreaks() {
  const count = 6;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  
  const streaks = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const speed = 0.5 + Math.random() * 1.5;
      const y = (Math.random() - 0.5) * 6;
      const z = -1 - Math.random() * 3;
      const isHorizontal = Math.random() > 0.5;
      temp.push({ speed, y, z, isHorizontal, offset: Math.random() * 10 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    streaks.forEach((streak, i) => {
      const { speed, y, z, isHorizontal, offset } = streak;
      const progress = ((t * speed + offset) % 20) - 10;
      
      if (isHorizontal) {
        dummy.position.set(progress, y, z);
        dummy.scale.set(4, 0.005, 1);
        dummy.rotation.set(0, 0, 0);
      } else {
        dummy.position.set(y, progress, z);
        dummy.scale.set(0.005, 4, 1);
        dummy.rotation.set(0, 0, 0);
      }
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.08} 
        blending={THREE.AdditiveBlending} 
        side={THREE.DoubleSide} 
      />
    </instancedMesh>
  );
}

function CursorLight() {
  const light = useRef<THREE.PointLight>(null!);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    light.current.position.set(x, y, 2);
  });

  return <pointLight ref={light} intensity={4} color="#ffffff" distance={10} castShadow shadow-bias={-0.001} shadow-mapSize={[512, 512]} />;
}

function HolographicPanels() {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <group ref={group}>
      <Plane args={[2, 2]} position={[1.5, 0.5, -2]} rotation={[0, -0.5, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
      </Plane>
      <Plane args={[4, 2]} position={[-1.5, -1, -3]} rotation={[0, 0.5, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.02} side={THREE.DoubleSide} />
      </Plane>
    </group>
  );
}

function LuxuryObjects() {
  const groupRef = useRef<THREE.Group>(null!);
  const chromeSphereRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    
    if (chromeSphereRef.current) {
       chromeSphereRef.current.position.y = Math.sin(t * 2) * 0.1;
       chromeSphereRef.current.rotation.x = t * 0.5;
    }
  });

  const chromeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffffff",
    metalness: 1,
    roughness: 0.05,
    envMapIntensity: 2.5
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    transmission: 1,
    thickness: 2,
    roughness: 0,
    metalness: 0.1,
    transparent: true,
    opacity: 0.2,
    envMapIntensity: 1.5,
    ior: 1.5,
  }), []);

  const holoMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.05,
    wireframe: true,
    blending: THREE.AdditiveBlending
  }), []);

  return (
    <group ref={groupRef}>
      {/* Central Alpha Sphere */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere ref={chromeSphereRef} args={[0.55, 64, 64]} position={[0, 0, -2]} castShadow>
          <primitive object={chromeMaterial} attach="material" />
        </Sphere>
      </Float>

      {/* Primary Glass Ring */}
      <Float speed={2} rotationIntensity={4} floatIntensity={1}>
        <Torus args={[0.9, 0.008, 32, 100]} position={[0, 0, -2]} rotation={[Math.PI / 3, 0, 0]}>
          <primitive object={glassMaterial} attach="material" />
        </Torus>
      </Float>

      {/* Secondary Chrome Ring */}
      <Float speed={3} rotationIntensity={6} floatIntensity={1.5}>
        <Torus args={[1.4, 0.004, 32, 100]} position={[0, 0, -2]} rotation={[-Math.PI / 4, 0.2, 0]}>
          <primitive object={chromeMaterial} attach="material" />
        </Torus>
      </Float>

      {/* Holographic HUD Ring */}
      <Float speed={4} rotationIntensity={2} floatIntensity={0.5}>
        <Torus args={[1.8, 0.001, 16, 128]} position={[0, 0, -2.5]} rotation={[0, 0, Math.PI / 2]}>
          <primitive object={holoMaterial} attach="material" />
        </Torus>
      </Float>

      {/* Floating Geometric Fragments - Scatter */}
      <Float speed={4} rotationIntensity={10} floatIntensity={4}>
        <Box args={[0.04, 0.04, 0.04]} position={[-2, 1, -2]}>
          <primitive object={chromeMaterial} attach="material" />
        </Box>
      </Float>

      <Float speed={3} rotationIntensity={8} floatIntensity={3.5}>
        <TorusKnot args={[0.08, 0.005, 128, 16]} position={[2, -1, -2.5]}>
          <primitive object={glassMaterial} attach="material" />
        </TorusKnot>
      </Float>

      <Float speed={5} rotationIntensity={12} floatIntensity={3}>
        <Box args={[0.02, 0.02, 0.02]} position={[1.5, 1.5, -3]}>
          <primitive object={chromeMaterial} attach="material" />
        </Box>
      </Float>
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  
  const positions = useMemo(() => {
    const count = 3000; // Increased density for "Future Billionaire" feel
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 15;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    ref.current.rotation.y = Math.cos(t * 0.03) * 0.1;
    ref.current.position.z = Math.sin(t * 0.1) * 0.5;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.008}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-black">
      {/* Cinematic Fog & Atmosphere layers */}
      <div className="absolute inset-0 bg-gradient-radial from-white/[0.05] via-transparent to-transparent opacity-60 pulse-glow" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
      
      {/* Enhanced Volumetric Beams */}
      <div className="absolute -top-[60%] -left-[30%] w-[120%] h-[180%] bg-gradient-conic from-white/10 via-transparent to-transparent blur-[140px] animate-float-lux" />
      <div className="absolute top-[30%] -right-[40%] w-[120%] h-[180%] bg-gradient-conic from-white/8 via-transparent to-transparent blur-[140px] animate-float-lux" style={{ animationDelay: '-7s' }} />

      <Canvas shadows camera={{ position: [0, 0, 2], fov: 65 }} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={["#000000", 2, 8]} />
        <ambientLight intensity={0.15} />
        
        {/* Cinematic Rim & Key Lights */}
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={12} color="#ffffff" castShadow />
        <spotLight position={[-10, -10, 10]} angle={0.15} penumbra={1} intensity={8} color="#ffffff" castShadow />
        <spotLight position={[0, 0, 5]} angle={0.3} penumbra={1} intensity={4} color="#ffffff" />
        
        <CursorLight />
        <Particles />
        <DataPulse />
        <ScanningStreaks />
        <LuxuryObjects />
        <HolographicPanels />
        <Aurora />
        <ShadowCatcher />
        <FloatingDebris />
      </Canvas>
    </div>
  );
}
