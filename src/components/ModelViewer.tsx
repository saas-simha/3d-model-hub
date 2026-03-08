import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Center, Html, ContactShadows, AccumulativeShadows, RandomizedLight, Stage } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Model3D } from "@/data/models";
import * as THREE from "three";

interface GLBModelProps {
  url: string;
  scale?: number;
  enhanceMaterials?: boolean;
}

const GLBModel = ({ url, scale = 1, enhanceMaterials = true }: GLBModelProps) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (enhanceMaterials && child.material) {
          const mat = child.material as THREE.MeshStandardMaterial;
          if (mat.isMeshStandardMaterial) {
            // Boost material quality
            mat.envMapIntensity = 1.8;
            mat.needsUpdate = true;
          }
        }
      }
    });

    return clone;
  }, [scene, enhanceMaterials]);

  return (
    <Center>
      <group ref={modelRef}>
        <primitive object={clonedScene} scale={scale} />
      </group>
    </Center>
  );
};

const ReflectiveFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial
        color="#0a0f14"
        metalness={0.9}
        roughness={0.15}
        envMapIntensity={0.5}
      />
    </mesh>
  );
};

const GridFloor = () => {
  return (
    <group position={[0, -1.5, 0]}>
      <gridHelper
        args={[20, 40, new THREE.Color("#00d4aa"), new THREE.Color("#1a2030")]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#080c12"
          metalness={0.95}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

const LoadingSpinner = () => (
  <Html center>
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-muted-foreground font-mono tracking-wider">Loading model...</span>
    </div>
  </Html>
);

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 8 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00d4aa"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

interface ModelViewerProps {
  model: Model3D;
  className?: string;
}

const ModelViewer = ({ model, className = "" }: ModelViewerProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [4, 2.5, 6], fov: 40 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#060a10"]} />
        <fog attach="fog" args={["#060a10", 10, 30]} />

        <Suspense fallback={<LoadingSpinner />}>
          {/* Key light */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            color="#ffffff"
          />

          {/* Fill light */}
          <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#8888ff" />

          {/* Rim light - cyan */}
          <pointLight position={[-4, 3, -4]} intensity={1.5} color="#00d4aa" distance={15} decay={2} />

          {/* Accent light - purple */}
          <pointLight position={[4, 2, -3]} intensity={0.8} color="#8844ff" distance={12} decay={2} />

          {/* Under light for drama */}
          <pointLight position={[0, -2, 2]} intensity={0.3} color="#00d4aa" distance={8} decay={2} />

          {/* Ambient */}
          <ambientLight intensity={0.15} />

          {/* Model */}
          <GLBModel url={model.modelUrl} scale={model.scale} enhanceMaterials />

          {/* Floor & environment */}
          <GridFloor />
          <ContactShadows
            position={[0, -1.49, 0]}
            opacity={0.6}
            scale={10}
            blur={2.5}
            far={4}
            color="#000000"
          />
          <FloatingParticles />

          {/* HDR Environment */}
          <Environment preset="city" background={false} />

          {/* Post-processing */}
          <EffectComposer multisampling={4}>
            <Bloom
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
              intensity={0.4}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.0005, 0.0005)}
            />
            <Vignette
              offset={0.3}
              darkness={0.7}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>

          {/* Controls */}
          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            autoRotate
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 6}
            minDistance={2}
            maxDistance={12}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
