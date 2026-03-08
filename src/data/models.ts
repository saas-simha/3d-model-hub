export interface Model3D {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  format: string;
  tags: string[];
  geometry: "box" | "sphere" | "cylinder" | "torus" | "cone" | "torusKnot" | "dodecahedron" | "octahedron";
  color: string;
  featured?: boolean;
  recent?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
}

export const categories: Category[] = [
  { name: "Cars", slug: "cars", icon: "🏎️", description: "High-performance vehicle models", count: 4 },
  { name: "Bikes", slug: "bikes", icon: "🏍️", description: "Motorcycle and bike models", count: 4 },
  { name: "Animals", slug: "animals", icon: "🦁", description: "Wildlife and pet models", count: 4 },
  { name: "Human Faces", slug: "human-faces", icon: "👤", description: "Detailed face models", count: 4 },
  { name: "Human Body", slug: "human-body", icon: "🧍", description: "Full body human models", count: 4 },
  { name: "Action Models", slug: "action-models", icon: "⚡", description: "Animated action poses", count: 4 },
];

export const models: Model3D[] = [
  // Cars
  { id: "c1", name: "Tesla Model 3", slug: "tesla-model-3", category: "Cars", categorySlug: "cars", description: "Sleek electric sedan with aerodynamic design. Perfect for automotive UI projects.", format: "GLB", tags: ["car", "electric", "sedan", "tesla"], geometry: "box", color: "#00d4aa", featured: true },
  { id: "c2", name: "Lamborghini Aventador", slug: "lamborghini-aventador", category: "Cars", categorySlug: "cars", description: "Iconic supercar with aggressive lines and V12 power.", format: "GLB", tags: ["car", "supercar", "lamborghini"], geometry: "box", color: "#ffd700", featured: true },
  { id: "c3", name: "BMW M4", slug: "bmw-m4", category: "Cars", categorySlug: "cars", description: "German engineering meets performance driving.", format: "GLTF", tags: ["car", "bmw", "coupe"], geometry: "box", color: "#4488ff" },
  { id: "c4", name: "Audi R8", slug: "audi-r8", category: "Cars", categorySlug: "cars", description: "Mid-engine sports car with quattro AWD.", format: "GLB", tags: ["car", "audi", "sports"], geometry: "box", color: "#ff4444", recent: true },

  // Bikes
  { id: "b1", name: "Yamaha R1", slug: "yamaha-r1", category: "Bikes", categorySlug: "bikes", description: "Superbike with crossplane crankshaft technology.", format: "GLB", tags: ["bike", "yamaha", "superbike"], geometry: "cylinder", color: "#0066ff", featured: true },
  { id: "b2", name: "Ducati Panigale", slug: "ducati-panigale", category: "Bikes", categorySlug: "bikes", description: "Italian racing excellence in motorcycle form.", format: "GLB", tags: ["bike", "ducati", "racing"], geometry: "cylinder", color: "#ff2200" },
  { id: "b3", name: "Kawasaki Ninja", slug: "kawasaki-ninja", category: "Bikes", categorySlug: "bikes", description: "Legendary sportbike with iconic green livery.", format: "GLTF", tags: ["bike", "kawasaki", "sport"], geometry: "cylinder", color: "#00cc44", recent: true },
  { id: "b4", name: "BMW S1000RR", slug: "bmw-s1000rr", category: "Bikes", categorySlug: "bikes", description: "German precision in a superbike package.", format: "GLB", tags: ["bike", "bmw", "superbike"], geometry: "cylinder", color: "#6699ff" },

  // Animals
  { id: "a1", name: "Dog", slug: "dog", category: "Animals", categorySlug: "animals", description: "Friendly canine companion model with detailed mesh.", format: "GLB", tags: ["animal", "dog", "pet"], geometry: "sphere", color: "#cc8844", featured: true },
  { id: "a2", name: "Cat", slug: "cat", category: "Animals", categorySlug: "animals", description: "Elegant feline model with realistic proportions.", format: "GLB", tags: ["animal", "cat", "pet"], geometry: "sphere", color: "#ff9966" },
  { id: "a3", name: "Lion", slug: "lion", category: "Animals", categorySlug: "animals", description: "Majestic king of the jungle with flowing mane.", format: "GLTF", tags: ["animal", "lion", "wild"], geometry: "dodecahedron", color: "#ffaa22" },
  { id: "a4", name: "Horse", slug: "horse", category: "Animals", categorySlug: "animals", description: "Graceful equine model in standing pose.", format: "GLB", tags: ["animal", "horse", "equine"], geometry: "sphere", color: "#886644", recent: true },

  // Human Faces
  { id: "f1", name: "Male Face", slug: "male-face", category: "Human Faces", categorySlug: "human-faces", description: "Detailed male face with realistic topology.", format: "GLB", tags: ["face", "male", "human"], geometry: "sphere", color: "#ffbb99" },
  { id: "f2", name: "Female Face", slug: "female-face", category: "Human Faces", categorySlug: "human-faces", description: "Elegant female face model with fine detail.", format: "GLB", tags: ["face", "female", "human"], geometry: "sphere", color: "#ffccaa", featured: true },
  { id: "f3", name: "Cartoon Face", slug: "cartoon-face", category: "Human Faces", categorySlug: "human-faces", description: "Stylized cartoon face for game projects.", format: "GLTF", tags: ["face", "cartoon", "stylized"], geometry: "sphere", color: "#44ddff", recent: true },
  { id: "f4", name: "Stylized Face", slug: "stylized-face", category: "Human Faces", categorySlug: "human-faces", description: "Artistic stylized face with unique proportions.", format: "GLB", tags: ["face", "stylized", "art"], geometry: "octahedron", color: "#dd66ff" },

  // Human Body
  { id: "h1", name: "Standing Human", slug: "standing-human", category: "Human Body", categorySlug: "human-body", description: "T-pose standing human for rigging reference.", format: "GLB", tags: ["body", "standing", "human"], geometry: "cylinder", color: "#ffbb99" },
  { id: "h2", name: "Walking Human", slug: "walking-human", category: "Human Body", categorySlug: "human-body", description: "Human in mid-walk cycle pose.", format: "GLB", tags: ["body", "walking", "human"], geometry: "cylinder", color: "#99bbff" },
  { id: "h3", name: "Sitting Human", slug: "sitting-human", category: "Human Body", categorySlug: "human-body", description: "Relaxed sitting pose human model.", format: "GLTF", tags: ["body", "sitting", "human"], geometry: "cylinder", color: "#aaddcc", recent: true },
  { id: "h4", name: "Running Human", slug: "running-human", category: "Human Body", categorySlug: "human-body", description: "Dynamic running pose with motion blur ready.", format: "GLB", tags: ["body", "running", "human"], geometry: "cone", color: "#ff8866" },

  // Action Models
  { id: "x1", name: "Jump Animation", slug: "jump-animation", category: "Action Models", categorySlug: "action-models", description: "High energy jump animation model.", format: "GLB", tags: ["action", "jump", "animation"], geometry: "torusKnot", color: "#ff4488", featured: true },
  { id: "x2", name: "Walking Animation", slug: "walking-animation", category: "Action Models", categorySlug: "action-models", description: "Smooth walking cycle animation.", format: "GLB", tags: ["action", "walk", "animation"], geometry: "torus", color: "#44ff88" },
  { id: "x3", name: "Dancing Animation", slug: "dancing-animation", category: "Action Models", categorySlug: "action-models", description: "Fun dancing animation loop.", format: "GLTF", tags: ["action", "dance", "animation"], geometry: "torusKnot", color: "#ff66dd", recent: true },
  { id: "x4", name: "Fighting Animation", slug: "fighting-animation", category: "Action Models", categorySlug: "action-models", description: "Combat ready fighting stance animation.", format: "GLB", tags: ["action", "fight", "animation"], geometry: "torusKnot", color: "#ff2244" },
];

export const getModelBySlug = (slug: string) => models.find(m => m.slug === slug);
export const getModelsByCategory = (categorySlug: string) => models.filter(m => m.categorySlug === categorySlug);
export const getFeaturedModels = () => models.filter(m => m.featured);
export const getRecentModels = () => models.filter(m => m.recent);
export const searchModels = (query: string) => {
  const q = query.toLowerCase();
  return models.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.category.toLowerCase().includes(q) ||
    m.tags.some(t => t.includes(q))
  );
};
