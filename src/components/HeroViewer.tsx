import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { Suspense } from "react";

const HeroMesh = () => (
  <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.6}>
    <mesh>
      <torusKnotGeometry args={[1, 0.35, 200, 40]} />
      <meshStandardMaterial
        color="#00d4aa"
        metalness={0.8}
        roughness={0.1}
        emissive="#00d4aa"
        emissiveIntensity={0.1}
      />
    </mesh>
  </Float>
);

const HeroViewer = () => (
  <div className="w-full h-full">
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00d4aa" />
        <pointLight position={[-5, -3, 3]} intensity={0.5} color="#8844ff" />
        <HeroMesh />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroViewer;
