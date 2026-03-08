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
  { name: "Cars", slug: "cars", icon: "🏎️", description: "Sedan, SUV, police and sports car models", count: 4 },
  { name: "Bikes", slug: "bikes", icon: "🏍️", description: "Motorcycle and scooter models", count: 1 },
  { name: "Animals", slug: "animals", icon: "🦊", description: "Fox, duck, dragon and wildlife models", count: 3 },
  { name: "Human Body", slug: "human-body", icon: "🧍", description: "Animated and rigged human figures", count: 3 },
  { name: "Sci-Fi & Armor", slug: "scifi", icon: "🪖", description: "Helmets, armor and sci-fi props", count: 1 },
  { name: "Objects", slug: "objects", icon: "💡", description: "Lamps, furniture, shoes and everyday objects", count: 5 },
];

export const models: Model3D[] = [
  // Cars
  { id: "c1", name: "Sedan Car", slug: "sedan-car", category: "Cars", categorySlug: "cars", description: "A clean low-poly sedan with smooth body lines. CC0 licensed by Quaternius — ideal for driving simulators, city scenes, and transport UI.", format: "GLB", tags: ["car", "sedan", "vehicle", "transport"], modelUrl: "/models/sedan-car.glb", scale: 1, featured: true },
  { id: "c2", name: "Police Car", slug: "police-car", category: "Cars", categorySlug: "cars", description: "A detailed police car model with emergency lights and livery. Perfect for game development and law-enforcement themed projects.", format: "GLB", tags: ["car", "police", "emergency", "vehicle"], modelUrl: "/models/police-car.glb", scale: 1, recent: true },
  { id: "c3", name: "SUV", slug: "suv", category: "Cars", categorySlug: "cars", description: "A rugged SUV model with off-road proportions. Great for open-world games and adventure scenes.", format: "GLB", tags: ["car", "suv", "offroad", "vehicle"], modelUrl: "/models/suv.glb", scale: 1, featured: true },
  { id: "c4", name: "Sports Car", slug: "sports-car", category: "Cars", categorySlug: "cars", description: "A sleek sports car model with aerodynamic body. By Ignition Labs — great for racing games and product showcases.", format: "GLB", tags: ["car", "sports", "racing", "fast"], modelUrl: "/models/car-model.glb", scale: 0.005 },

  // Bikes
  { id: "b1", name: "Motorcycle", slug: "motorcycle", category: "Bikes", categorySlug: "bikes", description: "A detailed motorcycle model with realistic proportions. CC-BY licensed — perfect for racing and transport scenes.", format: "GLB", tags: ["bike", "motorcycle", "transport", "racing"], modelUrl: "/models/motorcycle.glb", scale: 0.01, featured: true },

  // Animals
  { id: "a1", name: "Fox", slug: "fox", category: "Animals", categorySlug: "animals", description: "An animated low-poly fox with smooth walk/run cycle. KhronosGroup standard test asset — ideal for nature scenes and game characters.", format: "GLB", tags: ["fox", "animal", "animated", "wildlife"], modelUrl: "/models/fox.glb", scale: 0.025, featured: true },
  { id: "a2", name: "Duck", slug: "duck", category: "Animals", categorySlug: "animals", description: "Classic textured duck model — a staple in 3D graphics. KhronosGroup reference model with PBR materials.", format: "GLB", tags: ["duck", "bird", "animal", "classic"], modelUrl: "/models/duck.glb", scale: 0.015 },
  { id: "a3", name: "Crystal Dragon", slug: "crystal-dragon", category: "Animals", categorySlug: "animals", description: "A stunning crystal dragon with light attenuation effects. Demonstrates advanced material rendering with subsurface scattering.", format: "GLB", tags: ["dragon", "fantasy", "crystal", "creature"], modelUrl: "/models/dragon.glb", scale: 0.8, recent: true },

  // Human Body
  { id: "h1", name: "Walking Human", slug: "walking-human", category: "Human Body", categorySlug: "human-body", description: "CesiumMan — a fully animated humanoid character with walk cycle animation. Industry-standard test model for animation pipelines and character rendering.", format: "GLB", tags: ["human", "animated", "walking", "character"], modelUrl: "/models/cesiumman.glb", scale: 1.2, featured: true },
  { id: "h2", name: "BrainStem Figure", slug: "brainstem-figure", category: "Human Body", categorySlug: "human-body", description: "An animated robot/humanoid with complex skeletal animation. Useful for testing rigging systems, inverse kinematics, and animation blending.", format: "GLB", tags: ["robot", "animated", "skeleton", "humanoid"], modelUrl: "/models/brainstem.glb", scale: 1.2, recent: true },
  { id: "h3", name: "Rigged T-Pose", slug: "rigged-tpose", category: "Human Body", categorySlug: "human-body", description: "A basic rigged humanoid in T-pose — the starting point for any character animation. Ideal for testing skeletal rigs and motion capture retargeting.", format: "GLB", tags: ["human", "rigged", "tpose", "skeleton"], modelUrl: "/models/rigged-figure.glb", scale: 1.2 },

  // Sci-Fi & Armor
  { id: "s1", name: "Damaged Helmet", slug: "damaged-helmet", category: "Sci-Fi & Armor", categorySlug: "scifi", description: "A battle-worn sci-fi helmet with detailed PBR surface damage, scratches, and wear patterns. The industry-standard reference model for physically-based rendering.", format: "GLB", tags: ["helmet", "scifi", "armor", "pbr"], modelUrl: "/models/damaged-helmet.glb", scale: 2.5, featured: true },

  // Objects
  { id: "o1", name: "Antique Lantern", slug: "antique-lantern", category: "Objects", categorySlug: "objects", description: "A beautifully detailed antique lantern with realistic metal and glass materials. Great for dungeon crawlers and medieval scenes.", format: "GLB", tags: ["lantern", "light", "antique", "prop"], modelUrl: "/models/lantern.glb", scale: 0.06, featured: true },
  { id: "o2", name: "Iridescent Lamp", slug: "iridescent-lamp", category: "Objects", categorySlug: "objects", description: "A modern lamp showcasing iridescent material effects with rainbow reflections. Demonstrates cutting-edge material rendering.", format: "GLB", tags: ["lamp", "iridescent", "light", "modern"], modelUrl: "/models/lamp.glb", scale: 1.2, recent: true },
  { id: "o3", name: "Velvet Sofa", slug: "velvet-sofa", category: "Objects", categorySlug: "objects", description: "A glamorous velvet sofa with rich fabric sheen material. Ideal for interior design visualization and architectural walkthroughs.", format: "GLB", tags: ["sofa", "furniture", "velvet", "interior"], modelUrl: "/models/sofa.glb", scale: 1.5 },
  { id: "o4", name: "Designer Shoe", slug: "designer-shoe", category: "Objects", categorySlug: "objects", description: "A high-detail sneaker with multiple material variants. Perfect for product configurators and e-commerce 3D experiences.", format: "GLB", tags: ["shoe", "fashion", "sneaker", "product"], modelUrl: "/models/shoe.glb", scale: 10 },
  { id: "o5", name: "Water Bottle", slug: "water-bottle", category: "Objects", categorySlug: "objects", description: "A realistic water bottle with PBR glass transparency and label materials. Great for product visualization demos.", format: "GLB", tags: ["bottle", "water", "glass", "product"], modelUrl: "/models/water-bottle.glb", scale: 10 },
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
