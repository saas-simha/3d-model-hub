export interface Model3D {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  format: string;
  tags: string[];
  modelUrl: string;
  scale?: number;
  position?: [number, number, number];
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
  { name: "Vehicles", slug: "vehicles", icon: "🏎️", description: "Cars, toys, and transport models", count: 3 },
  { name: "Animals & Nature", slug: "animals", icon: "🦊", description: "Wildlife, creatures, and natural objects", count: 4 },
  { name: "Characters", slug: "characters", icon: "🧍", description: "Human figures and animated characters", count: 4 },
  { name: "Objects", slug: "objects", icon: "💡", description: "Everyday objects and props", count: 5 },
];

export const models: Model3D[] = [
  // Vehicles
  { id: "v1", name: "Toy Car", slug: "toy-car", category: "Vehicles", categorySlug: "vehicles", description: "A detailed toy car model with metallic paint finish. Great for product visualization and game assets.", format: "GLB", tags: ["car", "vehicle", "toy", "transport"], modelUrl: "/models/toycar.glb", scale: 100, featured: true },
  { id: "v2", name: "Damaged Helmet", slug: "damaged-helmet", category: "Vehicles", categorySlug: "vehicles", description: "A battle-worn sci-fi helmet with detailed surface damage, scratches, and wear. Industry-standard PBR test model.", format: "GLB", tags: ["helmet", "sci-fi", "armor", "vehicle"], modelUrl: "/models/damaged-helmet.glb", scale: 2.5, featured: true },
  { id: "v3", name: "Sheen Chair", slug: "sheen-chair", category: "Vehicles", categorySlug: "vehicles", description: "Elegant fabric chair showcasing advanced material sheen rendering.", format: "GLB", tags: ["chair", "furniture", "sheen", "fabric"], modelUrl: "/models/sheen-chair.glb", scale: 3, recent: true },

  // Animals & Nature
  { id: "a1", name: "Fox", slug: "fox", category: "Animals & Nature", categorySlug: "animals", description: "An animated low-poly fox with smooth walk cycle. Perfect for game characters and nature scenes.", format: "GLB", tags: ["fox", "animal", "animated", "lowpoly"], modelUrl: "/models/fox.glb", scale: 0.03, featured: true },
  { id: "a2", name: "Duck", slug: "duck", category: "Animals & Nature", categorySlug: "animals", description: "Classic rubber duck 3D model. A staple in 3D graphics testing and learning.", format: "GLB", tags: ["duck", "animal", "toy", "classic"], modelUrl: "/models/duck.glb", scale: 0.015 },
  { id: "a3", name: "Dragon", slug: "dragon", category: "Animals & Nature", categorySlug: "animals", description: "Crystal dragon with stunning light attenuation effects. Demonstrates advanced material rendering.", format: "GLB", tags: ["dragon", "fantasy", "creature", "crystal"], modelUrl: "/models/dragon.glb", scale: 1.5, recent: true },
  { id: "a4", name: "Avocado", slug: "avocado", category: "Animals & Nature", categorySlug: "animals", description: "Realistic avocado half with PBR textures. Great for food visualization and product demos.", format: "GLB", tags: ["avocado", "food", "nature", "realistic"], modelUrl: "/models/avocado.glb", scale: 30 },

  // Characters
  { id: "c1", name: "Animated Human", slug: "animated-human", category: "Characters", categorySlug: "characters", description: "CesiumMan - a fully animated humanoid character with walk cycle. Industry standard test model for animation pipelines.", format: "GLB", tags: ["human", "animated", "walk", "character"], modelUrl: "/models/cesiumman.glb", scale: 1.5, featured: true },
  { id: "c2", name: "BrainStem Figure", slug: "brainstem", category: "Characters", categorySlug: "characters", description: "Animated robot/humanoid figure with complex skeletal animation. Great for testing rigging and animation systems.", format: "GLB", tags: ["robot", "animated", "skeleton", "character"], modelUrl: "/models/brainstem.glb", scale: 1.5, recent: true },
  { id: "c3", name: "Rigged Figure", slug: "rigged-figure", category: "Characters", categorySlug: "characters", description: "A basic rigged humanoid figure in T-pose. Ideal for testing skeletal animations and character rigs.", format: "GLB", tags: ["human", "rigged", "tpose", "skeleton"], modelUrl: "/models/rigged-figure.glb", scale: 1.5 },
  { id: "c4", name: "Fox Character", slug: "fox-character", category: "Characters", categorySlug: "characters", description: "Animated fox that can be used as a game character with smooth movement animations.", format: "GLB", tags: ["fox", "character", "animated", "game"], modelUrl: "/models/fox.glb", scale: 0.03 },

  // Objects
  { id: "o1", name: "Lantern", slug: "lantern", category: "Objects", categorySlug: "objects", description: "A detailed antique lantern with realistic materials and lighting-ready geometry.", format: "GLB", tags: ["lantern", "light", "prop", "antique"], modelUrl: "/models/lantern.glb", scale: 0.08, featured: true },
  { id: "o2", name: "Iridescent Lamp", slug: "iridescent-lamp", category: "Objects", categorySlug: "objects", description: "Modern lamp with iridescent material effects demonstrating advanced rendering.", format: "GLB", tags: ["lamp", "iridescent", "light", "modern"], modelUrl: "/models/lamp.glb", scale: 1.5, recent: true },
  { id: "o3", name: "Velvet Sofa", slug: "velvet-sofa", category: "Objects", categorySlug: "objects", description: "Glamorous velvet sofa with rich fabric material. Perfect for interior design visualization.", format: "GLB", tags: ["sofa", "furniture", "velvet", "interior"], modelUrl: "/models/sofa.glb", scale: 2 },
  { id: "o4", name: "Designer Shoe", slug: "designer-shoe", category: "Objects", categorySlug: "objects", description: "High-detail sneaker with material variants. Great for product configurators and e-commerce.", format: "GLB", tags: ["shoe", "fashion", "product", "sneaker"], modelUrl: "/models/shoe.glb", scale: 12, featured: true },
  { id: "o5", name: "Water Bottle", slug: "water-bottle", category: "Objects", categorySlug: "objects", description: "Realistic water bottle with PBR materials including glass transparency and labels.", format: "GLB", tags: ["bottle", "water", "product", "glass"], modelUrl: "/models/water-bottle.glb", scale: 12 },
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
