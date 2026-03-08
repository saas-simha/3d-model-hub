import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Download, Check, Tag } from "lucide-react";
import { useState } from "react";
import ModelViewer from "@/components/ModelViewer";
import { getModelBySlug } from "@/data/models";

const ModelDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const model = getModelBySlug(slug || "");
  const [copied, setCopied] = useState(false);

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Model not found</h1>
          <Link to="/models" className="text-primary hover:underline text-sm">Browse models</Link>
        </div>
      </div>
    );
  }

  const codeSnippet = `import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function ${model.name.replace(/\s+/g, '')}Model() {
  const { scene } = useGLTF('/models/${model.slug}.${model.format.toLowerCase()}')
  return <primitive object={scene} />
}

export default function Viewer() {
  return (
    <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <${model.name.replace(/\s+/g, '')}Model />
      <OrbitControls />
    </Canvas>
  )
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <Link
          to={`/category/${model.categorySlug}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {model.category}
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Viewer */}
          <div className="glass-card overflow-hidden">
            <div className="h-[400px] lg:h-[500px]">
              <ModelViewer model={model} />
            </div>
            <div className="px-4 py-3 border-t border-glass-border/30 flex items-center justify-between text-xs text-muted-foreground">
              <span>🖱️ Drag to rotate · Scroll to zoom · Right-click to pan</span>
              <span className="font-mono text-primary">WebGL</span>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs text-primary font-mono uppercase tracking-wider mb-1">{model.category}</p>
              <h1 className="text-3xl font-bold">{model.name}</h1>
              <p className="text-muted-foreground mt-2">{model.description}</p>
            </div>

            <div className="glass-card p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Format</span>
                <span className="font-mono text-primary">{model.format}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span>{model.category}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {model.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs bg-secondary/60 text-muted-foreground px-2 py-1 rounded-full">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity glow-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-2 glass-card px-4 py-3 font-medium hover:bg-secondary/60 transition-colors">
                <Download className="w-4 h-4" /> Download Model
              </button>
            </div>

            {/* Code Preview */}
            <div className="glass-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-glass-border/30">
                <span className="text-xs font-mono text-muted-foreground">Integration Code</span>
                <button onClick={handleCopy} className="text-xs text-primary hover:underline">
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-secondary-foreground overflow-x-auto leading-relaxed">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailPage;
