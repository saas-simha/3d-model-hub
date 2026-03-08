import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const HeroMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow>
        <torusKnotGeometry args={[1, 0.32, 256, 48]} />
        <meshPhysicalMaterial
          color="#00d4aa"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#00d4aa"
          emissiveIntensity={0.15}
          envMapIntensity={2.5}
          iridescence={0.3}
          iridescenceIOR={1.5}
        />
      </mesh>
    </Float>
  );
};

const FloatingRing = ({ radius, speed, color, thickness }: { radius: number; speed: number; color: string; thickness: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 16, 64]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.3}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const Particles = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d4aa"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const HeroViewer = () => (
  <div className="w-full h-full">
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
    >
      <color attach="background" args={["#060a10"]} />
      <fog attach="fog" args={["#060a10", 6, 18]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#00d4aa" distance={15} />
        <pointLight position={[-5, -3, 3]} intensity={1} color="#8844ff" distance={12} />
        <pointLight position={[0, -4, 0]} intensity={0.5} color="#00d4aa" distance={8} />
        <directionalLight position={[3, 5, 2]} intensity={0.6} />

        <HeroMesh />
        <FloatingRing radius={2.2} speed={0.5} color="#00d4aa" thickness={0.02} />
        <FloatingRing radius={2.8} speed={-0.3} color="#8844ff" thickness={0.015} />
        <FloatingRing radius={3.3} speed={0.2} color="#00d4aa" thickness={0.01} />
        <Particles />

        <Environment preset="city" background={false} />

        <EffectComposer multisampling={4}>
          <Bloom
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            intensity={0.6}
            mipmapBlur
          />
          <Vignette offset={0.3} darkness={0.8} blendFunction={BlendFunction.NORMAL} />
        </EffectComposer>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
        />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroViewer;
