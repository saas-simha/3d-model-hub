import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { Suspense } from "react";
import type { Model3D } from "@/data/models";

interface GeometryMeshProps {
  geometry: Model3D["geometry"];
  color: string;
}

const GeometryMesh = ({ geometry, color }: GeometryMeshProps) => {
  const getGeometry = () => {
    switch (geometry) {
      case "box": return <boxGeometry args={[1.6, 0.8, 3]} />;
      case "sphere": return <sphereGeometry args={[1.2, 64, 64]} />;
      case "cylinder": return <cylinderGeometry args={[0.3, 0.3, 2.5, 32]} />;
      case "torus": return <torusGeometry args={[1, 0.4, 32, 64]} />;
      case "cone": return <coneGeometry args={[1, 2, 32]} />;
      case "torusKnot": return <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[1.2]} />;
      case "octahedron": return <octahedronGeometry args={[1.3]} />;
      default: return <boxGeometry args={[1.5, 1.5, 1.5]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh castShadow receiveShadow>
        {getGeometry()}
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
};

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#333" wireframe />
  </mesh>
);

interface ModelViewerProps {
  model: Model3D;
  className?: string;
}

const ModelViewer = ({ model, className = "" }: ModelViewerProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [3, 2, 5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#00d4aa" />
          <pointLight position={[5, -2, 5]} intensity={0.3} color="#8844ff" />
          <GeometryMesh geometry={model.geometry} color={model.color} />
          <Environment preset="city" />
          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            autoRotate
            autoRotateSpeed={1.5}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={2}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
