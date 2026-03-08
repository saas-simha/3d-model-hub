import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { Suspense } from "react";
import type { Model3D } from "@/data/models";

const MiniGeometry = ({ geometry, color }: { geometry: Model3D["geometry"]; color: string }) => {
  const getGeometry = () => {
    switch (geometry) {
      case "box": return <boxGeometry args={[1.4, 0.7, 2.2]} />;
      case "sphere": return <sphereGeometry args={[1, 32, 32]} />;
      case "cylinder": return <cylinderGeometry args={[0.3, 0.3, 2, 16]} />;
      case "torus": return <torusGeometry args={[0.8, 0.35, 16, 32]} />;
      case "cone": return <coneGeometry args={[0.8, 1.6, 16]} />;
      case "torusKnot": return <torusKnotGeometry args={[0.6, 0.25, 64, 16]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[1]} />;
      case "octahedron": return <octahedronGeometry args={[1]} />;
      default: return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh>
        {getGeometry()}
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
    </Float>
  );
};

const ModelCard = ({ model }: { model: Model3D }) => {
  return (
    <Link
      to={`/model/${model.slug}`}
      className="group glass-card overflow-hidden hover:glow-sm transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-48 bg-secondary/30 relative overflow-hidden">
        <Canvas camera={{ position: [2, 1.5, 3], fov: 40 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 3, 3]} intensity={0.8} />
            <MiniGeometry geometry={model.geometry} color={model.color} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
          </Suspense>
        </Canvas>
        <div className="absolute top-2 right-2 text-xs font-mono bg-primary/20 text-primary px-2 py-0.5 rounded-full backdrop-blur-sm">
          {model.format}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{model.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{model.category}</p>
      </div>
    </Link>
  );
};

export default ModelCard;
