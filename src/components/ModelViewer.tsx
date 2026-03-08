import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Center, Html } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import type { Model3D } from "@/data/models";
import * as THREE from "three";

interface GLBModelProps {
  url: string;
  scale?: number;
}

const GLBModel = ({ url, scale = 1 }: GLBModelProps) => {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  );
};

const LoadingSpinner = () => (
  <Html center>
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-muted-foreground font-mono">Loading model...</span>
    </div>
  </Html>
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
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#00d4aa" />
          <pointLight position={[5, -2, 5]} intensity={0.3} color="#8844ff" />
          <GLBModel url={model.modelUrl} scale={model.scale} />
          <Environment preset="city" />
          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            autoRotate
            autoRotateSpeed={1.5}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={1}
            maxDistance={15}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
