import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { Suspense } from "react";
import type { Model3D } from "@/data/models";

const MiniGLBModel = ({ url, scale = 1 }: { url: string; scale?: number }) => {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene.clone()} scale={scale} />
    </Center>
  );
};

const ModelCard = ({ model }: { model: Model3D }) => {
  return (
    <Link
      to={`/model/${model.slug}`}
      className="group glass-card overflow-hidden hover:glow-sm transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-48 bg-secondary/30 relative overflow-hidden">
        <Canvas camera={{ position: [3, 2, 4], fov: 40 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 3, 3]} intensity={0.8} />
            <MiniGLBModel url={model.modelUrl} scale={model.scale} />
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
