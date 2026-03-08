import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import type { Model3D } from "@/data/models";
import * as THREE from "three";

const MiniGLBModel = ({ url, scale = 1 }: { url: string; scale?: number }) => {
  const { scene } = useGLTF(url);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        if (child.material && (child.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const mat = child.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 2;
          mat.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  return (
    <Center>
      <primitive object={clonedScene} scale={scale} />
    </Center>
  );
};

const ModelCard = ({ model }: { model: Model3D }) => {
  return (
    <Link
      to={`/model/${model.slug}`}
      className="group glass-card overflow-hidden hover:glow-sm transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-52 relative overflow-hidden">
        <Canvas
          camera={{ position: [3, 2, 4], fov: 38 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
        >
          <color attach="background" args={["#0a0f16"]} />
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-3, 2, -2]} intensity={1} color="#00d4aa" distance={10} />
            <pointLight position={[3, 1, -3]} intensity={0.5} color="#8844ff" distance={8} />

            <MiniGLBModel url={model.modelUrl} scale={model.scale} />

            {/* Subtle shadow */}
            <ContactShadows
              position={[0, -1.2, 0]}
              opacity={0.4}
              scale={6}
              blur={2}
              far={3}
            />

            <Environment preset="city" background={false} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={2.5}
              enableDamping
            />
          </Suspense>
        </Canvas>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />

        <div className="absolute top-2 right-2 text-xs font-mono bg-primary/20 text-primary px-2 py-0.5 rounded-full backdrop-blur-sm border border-primary/10">
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
